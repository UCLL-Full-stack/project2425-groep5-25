import { beforeEach, expect, jest, test } from '@jest/globals';
import { afterEach } from 'node:test';
import { User } from '../../model/user';
import { WorkSchedule } from '../../model/workSchedule';
import { workScheduleDb } from '../../repository/workSchedule.db';
import { workScheduleService } from '../../service/workSchedule.service';
import { Role } from '../../types';

let mockCreateWorkSchedule: jest.MockedFunction<typeof workScheduleDb.createWorkSchedule>;

beforeEach(() => {
    mockCreateWorkSchedule = jest.fn();
    workScheduleDb.createWorkSchedule = mockCreateWorkSchedule;
});
afterEach(() => {
    jest.clearAllMocks();
});

test('should create a work schedule with default values', async () => {
    //given
    const mockUser = new User({
        id: 1,
        userName: 'Yasir_DaBoss',
        firstName: 'Yasir',
        lastName: 'Hozan',
        email: 'yasir.hozan@example.com',
        passWord: '@Password123!',
        role: 'user' as Role,
    });
    const expectedWorkSchedule = new WorkSchedule({
        mondayHours: 8,
        tuesdayHours: 8,
        wednesdayHours: 8,
        thursdayHours: 8,
        fridayHours: 8,
        saturdayHours: 0,
        sundayHours: 0,
        user: mockUser,
    });
    //when

    mockCreateWorkSchedule.mockResolvedValue(expectedWorkSchedule);

    const result = await workScheduleService.createDefaultWorkSchedule(mockUser);

    // then
    expect(result).toEqual(expectedWorkSchedule);
    expect(mockCreateWorkSchedule).toHaveBeenCalledWith(
        expect.objectContaining({
            mondayHours: 8,
            tuesdayHours: 8,
            wednesdayHours: 8,
            thursdayHours: 8,
            fridayHours: 8,
            saturdayHours: 0,
            sundayHours: 0,
            user: mockUser,
        }),
    );
});
