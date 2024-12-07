import { WorkDay } from '../model/workDay';
import database from './utils/database';

// const getAllWorkDays = (): WorkDay[] => workDays;

// const getCurrentWorkday = async ({ userId }: { userId: number }): Promise<WorkDay | null> => {
//     try {
//         const user = await userRepository.getUserById({ id: userId });
//         if (!user) throw new NotFoundError("User not found");

//         const currentDay = new Date();
//         const currentWorkday = user.getWorkDays().find((workDay: WorkDay) => {
//             const date = new Date(workDay.getDate());
//             return date.toDateString() === currentDay.toDateString();
//         });

//         return currentWorkday || null;
//     } catch (error) {
//         throw new Error('Database error. See server log for details');
//     }
// };

const getAllWorkDays = async (): Promise<WorkDay[]> => {
    try {
        const workDaysPrisma = await database.workday.findMany({
            include: {
                user: {
                    // Include 'user' relation and 'workSchedule' for the user
                    include: {
                        workSchedule: true, // Include the 'workSchedule' relation for the user
                    },
                },
                timeBlocks: {
                    // Include timeBlocks and its 'user' and 'project'
                    include: {
                        user: {
                            // Include 'user' inside 'timeBlocks'
                            include: {
                                workSchedule: true, // Include the 'workSchedule' for the user
                            },
                        },
                        project: true, // Include the related 'project' in 'timeBlocks'
                    },
                },
            },
        });

        return workDaysPrisma.map((x) => WorkDay.from(x));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export const workDayDb = {
    getAllWorkDays,
};
