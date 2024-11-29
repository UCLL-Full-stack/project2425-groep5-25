import { WorkSchedule } from '../model/workSchedule';
import database from './utils/database';

const createWorkSchedule = async (workSchedule: WorkSchedule): Promise<WorkSchedule> => {
    try {
        const workSchedulePrisma = await database.workSchedule.create({
            data: {
                mondayHours: workSchedule.getMondayHours(),
                tuesdayHours: workSchedule.getTuesdayHours(),
                wednesdayHours: workSchedule.getWednesdayHours(),
                thursdayHours: workSchedule.getThursdayHours(),
                fridayHours: workSchedule.getFridayHours(),
                saturdayHours: workSchedule.getSaturdayHours(),
                sundayHours: workSchedule.getSaturdayHours(),
            },
        });

        return WorkSchedule.from(workSchedulePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export const workScheduleDb = {
    createWorkSchedule,
};
