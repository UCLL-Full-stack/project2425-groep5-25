import { User } from '../model/user';
import { WorkSchedule } from '../model/workSchedule';
import { workScheduleDb } from '../repository/workSchedule.db';

const createDefaultWorkSchedule = async (user: User): Promise<WorkSchedule> => {
    const newWorkSchedule = new WorkSchedule({
        mondayHours: 8,
        tuesdayHours: 8,
        wednesdayHours: 8,
        thursdayHours: 8,
        fridayHours: 8,
        saturdayHours: 0,
        sundayHours: 0,
        user,
    });

    return await workScheduleDb.createWorkSchedule(newWorkSchedule);
};

export const workScheduleService = {
    createDefaultWorkSchedule,
};
