import { WorkDay } from '../model/workDay';
import { dateUtils } from '../utils/date';
import database from './utils/database';

const getAllWorkDays = async (): Promise<WorkDay[]> => {
    try {
        const workDaysPrisma = await database.workday.findMany({
            include: {
                user: true,
                timeBlocks: {
                    include: { project: { include: { users: true } } },
                    orderBy: { startTime: 'asc' },
                },
            },
        });

        return workDaysPrisma.map((workDay) => WorkDay.from(workDay));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getWorkWeekByDates = async ({
    startDate,
    endDate,
    userId,
}: {
    startDate: Date;
    endDate: Date;
    userId: number;
}): Promise<WorkDay[]> => {
    try {
        const workDaysPrisma = await database.workday.findMany({
            where: {
                userId,
                date: { gte: startDate, lte: endDate },
            },
            include: {
                user: true,
                timeBlocks: {
                    include: { project: { include: { users: true } } },
                    orderBy: { startTime: 'asc' },
                },
            },
            orderBy: { date: 'asc' },
        });

        return workDaysPrisma.map((workDay) => WorkDay.from(workDay));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCurrentWorkDay = async ({
    date,
    userId,
}: {
    date: Date;
    userId: number;
}): Promise<WorkDay | null> => {
    try {
        const startDate = dateUtils.getUTCStartOfDay(date);
        const endDate = dateUtils.getUTCEndOfDay(date);

        const workDayPrisma = await database.workday.findFirst({
            where: {
                userId,
                date: { gte: startDate, lte: endDate },
            },
            include: {
                user: true,
                timeBlocks: {
                    include: { project: { include: { users: true } } },
                    orderBy: { startTime: 'asc' },
                },
            },
        });

        return workDayPrisma ? WorkDay.from(workDayPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createWorkDay = async (workDay: WorkDay): Promise<WorkDay> => {
    try {
        const workDayPrisma = await database.workday.create({
            data: {
                date: workDay.getDate(),
                expectedHours: workDay.getExpectedHours(),
                achievedHours: workDay.getAchievedHours(),
                timeBlocks: {
                    connect: workDay
                        .getTimeBlocks()
                        .map((timeBlock) => ({ id: timeBlock.getId() })),
                },
                user: { connect: { id: workDay.getUser().getId() } },
            },
            include: {
                user: true,
                timeBlocks: {
                    include: { project: { include: { users: true } } },
                    orderBy: { startTime: 'asc' },
                },
            },
        });

        return WorkDay.from(workDayPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export const workDayDb = {
    getAllWorkDays,
    getWorkWeekByDates,
    getCurrentWorkDay,
    createWorkDay,
};
