import { TimeBlock } from '../model/timeBlock';
import database from './utils/database';

const getAllTimeBlocks = async (): Promise<TimeBlock[]> => {
    try {
        const timeBlocksPrisma = await database.timeBlock.findMany({
            include: {
                project: true,
                workDay: true,
            },
        });
        return timeBlocksPrisma.map((x) => TimeBlock.from(x));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getWorkdaysByDateRange = async (startDate: Date, endDate: Date): Promise<TimeBlock[]> => {
    try {
        const timeBlocksPrisma = await database.timeBlock.findMany({
            where: {
                workDay: {
                    date: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            },
            include: {
                project: true,
                workDay: true,
            },
        });

        return timeBlocksPrisma.map((x) => TimeBlock.from(x));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getWorkdaysByDateRangeFromUser = async (
    userId: number,
    startDate: Date,
    endDate: Date,
): Promise<TimeBlock[]> => {
    try {
        const timeBlocksPrisma = await database.timeBlock.findMany({
            where: {
                workDay: {
                    userId: userId,
                    date: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            },
            include: {
                project: true,
                workDay: true,
            },
        });

        return timeBlocksPrisma.map((x) => TimeBlock.from(x));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export const timeBlockDb = {
    getAllTimeBlocks,
    getWorkdaysByDateRange,
    getWorkdaysByDateRangeFromUser,
};
