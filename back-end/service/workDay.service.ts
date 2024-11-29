import { WorkDay } from '../model/workDay';
import { workDayDb } from '../repository/workDay.db';

const getAllWorkDays = async (): Promise<WorkDay[]> => {
    return workDayDb.getAllWorkDays();
};

export const workDayService = {
    getAllWorkDays,
};
