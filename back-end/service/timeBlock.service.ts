import { TimeBlock } from '../model/timeBlock';
import { timeBlockDb } from '../repository/timeBlock.db';

const getAllTimeBlocks = async (): Promise<TimeBlock[]> => {
    return timeBlockDb.getAllTimeBlocks();
};

export const timeBlockService = {
    getAllTimeBlocks,
};
