import { TimeBlock } from '../model/timeBlock';
import database from './utils/database';

const getAllTimeBlocks = async (): Promise<TimeBlock[]> => {
    try {
        const timeBlocksPrisma = await database.timeBlock.findMany({
            include: {
                workDay: true,
                project: { include: { users: true } },
            },
        });

        return timeBlocksPrisma.map((timeBlock) => TimeBlock.from(timeBlock));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export const timeBlockDb = {
    getAllTimeBlocks,
};
