import { TimeBlock } from '../model/timeBlocks';
import timeBlockRepository from '../repository/timeBlocks.db';

const getAllTimeBlocks = (): TimeBlock[] => timeBlockRepository.getTimeBlocks();

export default { getAllTimeBlocks };
