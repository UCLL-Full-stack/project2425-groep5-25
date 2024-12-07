import { PrismaClient } from '@prisma/client';
import casual from 'casual';
import { projectNames } from '../../constants';
import { Color, Role } from '../../types';
import { calculateAchievedHours } from './workHours';

const prisma = new PrismaClient();

const generateDateGoingBack = (daysBack: number): string => {
    const today = new Date();
    today.setDate(today.getDate() - daysBack);
    return today.toISOString().split('T')[0]; // Only return the date part (YYYY-MM-DD)
};

const generateWeekdayWorkday = (index: number, takenDates: Set<string>): string => {
    let daysBack = index;
    while (true) {
        const date = generateDateGoingBack(daysBack);
        const dayOfWeek = new Date(date).getDay();

        // Skip weekends (0: Sunday, 6: Saturday)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            daysBack++;
            continue;
        }

        // Check if the date has already been taken
        if (takenDates.has(date)) {
            daysBack++;
            continue;
        }

        // Mark this date as taken and return it in ISO-8601 format
        takenDates.add(date);
        return new Date(date).toISOString(); // Ensure full ISO-8601 DateTime
    }
};

const main = async () => {
    // Step 1: Clean the database
    await prisma.timeBlock.deleteMany();
    await prisma.workday.deleteMany();
    await prisma.user.deleteMany();
    await prisma.workSchedule.deleteMany();
    await prisma.project.deleteMany();
    console.log('Cleaned the database!');

    // Step 2: Generate WorkSchedules
    const workSchedules = await Promise.all(
        Array.from({ length: 20 }).map(() =>
            prisma.workSchedule.create({
                data: {
                    mondayHours: 8,
                    tuesdayHours: 8,
                    wednesdayHours: 8,
                    thursdayHours: 8,
                    fridayHours: 8,
                    saturdayHours: 0,
                    sundayHours: 0,
                },
            }),
        ),
    );
    console.log('WorkSchedules seeded successfully!');

    // Step 3: Create the Specific Project (Global Project)
    const globalProject = await prisma.project.create({
        data: {
            name: projectNames.DEFAULT_PROJECT,
            color: Color.Gray,
        },
    });
    console.log('Global Project created successfully!');

    // Step 4: Generate Projects
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
    console.log('Projects seeded successfully!');

    // Step 5: Generate Users and associate with Projects, including Global Project
    const users = await Promise.all(
        workSchedules.map((schedule) =>
            prisma.user.create({
                data: {
                    userName: casual.username,
                    firstName: casual.first_name,
                    lastName: casual.last_name,
                    email: casual.email,
                    passWord: casual.password,
                    role: casual.random_element(['admin', 'student', 'lecturer', 'guest']) as Role,
                    workScheduleId: schedule.id,
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
    console.log('Users seeded successfully!');

    // Step 6: Generate Workdays (Going Back from Today)
    const workdays = await Promise.all(
        users.map((user) => {
            const takenDates = new Set<string>(); // Store unique dates for this user
            return Promise.all(
                Array.from({ length: 5 }).map((_, index) => {
                    return prisma.workday.create({
                        data: {
                            expectedHours: 8,
                            achievedHours: 0,
                            date: generateWeekdayWorkday(index, takenDates),
                            userId: user.id,
                        },
                    });
                }),
            );
        }),
    );
    console.log('Workdays seeded successfully!');

    // Step 7: Generate TimeBlocks and update achievedHours for each Workday
    for (const userWorkdays of workdays) {
        for (const workday of userWorkdays) {
            const timeBlocks = await Promise.all(
                Array.from({ length: casual.integer(1, 3) }).map(() => {
                    const duration = casual.integer(90, 150) * 60000;
                    const startTime = new Date(
                        casual.date('YYYY-MM-DD') + ' ' + casual.time('HH:mm:ss'),
                    );
                    const endTime = new Date(startTime.getTime() + duration);
                    return prisma.timeBlock.create({
                        data: {
                            startTime: startTime.toISOString(),
                            endTime: endTime.toISOString(),
                            projectId: projects[casual.integer(0, projects.length - 1)].id,
                            workDayId: workday.id,
                        },
                    });
                }),
            );

            // Map TimeBlocks to a SimpleTimeBlock structure
            const simpleTimeBlocks = timeBlocks
                .filter((block) => block.endTime !== null)
                .map((block) => ({
                    startTime: new Date(block.startTime),
                    endTime: new Date(block.endTime!),
                }));

            const achievedHours = calculateAchievedHours(simpleTimeBlocks);

            await prisma.workday.update({
                where: { id: workday.id },
                data: { achievedHours },
            });
        }
    }

    console.log('TimeBlocks and Workday achievedHours seeded successfully!');

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
