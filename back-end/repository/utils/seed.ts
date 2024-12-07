import { PrismaClient } from '@prisma/client';
import casual from 'casual';
import { projectNames } from '../../constants';
import { Color, Role } from '../../types';

const prisma = new PrismaClient();

const main = async () => {
    // Step 1: Clean the database
    await prisma.timeBlock.deleteMany(); // Delete TimeBlocks first
    await prisma.workday.deleteMany(); // Delete Workdays next
    await prisma.workSchedule.deleteMany(); // Delete WorkSchedules next
    await prisma.user.deleteMany(); // Now delete Users
    await prisma.project.deleteMany(); // Finally, delete Projects
    console.log('Cleaned the database!');

    // Step 2: Generate Users First (Without Work Schedule)
    const users = await Promise.all(
        Array.from({ length: 20 }).map(() =>
            prisma.user.create({
                data: {
                    userName: casual.username,
                    firstName: casual.first_name,
                    lastName: casual.last_name,
                    email: casual.email,
                    passWord: casual.password,
                    role: casual.random_element(['admin', 'student', 'lecturer', 'guest']) as Role,
                },
            }),
        ),
    );
    console.log('Users created successfully!');

    // Step 3: Create WorkSchedules and associate them with Users
    const workSchedules = await Promise.all(
        users.map((user) =>
            prisma.workSchedule.create({
                data: {
                    mondayHours: parseFloat(casual.double(0, 8).toFixed(1)),
                    tuesdayHours: parseFloat(casual.double(0, 8).toFixed(1)),
                    wednesdayHours: parseFloat(casual.double(0, 8).toFixed(1)),
                    thursdayHours: parseFloat(casual.double(0, 8).toFixed(1)),
                    fridayHours: parseFloat(casual.double(0, 8).toFixed(1)),
                    saturdayHours: parseFloat(casual.double(0, 8).toFixed(1)),
                    sundayHours: parseFloat(casual.double(0, 8).toFixed(1)),
                    user: { connect: { id: user.id } }, // Associate the created work schedule with the user
                },
            }),
        ),
    );
    console.log('WorkSchedules created successfully and associated with users!');

    // Step 4: Create the Global Project (default project)
    const globalProject = await prisma.project.create({
        data: {
            name: projectNames.DEFAULT_PROJECT,
            color: Color.Gray, // Using Gray color for the default project
        },
    });
    console.log('Global Project created successfully!');

    // Step 5: Generate Other Projects
    const availableColors = Object.keys(Color).filter((color) => color !== 'Gray'); // Exclude Gray color
    const projects = await Promise.all(
        Array.from({ length: 10 }).map(() =>
            prisma.project.create({
                data: {
                    name: casual.company_name,
                    color: Color[casual.random_element(availableColors) as keyof typeof Color], // Random color, excluding Gray
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
                            { id: globalProject.id }, // Ensure global project is always connected to each user
                        ],
                    },
                },
            }),
        ),
    );
    console.log('Users associated with projects successfully!');

    // Step 7: Generate Workdays for Users
    const workdays = await Promise.all(
        users.map((user) => {
            const userWorkdays = Array.from({ length: 45 }).map(() =>
                prisma.workday.create({
                    data: {
                        expectedHours: parseFloat(casual.double(0, 8).toFixed(1)),
                        achievedHours: casual.boolean
                            ? parseFloat(casual.double(0, 8).toFixed(1))
                            : null,
                        date: new Date(casual.date('YYYY-MM-DD')).toISOString(),
                        userId: user.id,
                    },
                }),
            );
            return Promise.all(userWorkdays);
        }),
    );
    console.log('Workdays created successfully!');

    // Step 8: Generate TimeBlocks for each Workday
    const timeBlocks = await Promise.all(
        workdays.map((userWorkdays) =>
            Promise.all(
                userWorkdays.map((workday) => {
                    const timeBlockPromises = Array.from({ length: casual.integer(1, 3) }).map(() =>
                        prisma.timeBlock.create({
                            data: {
                                startTime: new Date(
                                    casual.date('YYYY-MM-DD') + ' ' + casual.time('HH:mm:ss'),
                                ).toISOString(),
                                endTime: new Date(
                                    casual.date('YYYY-MM-DD') + ' ' + casual.time('HH:mm:ss'),
                                ).toISOString(),
                                projectId: projects[casual.integer(0, projects.length - 1)].id, // Random project association
                                workDayId: workday.id,
                            },
                        }),
                    );
                    return Promise.all(timeBlockPromises);
                }),
            ),
        ),
    );
    console.log('TimeBlocks created successfully!');

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
