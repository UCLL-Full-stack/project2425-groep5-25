import { PrismaClient } from '@prisma/client';
import casual from 'casual';

const prisma = new PrismaClient();

const roles = ['admin', 'student', 'lecturer', 'guest'];
const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500', '#800080'];

const main = async () => {
    // Step 1: Clean the database
    await prisma.timeBlock.deleteMany();
    await prisma.workday.deleteMany();
    await prisma.user.deleteMany();
    await prisma.workSchedule.deleteMany();
    await prisma.project.deleteMany();

    // Step 2: Generate WorkSchedules (15 users)
    const workSchedules = await Promise.all(
        Array.from({ length: 15 }).map(() =>
            prisma.workSchedule.create({
                data: {
                    mondayHours: parseFloat(casual.double(0, 8).toFixed(1)),
                    tuesdayHours: parseFloat(casual.double(0, 8).toFixed(1)),
                    wednesdayHours: parseFloat(casual.double(0, 8).toFixed(1)),
                    thursdayHours: parseFloat(casual.double(0, 8).toFixed(1)),
                    fridayHours: parseFloat(casual.double(0, 8).toFixed(1)),
                    saturdayHours: parseFloat(casual.double(0, 8).toFixed(1)),
                    sundayHours: parseFloat(casual.double(0, 8).toFixed(1)),
                },
            })
        )
    );

    // Step 3: Generate Users linked to WorkSchedules
    const users = await Promise.all(
        workSchedules.map((schedule) =>
            prisma.user.create({
                data: {
                    username: casual.username,
                    firstname: casual.first_name,
                    lastname: casual.last_name,
                    email: casual.email,
                    password: casual.password,
                    role: casual.random_element(roles),
                    workScheduleId: schedule.id,
                },
            })
        )
    );

    // Step 4: Generate Projects with random colors
    const projects = await Promise.all(
        Array.from({ length: 5 }).map(() =>
            prisma.project.create({
                data: {
                    name: casual.company_name,
                    color: casual.random_element(colors),
                },
            })
        )
    );

    // Step 5: Generate Workdays linked to Users with valid ISO 8601 date format
    const workdays = await Promise.all(
        users.map((user) => {
            // Generate 30 workdays for each user
            const userWorkdays = Array.from({ length: 30 }).map(() =>
                prisma.workday.create({
                    data: {
                        expectedHours: parseFloat(casual.double(0, 8).toFixed(1)),
                        achievedHours: casual.boolean
                            ? parseFloat(casual.double(0, 8).toFixed(1))
                            : null,
                        date: new Date(casual.date('YYYY-MM-DD')).toISOString(), // Ensure ISO 8601 format
                        userId: user.id,
                    },
                })
            );

            return Promise.all(userWorkdays);
        })
    );

    // Step 6: Generate TimeBlocks linked to Projects and Workdays with valid ISO 8601 date format
    const timeBlocks = await Promise.all(
        workdays.map((userWorkdays) =>
            Promise.all(
                userWorkdays.map((workday) => {
                    // Generate between 1 to 3 time blocks for each workday
                    const numberOfTimeBlocks = casual.integer(1, 3);

                    const timeBlockPromises = Array.from({ length: numberOfTimeBlocks }).map(() =>
                        prisma.timeBlock.create({
                            data: {
                                // Generate valid ISO 8601 DateTime for startTime and endTime
                                startTime: new Date(
                                    casual.date('YYYY-MM-DD') + ' ' + casual.time('HH:mm:ss')
                                ).toISOString(), // ISO 8601 format
                                endTime: new Date(
                                    casual.date('YYYY-MM-DD') + ' ' + casual.time('HH:mm:ss')
                                ).toISOString(), // ISO 8601 format
                                projectId: projects[casual.integer(0, projects.length - 1)].id,
                                workDayId: workday.id,
                            },
                        })
                    );

                    return Promise.all(timeBlockPromises);
                })
            )
        )
    );

    console.log('Database seeded successfully using casual!');
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
