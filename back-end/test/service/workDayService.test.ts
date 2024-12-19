import { beforeEach, expect, jest, test } from '@jest/globals';
import { afterEach } from 'node:test';
import { Project } from '../../model/project';
import { TimeBlock } from '../../model/timeBlock';
import { User } from '../../model/user';
import { WorkDay } from '../../model/workDay';
import { workDayDb } from '../../repository/workDay.db';
import { workDayService } from '../../service/workDay.service';
import { Color, JwtToken, Role } from '../../types';
let mockGetAllWorkDays: jest.MockedFunction<typeof workDayDb.getAllWorkDays>;
let mockGetWorkWeekByDates: jest.MockedFunction<typeof workDayDb.getWorkWeekByDates>;
const eUser2 = new User({
    userName: 'yasirrandom',
    firstName: 'Yasir',
    lastName: 'Bazzzinga',
    email: 'hozan.yasir@example.com',
    passWord: 'Password123!',
    role: 'user' as Role,
});
const cUser1 = new User({
    id: 1,
    userName: 'Yasir_DaBoss',
    firstName: 'Yasir',
    lastName: 'Hozan',
    email: 'yasir.hozan@example.com',
    passWord: '@Password123!',
    role: 'user' as Role,
});
const cProject1 = new Project({
    name: 'General',
    color: Color.Gray,
    users: [cUser1],
});
const cTimeBlock1 = new TimeBlock({
    id: 1,
    startTime: new Date('2024-12-01 08:00:00'),
    endTime: new Date('2024-12-01 10:00:00'),
    project: cProject1,
});

const cWorkDay1 = new WorkDay({
    expectedHours: 8,
    achievedHours: 8,
    date: new Date('2024-12-01'),
    user: cUser1,
    timeBlocks: [cTimeBlock1],
});

const cWorkDay2 = new WorkDay({
    expectedHours: 8,
    achievedHours: 8,
    date: new Date('2024-12-01'),
    user: cUser1,
    timeBlocks: [cTimeBlock1],
});
const mockWorkDays = [cWorkDay1, cWorkDay2];
const validAuth: JwtToken = { userId: 1, role: 'user' };
const start = '2024-12-01';
const end = '2024-12-07';

beforeEach(() => {
    mockGetAllWorkDays = jest.fn();
    mockGetWorkWeekByDates = jest.fn();
    workDayDb.getAllWorkDays = mockGetAllWorkDays;
    workDayDb.getWorkWeekByDates = mockGetWorkWeekByDates;
});
afterEach(() => {
    jest.clearAllMocks();
});

test('should return all work days', async () => {
    mockGetAllWorkDays.mockResolvedValue(mockWorkDays);

    const result = await workDayService.getAllWorkDays();
    console.log(result);
    expect(result).toEqual(mockWorkDays);

    expect(mockGetAllWorkDays).toHaveBeenCalledTimes(1);
});
test('should return an empty array if no work days are found', async () => {
    mockGetAllWorkDays.mockResolvedValue([]);
    const result = await workDayService.getAllWorkDays();
    expect(result).toEqual([]);
    expect(mockGetAllWorkDays).toHaveBeenCalledTimes(1);
});
test('should return work days within the given date range for a user', async () => {
    // given

    mockGetWorkWeekByDates.mockImplementation(({ startDate, endDate, userId }) => {
        if (startDate && endDate && userId === 1) {
            return Promise.resolve(mockWorkDays);
        }
        throw new Error('Invalid parameters');
    });
    //when
    const result = await workDayService.getWorkWeekByDates({
        start: start,
        end: end,
        auth: validAuth,
    });
    //expect
    expect(mockGetWorkWeekByDates).toHaveBeenCalledWith({
        startDate: new Date('2024-12-01T00:00:00.000Z'),
        endDate: new Date('2024-12-07T23:59:59.999Z'),
        userId: validAuth.userId,
    });
    expect(result).toEqual(mockWorkDays);
});
test('should throw an error for an invalid start date', async () => {
    await expect(
        workDayService.getWorkWeekByDates({
            start: 'invalid-date',
            end: end,
            auth: validAuth,
        }),
    ).rejects.toThrow(
        'Invalid start date format. Please use a valid date string (e.g., YYYY-MM-DD).',
    );
});
//side note if you are working with async functions you gotta use rejects for thrown errors
//it ensures and waits for promise otherwise your program crashes out midway
test('should throw an error for an invalid start date', async () => {
    await expect(
        workDayService.getWorkWeekByDates({
            start: start,
            end: 'invalid-date',
            auth: validAuth,
        }),
    ).rejects.toThrow(
        'Invalid end date format. Please use a valid date string (e.g., YYYY-MM-DD).',
    );
});
test('should throw an error for an invalid start date', async () => {
    const invalidStart = '2024-12-07';
    const invalidEnd = '2024-12-01';
    await expect(
        workDayService.getWorkWeekByDates({
            start: invalidStart,
            end: invalidEnd,
            auth: validAuth,
        }),
    ).rejects.toThrow('Start date cannot be after end date');
});
