import { WorkDay } from '../model/workDay';
import userRepository from './user.db';
import { NotFoundError } from '../errors';

const getCurrentWorkday = async ({ userId }: { userId: number }): Promise<WorkDay | null> => {
    try {
        const user = await userRepository.getUserById({ id: userId });
        if (!user) throw new NotFoundError("User not found");
        
        const currentDay = new Date();
        const currentWorkday = user.getWorkDays().find((workDay: WorkDay) => {
            const date = new Date(workDay.getDate());
            return date.toDateString() === currentDay.toDateString();
        });
    
        return currentWorkday || null;
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
};

export default{
    getCurrentWorkday
}