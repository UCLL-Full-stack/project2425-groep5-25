import { WorkDay } from '../model/workDay';
import { workDayDb } from '../repository/workDay.db';
import { JwtToken } from '../types';

const getAllWorkDays = async (): Promise<WorkDay[]> => {
    return workDayDb.getAllWorkDays();
};

const getWorkWeekByDates = async ({
    start,
    end,
    auth,
}: {
    start: string;
    end: string;
    auth: JwtToken;
}): Promise<WorkDay[]> => {
    const { userId, role } = auth;

    const startDate = new Date(start);
    if (isNaN(startDate.getTime()))
        throw new Error(
            'Invalid start date format. Please use a valid date string (e.g., YYYY-MM-DD).',
        );
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(end);
    if (isNaN(endDate.getTime()))
        throw new Error(
            'Invalid end date format. Please use a valid date string (e.g., YYYY-MM-DD).',
        );
    endDate.setUTCHours(23, 59, 59, 999);

    if (startDate > endDate) throw new Error('Start date cannot be after end date');

    return await workDayDb.getWorkWeekByDates({ startDate, endDate, userId });
};

export const workDayService = {
    getAllWorkDays,
    getWorkWeekByDates,
};
