import { expect, test } from '@jest/globals';
import { User } from '../../model/user';
import { WorkSchedule } from '../../model/workSchedule';
import { Role } from '../../types';

const user = new User({
    id: 1,
    userName: 'yasirrandom',
    firstName: 'Yasir',
    lastName: 'Bazzzinga',
    email: 'hozan.yasir@example.com',
    passWord: 'Password123!',
    role: 'user' as Role,
});

const createWorkSchedule = (overrides: Partial<{ [key: string]: number }>) => {
    return () =>
        new WorkSchedule({
            mondayHours: 8,
            tuesdayHours: 8,
            wednesdayHours: 8,
            thursdayHours: 8,
            fridayHours: 8,
            saturdayHours: 0,
            sundayHours: 0,
            user: user,
            ...overrides,
        });
};

test('should throw an error if Monday hours are negative', () => {
    const expectedError = 'WorkSchedule validation: Monday hours must be in range of 0-8';
    expect(createWorkSchedule({ mondayHours: -1 })).toThrow(expectedError);
});

test('should throw an error if Monday hours exceed 8', () => {
    const expectedError = 'WorkSchedule validation: Monday hours must be in range of 0-8';
    expect(createWorkSchedule({ mondayHours: 9 })).toThrow(expectedError);
});

test('should throw an error if Tuesday hours are negative', () => {
    const expectedError = 'WorkSchedule validation: Tuesday hours must be in range of 0-8';
    expect(createWorkSchedule({ tuesdayHours: -1 })).toThrow(expectedError);
});

test('should throw an error if Tuesday hours exceed 8', () => {
    const expectedError = 'WorkSchedule validation: Tuesday hours must be in range of 0-8';
    expect(createWorkSchedule({ tuesdayHours: 9 })).toThrow(expectedError);
});

test('should throw an error if Wednesday hours are negative', () => {
    const expectedError = 'WorkSchedule validation: Wednesday hours must be in range of 0-8';
    expect(createWorkSchedule({ wednesdayHours: -1 })).toThrow(expectedError);
});

test('should throw an error if Wednesday hours exceed 8', () => {
    const expectedError = 'WorkSchedule validation: Wednesday hours must be in range of 0-8';
    expect(createWorkSchedule({ wednesdayHours: 9 })).toThrow(expectedError);
});

test('should throw an error if Thursday hours are negative', () => {
    const expectedError = 'WorkSchedule validation: Thursday hours must be in range of 0-8';
    expect(createWorkSchedule({ thursdayHours: -1 })).toThrow(expectedError);
});

test('should throw an error if Thursday hours exceed 8', () => {
    const expectedError = 'WorkSchedule validation: Thursday hours must be in range of 0-8';
    expect(createWorkSchedule({ thursdayHours: 9 })).toThrow(expectedError);
});

test('should throw an error if Friday hours are negative', () => {
    const expectedError = 'WorkSchedule validation: Friday hours must be in range of 0-8';
    expect(createWorkSchedule({ fridayHours: -1 })).toThrow(expectedError);
});

test('should throw an error if Friday hours exceed 8', () => {
    const expectedError = 'WorkSchedule validation: Friday hours must be in range of 0-8';
    expect(createWorkSchedule({ fridayHours: 9 })).toThrow(expectedError);
});

test('should throw an error if Saturday hours are negative', () => {
    const expectedError = 'WorkSchedule validation: Saturday hours must be in range of 0-8';
    expect(createWorkSchedule({ saturdayHours: -1 })).toThrow(expectedError);
});

test('should throw an error if Saturday hours exceed 8', () => {
    const expectedError = 'WorkSchedule validation: Saturday hours must be in range of 0-8';
    expect(createWorkSchedule({ saturdayHours: 9 })).toThrow(expectedError);
});

test('should throw an error if Sunday hours are negative', () => {
    const expectedError = 'WorkSchedule validation: Sunday hours must be in range of 0-8';
    expect(createWorkSchedule({ sundayHours: -1 })).toThrow(expectedError);
});

test('should throw an error if Sunday hours exceed 8', () => {
    const expectedError = 'WorkSchedule validation: Sunday hours must be in range of 0-8';
    expect(createWorkSchedule({ sundayHours: 9 })).toThrow(expectedError);
});

test('should throw an error if total hours exceed 40', () => {
    const expectedError =
        'WorkSchedule validation: Total work hours cannot exceed 40 hours per week';
    expect(
        createWorkSchedule({
            mondayHours: 8,
            tuesdayHours: 8,
            wednesdayHours: 8,
            thursdayHours: 8,
            fridayHours: 8,
            saturdayHours: 2,
        }),
    ).toThrow(expectedError);
});

test('should not throw an error for valid work schedule', () => {
    expect(createWorkSchedule({})).not.toThrow();
});

test('should create a WorkSchedule instance with valid inputs', () => {
    const workSchedule = new WorkSchedule({
        mondayHours: 8,
        tuesdayHours: 7,
        wednesdayHours: 6,
        thursdayHours: 5,
        fridayHours: 4,
        saturdayHours: 3,
        sundayHours: 2,
        user: user,
    });

    expect(workSchedule.getMondayHours()).toBe(8);
    expect(workSchedule.getTuesdayHours()).toBe(7);
    expect(workSchedule.getWednesdayHours()).toBe(6);
    expect(workSchedule.getThursdayHours()).toBe(5);
    expect(workSchedule.getFridayHours()).toBe(4);
    expect(workSchedule.getSaturdayHours()).toBe(3);
    expect(workSchedule.getSundayHours()).toBe(2);
    expect(workSchedule.getUser()).toBe(user);
});

test('should throw an error if total hours exceed 40', () => {
    const createWorkSchedule = () =>
        new WorkSchedule({
            mondayHours: 8,
            tuesdayHours: 8,
            wednesdayHours: 8,
            thursdayHours: 8,
            fridayHours: 8,
            saturdayHours: 2,
            sundayHours: 1,
            user: user,
        });

    const expectedError =
        'WorkSchedule validation: Total work hours cannot exceed 40 hours per week';

    expect(createWorkSchedule).toThrow(expectedError);
});

test('should throw an error if a day has invalid hours (e.g., <0 or >8)', () => {
    const createInvalidWorkSchedule = () =>
        new WorkSchedule({
            mondayHours: -1,
            tuesdayHours: 8,
            wednesdayHours: 8,
            thursdayHours: 8,
            fridayHours: 8,
            saturdayHours: 8,
            sundayHours: 8,
            user: user,
        });

    const expectedError = 'WorkSchedule validation: Monday hours must be in range of 0-8';
    expect(createInvalidWorkSchedule).toThrow(expectedError);
});

test('should return true for equal WorkSchedule instances', () => {
    const workSchedule1 = new WorkSchedule({
        mondayHours: 8,
        tuesdayHours: 7,
        wednesdayHours: 6,
        thursdayHours: 5,
        fridayHours: 4,
        saturdayHours: 3,
        sundayHours: 2,
        user: user,
    });

    const workSchedule2 = new WorkSchedule({
        mondayHours: 8,
        tuesdayHours: 7,
        wednesdayHours: 6,
        thursdayHours: 5,
        fridayHours: 4,
        saturdayHours: 3,
        sundayHours: 2,
        user: user,
    });

    expect(workSchedule1.equals(workSchedule2)).toBe(true);
});

test('should return false for WorkSchedule instances with different hours', () => {
    const workSchedule1 = new WorkSchedule({
        mondayHours: 8,
        tuesdayHours: 7,
        wednesdayHours: 6,
        thursdayHours: 5,
        fridayHours: 4,
        saturdayHours: 3,
        sundayHours: 2,
        user: user,
    });

    const workSchedule2 = new WorkSchedule({
        mondayHours: 7,
        tuesdayHours: 7,
        wednesdayHours: 6,
        thursdayHours: 5,
        fridayHours: 4,
        saturdayHours: 3,
        sundayHours: 2,
        user: user,
    });

    expect(workSchedule1.equals(workSchedule2)).toBe(false);
});

test('should return false for WorkSchedule instances with different users', () => {
    const differentUser = new User({
        id: 2,
        userName: 'differentUser',
        firstName: 'Different',
        lastName: 'User',
        email: 'different.user@example.com',
        passWord: 'Password456!',
        role: 'user',
    });

    const workSchedule1 = new WorkSchedule({
        mondayHours: 8,
        tuesdayHours: 7,
        wednesdayHours: 6,
        thursdayHours: 5,
        fridayHours: 4,
        saturdayHours: 3,
        sundayHours: 2,
        user: user,
    });

    const workSchedule2 = new WorkSchedule({
        mondayHours: 8,
        tuesdayHours: 7,
        wednesdayHours: 6,
        thursdayHours: 5,
        fridayHours: 4,
        saturdayHours: 3,
        sundayHours: 2,
        user: differentUser,
    });

    expect(workSchedule1.equals(workSchedule2)).toBe(false);
});
