import { TimeBlock } from '../model/timeBlock';
import { WorkDay } from '../model/workDay';
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

const createTimeBlock = async (timeBlock: TimeBlock, workDay: WorkDay): Promise<TimeBlock> => {
    try {
        const timeBlockPrisma = await database.timeBlock.create({
            data: {
                startTime: timeBlock.getStartTime(),
                endTime: timeBlock.getEndTime(),
                workDay: { connect: { id: workDay.getId() } },
                project: { connect: { id: timeBlock.getProject().getId() } },
            },
            include: {
                workDay: true,
                project: { include: { users: true } },
            },
        });

        return TimeBlock.from(timeBlockPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateTimeBlock = async (timeBlock: TimeBlock): Promise<TimeBlock> => {
    try {
        const updatedTimeBlockPrisma = await database.timeBlock.update({
            where: { id: timeBlock.getId() },
            data: {
                startTime: timeBlock.getStartTime(),
                endTime: timeBlock.getEndTime(),
                project: { connect: { id: timeBlock.getProject().getId() } },
            },
            include: {
                workDay: true,
                project: { include: { users: true } },
            },
        });

        return TimeBlock.from(updatedTimeBlockPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getRunningTimeBlockByUserId = async ({
    userId,
}: {
    userId: number;
}): Promise<TimeBlock | null> => {
    try {
        const timeBlockPrisma = await database.timeBlock.findFirst({
            where: {
                workDay: { userId },
                endTime: null,
            },
            include: {
                workDay: true,
                project: { include: { users: true } },
            },
        });

        return timeBlockPrisma ? TimeBlock.from(timeBlockPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export const timeBlockDb = {
    getAllTimeBlocks,
    createTimeBlock,
    updateTimeBlock,
    getRunningTimeBlockByUserId,
};
