import { Project } from '../../model/project';
import { TimeBlock } from '../../model/timeBlock';
import { User } from '../../model/user';
import { WorkDay } from '../../model/workDay';
import { Color, Role } from '../../types';

const date = new Date('2024-12-01');
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
    date: date,
    user: cUser1,
    timeBlocks: [cTimeBlock1],
});

test('Constructor tests with getters', () => {
    // When
    const eWorkDay1 = new WorkDay({
        expectedHours: 8,
        achievedHours: 8,
        date: date,
        user: cUser1,
        timeBlocks: [cTimeBlock1],
    });

    // Then
    expect(eWorkDay1.getExpectedHours()).toEqual(cWorkDay1.getExpectedHours());
    expect(eWorkDay1.getAchievedHours()).toEqual(cWorkDay1.getAchievedHours());
    expect(eWorkDay1.getDate()).toEqual(cWorkDay1.getDate());
});

test('Testing the equals method (passed)', () => {
    // When
    const eWorkDay1 = new WorkDay({
        expectedHours: 8,
        achievedHours: 8,
        date: date,
        user: cUser1,
        timeBlocks: [cTimeBlock1],
    });

    //Then
    expect(eWorkDay1.equals(cWorkDay1)).toBe(true);
});

test('Testing the equals method (failed)', () => {
    // When
    const eWorkDay1 = new WorkDay({
        expectedHours: 8,
        achievedHours: 0,
        date: date,
        user: cUser1,
        timeBlocks: [],
    });

    //Then
    expect(eWorkDay1.equals(cWorkDay1)).toBe(false);
});

test('Expect to throw an error if  Work Day date is in future', () => {
    // When
    const createWorkDay = () =>
        new WorkDay({
            expectedHours: 8,
            achievedHours: 7,
            date: new Date('2224-12-01'),
            user: cUser1,
            timeBlocks: [cTimeBlock1],
        });
    const expectedError = 'WorkDay validation: Date cannot be in the future';

    // Then
    expect(createWorkDay).toThrow(expectedError);
});

test('Expect to throw an error if Expected hours are negative', () => {
    // When
    const createWorkDay = () =>
        new WorkDay({
            expectedHours: -8,
            achievedHours: 7,
            date: date,
            user: cUser1,
            timeBlocks: [cTimeBlock1],
        });
    const expectedError = 'WorkDay validation: Expected hours must be a non-negative number';

    // Then
    expect(createWorkDay).toThrow(expectedError);
});

test('Expect to throw an error if Project Color is not given', () => {
    // When
    const createWorkDay = () =>
        new WorkDay({
            expectedHours: 8,
            achievedHours: -7,
            date: date,
            user: cUser1,
            timeBlocks: [cTimeBlock1],
        });
    const expectedError = 'WorkDay validation: Achieved hours must be a non-negative number';

    // Then
    expect(createWorkDay).toThrow(expectedError);
});

test('Expect to throw an error if given User is not valid', () => {
    // Given
    const eUser2 = new User({
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });

    // When
    const createWorkDay = () =>
        new WorkDay({
            expectedHours: 8,
            achievedHours: 7,
            date: date,
            user: eUser2,
            timeBlocks: [cTimeBlock1],
        });
    const expectedError = 'WorkDay validation: User must be valid';

    // Then
    expect(createWorkDay).toThrow(expectedError);
});

test('Expect to throw an error if the linked Time Block is not valid', () => {
    // Given
    const eTimeBlock = new TimeBlock({
        startTime: new Date('2024-12-01 08:00:00'),
        endTime: new Date('2024-12-01 10:00:00'),
        project: cProject1,
    });

    // When
    const createWorkDay = () =>
        new WorkDay({
            expectedHours: 8,
            achievedHours: 7,
            date: date,
            user: cUser1,
            timeBlocks: [eTimeBlock],
        });
    const expectedError = 'WorkDay validation: Time block must be valid';

    // Then
    expect(createWorkDay).toThrow(expectedError);
});
