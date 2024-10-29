import { TimeBlock } from '../model/timeBlock';
import timeBlockRepository from '../repository/timeblock.db';

const getAllTimeBlocks = (): TimeBlock[] => timeBlockRepository.getTimeBlocks();

export default { getAllTimeBlocks };
