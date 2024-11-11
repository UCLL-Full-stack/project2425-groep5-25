import { enIE } from 'date-fns/locale';
import { NotFoundError } from '../errors';
import { TimeBlock } from '../model/timeBlock';
import { WorkDay } from '../model/workDay';
import userRepository from './user.db';
import database from './database';

// const getTimeBlocksFromUser = async ({ userId }: { userId: number }): Promise<TimeBlock[]> => {
//     try {
//         const user = await userRepository.getUserById({ id: userId });
//         if (!user) throw new NotFoundError("User not found");

//         const timeBlocks = user.getWorkDays()
//             .flatMap((workDay: WorkDay) => workDay.getTimeBlocks());

//         return timeBlocks;
//     } catch (error) {
//         throw new Error('Database error. See server log for details');
//     }
// };

// const getRunningTimeBlock = async ({ userId }: { userId: number }): Promise<TimeBlock | null> => {
//     try {
//         const user = await userRepository.getUserById({ id: userId });
//         if (!user) throw new NotFoundError("User not found");

//         const timeBlocks = user.getWorkDays()
//             .flatMap((workDay: WorkDay) => workDay.getTimeBlocks());

//         return timeBlocks.find(timeBlock => timeBlock.getEndTime() === undefined) || null;
//     } catch (error) {
//         throw new Error('Database error. See server log for details');
//     }
// };

// const createTimeBlock = ({ timeBlock }: { timeBlock: TimeBlock }): void => {
//     console.log(timeBlock);
// };

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

export default{
    getAllTimeBlocks
};
