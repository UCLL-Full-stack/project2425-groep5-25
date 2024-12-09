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

export const workDayDb = {
    getAllWorkDays,
};
