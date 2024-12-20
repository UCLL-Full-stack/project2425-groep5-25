import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import casual from 'casual';
import { Color, projectNames, Role } from '../../types';
import { dateUtils } from '../../utils/date';

const prisma = new PrismaClient();

const customUsers = [
    {
        firstName: 'Roel',
        lastName: 'Crabbé',
        userName: 'Roel_Crabbe',
        email: 'roel.crabbe@example.com',
        password: '@Roel_Crabbe123',
        role: 'admin',
    },
    {
        firstName: 'Yasir',
        lastName: 'Hozan',
        userName: 'Yasir_Hozan',
        email: 'yasir.hozan@example.com',
        password: '@Yasir_Hozan123',
        role: 'hr',
    },
    {
        firstName: 'Johan',
        lastName: 'Pieck',
        userName: 'Johan_Pieck',
        email: 'johan.pieck@example.com',
        password: '@Johan_Pieck123',
        role: 'user',
    },
];

const main = async () => {
    // Step 1: Clean the database
    await prisma.timeBlock.deleteMany();
    await prisma.workday.deleteMany();
    await prisma.workSchedule.deleteMany();
    await prisma.user.deleteMany();
    await prisma.project.deleteMany();
    console.log('Cleaned the database!');

    // Step 1: Add custom users to the database and get their IDs
    const createdCustomUsers = await Promise.all(
        customUsers.map(async (user) => {
            const passwordHash = await bcrypt.hash(user.password, 12); // Hash the password
            return prisma.user.create({
                data: {
                    userName: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    passWord: passwordHash,
                    role: user.role,
                },
            });
        }),
    );

    const users = [
        ...createdCustomUsers,
        ...(await Promise.all(
            Array.from({ length: 20 }).map(async () => {
                const firstName = casual.first_name;
                const lastName = casual.last_name;
                const username = firstName + '_' + lastName;
                const password = await bcrypt.hash('@' + username + '123', 12);
                const email = firstName.toLowerCase() + '.' + lastName.toLowerCase() + '@gmail.com';

                return prisma.user.create({
                    data: {
                        userName: username,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        passWord: password,
                        role: 'admin' as Role,
                    },
                });
            }),
        )),
    ];

    // Step 3: Create WorkSchedules for all users (now with IDs)
    await Promise.all(
        users.map((user) =>
            prisma.workSchedule.create({
                data: {
                    mondayHours: 8,
                    tuesdayHours: 8,
                    wednesdayHours: 8,
                    thursdayHours: 8,
                    fridayHours: 8,
                    saturdayHours: 0,
                    sundayHours: 0,
                    user: { connect: { id: user.id } },
                },
            }),
        ),
    );

    console.log('WorkSchedules created successfully!');

    // Step 4: Create the Global Project (default project)
    const globalProject = await prisma.project.create({
        data: {
            name: projectNames.DEFAULT_PROJECT,
            color: Color.Gray,
        },
    });
    console.log('Global Project created successfully!');

    // Step 5: Generate Other Projects
    const availableColors = Object.keys(Color).filter((color) => color !== 'Gray');
    const projects = await Promise.all(
        Array.from({ length: 10 }).map(() =>
            prisma.project.create({
                data: {
                    name: casual.company_name,
                    color: Color[casual.random_element(availableColors) as keyof typeof Color],
                },
            }),
        ),
    );
    console.log('Projects created successfully!');

    // Step 6: Associate Users with Projects (Including Global Project)
    await Promise.all(
        users.map((user) =>
            prisma.user.update({
                where: { id: user.id },
                data: {
                    projects: {
                        connect: [
                            ...Array.from({ length: casual.integer(1, 3) }).map(() => ({
                                id: projects[casual.integer(0, projects.length - 1)].id,
                            })),
                            { id: globalProject.id },
                        ],
                    },
                },
            }),
        ),
    );
    console.log('Users associated with projects successfully!');

    // Step 7: Generate Workdays for Users
    const workdays = await Promise.all(
        users.map(async (user) => {
            const today = dateUtils.getLocalCurrentDate();
            const workSchedule = await prisma.workSchedule.findUnique({
                where: { userId: user.id },
            });

            if (!workSchedule) {
                console.warn(`No work schedule found for user ${user.id}`);
                return [];
            }

            const userWorkdays = Array.from({ length: 30 }).map((_, index) => {
                const workdayDate = new Date(today);
                workdayDate.setDate(today.getDate() - index);
                const startOfWorkday = dateUtils.getUTCStartOfDay(workdayDate);

                const dayOfWeek = startOfWorkday.getDay();
                let expectedHours = 0;

                switch (dayOfWeek) {
                    case 0:
                        expectedHours = workSchedule.sundayHours;
                        break;
                    case 1:
                        expectedHours = workSchedule.mondayHours;
                        break;
                    case 2:
                        expectedHours = workSchedule.tuesdayHours;
                        break;
                    case 3:
                        expectedHours = workSchedule.wednesdayHours;
                        break;
                    case 4:
                        expectedHours = workSchedule.thursdayHours;
                        break;
                    case 5:
                        expectedHours = workSchedule.fridayHours;
                        break;
                    case 6:
                        expectedHours = workSchedule.saturdayHours;
                        break;
                }

                if (expectedHours === 0 || dayOfWeek === 0 || dayOfWeek === 6) return null;

                const achievedHours = casual.boolean ? 0 : null;

                return prisma.workday.create({
                    data: {
                        expectedHours,
                        achievedHours,
                        date: startOfWorkday,
                        userId: user.id,
                    },
                });
            });

            return Promise.all(userWorkdays.filter((workday) => workday !== null));
        }),
    );

    console.log('Workdays created successfully!');

    // Step 8: Generate TimeBlocks for each Workday and Update Achieved Hours
    await Promise.all(
        workdays.map((userWorkdays, userIndex) => {
            const user = users[userIndex];

            const validWorkdays = userWorkdays.filter(
                (workday) => workday !== null && workday !== undefined,
            );

            return Promise.all(
                validWorkdays.map(async (workday) => {
                    if (!workday) return;

                    const userProjects = await prisma.project.findMany({
                        where: {
                            users: {
                                some: { id: user.id },
                            },
                        },
                    });

                    const createdTimeBlocks = await Promise.all(
                        Array.from({ length: casual.integer(2, 5) }).map(() => {
                            const workdayDate = new Date(workday.date);
                            workdayDate.setUTCHours(8, 0, 0, 0);

                            const startHour = casual.integer(8, 17);
                            const startMinute = casual.integer(0, 59);
                            const startDateTime = new Date(workday.date);
                            startDateTime.setUTCHours(startHour, startMinute, 0, 0);

                            const maxEndHour = Math.min(startHour + casual.integer(1, 4), 18);
                            const endHour = casual.integer(startHour + 1, maxEndHour);
                            const endMinute = casual.integer(0, 59);
                            const endDateTime = new Date(workday.date);
                            endDateTime.setUTCHours(endHour, endMinute, 0, 0);

                            const project =
                                userProjects[casual.integer(0, userProjects.length - 1)];

                            return prisma.timeBlock.create({
                                data: {
                                    startTime: startDateTime.toISOString(),
                                    endTime: endDateTime.toISOString(),
                                    projectId: project.id,
                                    workDayId: workday.id,
                                },
                            });
                        }),
                    );

                    const totalTimeWorkedInSeconds = createdTimeBlocks.reduce((total, block) => {
                        if (!block.endTime) return total;

                        const startTime = new Date(block.startTime).getTime();
                        const endTime = new Date(block.endTime).getTime();
                        return total + (endTime - startTime) / 1000;
                    }, 0);

                    const achievedHours = parseFloat((totalTimeWorkedInSeconds / 3600).toFixed(2));

                    await prisma.workday.update({
                        where: { id: workday.id },
                        data: { achievedHours },
                    });

                    return createdTimeBlocks;
                }),
            );
        }),
    );

    console.log('TimeBlocks created and Workdays updated successfully!');

    console.log('Database seeded successfully!');
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
