import { TimeBlock } from '../model/timeBlock';
import { timeBlockDb } from '../repository/timeBlock.db';

const getAllTimeBlocks = async (): Promise<TimeBlock[]> => {
    return timeBlockDb.getAllTimeBlocks();
};

const getWorkdaysWithinRange = async (start: string, end: string): Promise<TimeBlock[]> => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return timeBlockDb.getWorkdaysByDateRange(startDate, endDate);
};

const getCurrentWorkWeek = async (userId: number): Promise<TimeBlock[]> => {
    // Get today's date
    const today = new Date();

    // Calculate the current week's start (Monday) and end (Sunday)
    const startDate = getStartOfWeek(today);
    const endDate = getEndOfWeek(today);

    // Fetch workdays for the user in the calculated date range
    return timeBlockDb.getWorkdaysByDateRangeFromUser(userId, startDate, endDate);
};

// Helper function to get the start date of the current week (Monday)
const getStartOfWeek = (date: Date): Date => {
    const start = new Date(date);
    const day = start.getDay(); // Sunday = 0, Monday = 1, etc.

    // Calculate how many days to subtract to get Monday
    const diff = day === 0 ? 6 : day - 1; // If Sunday, subtract 6 days to get the previous Monday
    start.setDate(start.getDate() - diff);
    start.setHours(0, 0, 0, 0); // Set to the start of the day (midnight)
    return start;
};

// Helper function to get the end date of the current week (Sunday)
const getEndOfWeek = (date: Date): Date => {
    const end = new Date(date);
    const day = end.getDay(); // Sunday = 0, Monday = 1, etc.

    // Calculate how many days to add to get Sunday
    const diff = day === 0 ? 0 : 7 - day; // If Sunday, no days need to be added
    end.setDate(end.getDate() + diff);
    end.setHours(23, 59, 59, 999); // Set to the end of the day (just before midnight)
    return end;
};

export const timeBlockService = {
    getAllTimeBlocks,
    getWorkdaysWithinRange,
    getCurrentWorkWeek,
};
