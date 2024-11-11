import { PrismaClient } from '@prisma/client';
import casual from 'casual';

const prisma = new PrismaClient();

const roles = ['admin', 'student', 'lecturer', 'guest'];
const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple'];

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
    console.log('WorkSchedules seeded successfully!');

    // Step 3: Generate Projects
    const projects = await Promise.all(
        Array.from({ length: 10 }).map(() =>
            prisma.project.create({
                data: {
                    name: casual.company_name,
                    color: casual.random_element(colors),
                },
            })
        )
    );
    console.log('Projects seeded successfully!');

    // Step 4: Generate Users and associate with Projects
    const users = await Promise.all(
        workSchedules.map((schedule) =>
            prisma.user.create({
                data: {
                    userName: casual.username,
                    firstName: casual.first_name,
                    lastName: casual.last_name,
                    email: casual.email,
                    passWord: casual.password,
                    role: casual.random_element(roles),
                    workScheduleId: schedule.id,
                    projects: {
                        connect: Array.from({ length: casual.integer(1, 3) }).map(() => ({
                            id: projects[casual.integer(0, projects.length - 1)].id,
                        })),
                    },
                },
            })
        )
    );
    console.log('Users seeded successfully!');

    // Step 5: Generate Workdays
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
                })
            );
            return Promise.all(userWorkdays);
        })
    );
    console.log('Workdays seeded successfully!');

    // Step 6: Generate TimeBlocks
    const timeBlocks = await Promise.all(
        workdays.map((userWorkdays) =>
            Promise.all(
                userWorkdays.map((workday) => {
                    const timeBlockPromises = Array.from({ length: casual.integer(1, 3) }).map(() =>
                        prisma.timeBlock.create({
                            data: {
                                startTime: new Date(
                                    casual.date('YYYY-MM-DD') + ' ' + casual.time('HH:mm:ss')
                                ).toISOString(),
                                endTime: new Date(
                                    casual.date('YYYY-MM-DD') + ' ' + casual.time('HH:mm:ss')
                                ).toISOString(),
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
    console.log('TimeBlocks seeded successfully!');

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