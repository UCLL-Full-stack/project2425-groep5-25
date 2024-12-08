import { WorkDay } from '../model/workDay';
import database from './utils/database';

const getAllWorkDays = async (): Promise<WorkDay[]> => {
    try {
        const workDaysPrisma = await database.workday.findMany({
            include: {
                user: true,
                timeBlocks: { include: { project: { include: { users: true } } } },
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
                user: { id: userId },
                date: { lte: startDate, gte: endDate },
            },
            include: {
                user: true,
                timeBlocks: { include: { project: { include: { users: true } } } },
            },
        });

        return workDaysPrisma.map((workDay) => WorkDay.from(workDay));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export const workDayDb = {
    getAllWorkDays,
    getWorkWeekByDates,
};
