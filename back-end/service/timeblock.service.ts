import { TimeBlock } from '../model/timeBlock';
import timeBlockRepository from '../repository/timeBlock.db';

const getAllTimeBlocks = (): TimeBlock[] => timeBlockRepository.getTimeBlocks();

export default { getAllTimeBlocks };
