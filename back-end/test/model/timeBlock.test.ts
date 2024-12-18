import { expect, test } from '@jest/globals';
import { Project } from '../../model/project';
import { TimeBlock } from '../../model/timeBlock';
import { User } from '../../model/user';
import { Color, Role } from '../../types';

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

const startTime = new Date('2024-12-01 08:00:00');
const endTime = new Date('2024-12-01 10:00:00');
const badEndTime = new Date(startTime.getTime() - 1000);

const cTimeBlock1 = new TimeBlock({
    startTime,
    endTime,
    project: cProject1,
});
const cTimeBlock2 = new TimeBlock({
    startTime,
    endTime: undefined,
    project: cProject1,
});

test('Expect constructor to work with getters', () => {
    // When
    const eTimeBlock = new TimeBlock({
        startTime,
        endTime,
        project: cProject1,
    });

    // Then
    expect(eTimeBlock.getStartTime()).toEqual(cTimeBlock1.getStartTime());
    expect(eTimeBlock.getEndTime()).toEqual(cTimeBlock1.getEndTime());
    expect(eTimeBlock.getProject()).toEqual(cTimeBlock1.getProject());
});

test('Testing the equals method (passed)', () => {
    // When
    const eTimeBlock = new TimeBlock({
        startTime,
        endTime,
        project: cProject1,
    });

    //Then
    expect(eTimeBlock.equals(cTimeBlock1)).toBe(true);
});

test('Testing the equals method (failed)', () => {
    //Then
    expect(cTimeBlock1.equals(cTimeBlock2)).toBe(false);
});

test('should not throw an error if Time Block does contain everything', function () {
    // When
    const createTimeBlock = () =>
        new TimeBlock({
            startTime,
            endTime,
            project: cProject1,
        });
    const expectedErrors = [
        'TimeBlock validation: Start time is required',
        'TimeBlock validation: Project is required',
    ];

    // Then
    expectedErrors.forEach((expectedError) => {
        expect(createTimeBlock).not.toContain(expectedError);
    });
});

test('should throw an error if Start time is after the end time', function () {
    // When
    const createTimeBlock = () =>
        new TimeBlock({
            startTime,
            endTime: badEndTime,
            project: cProject1,
        });
    const expectedError = 'TimeBlock validation: Start date cannot be after end date';

    // Then
    expect(createTimeBlock).toThrow(expectedError);
});
