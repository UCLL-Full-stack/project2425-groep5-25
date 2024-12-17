import { PrismaClient } from '@prisma/client';
import { Project } from '../../model/project';
import { TimeBlock } from '../../model/timeBlock';
import { User } from '../../model/user';
import { WorkDay } from '../../model/workDay';
import { Color, Role } from '../../types';
//Constructor Test
test('Constructor tests with getters', () => {
    //Given
    //no need for real db object since we re testing whether constructor of project model works or not therefore using create user or db for already existing ones would be overkill at its best .
    const user2 = new User({
        id: 1,
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    const project1 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [user2],
    });

    const timeBlock = new TimeBlock({
        id: 1,
        startTime: new Date('2024-12-01 08:00:00'),
        endTime: new Date('2024-12-01 10:00:00'),
        project: project1,
    });

    //when
    const workDay = new WorkDay({
        expectedHours: 8,
        achievedHours: 8,
        date: new Date('2024-12-01'),
        user: user2,
        timeBlocks: [timeBlock],
    });

    // Then
    expect(workDay.getExpectedHours()).toBe(8);
    expect(workDay.getAchievedHours()).toBe(8);
    expect(workDay.getDate()).toEqual(new Date('2024-12-01'));
});

//Equals Test Checks if 2 object point same place in memory not field check
test('should give true if instance of 2 objects are same', function () {
    // Given
    const user2 = new User({
        id: 1,
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    const project1 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [user2],
    });

    const timeBlock = new TimeBlock({
        id: 1,
        startTime: new Date('2024-12-01 08:00:00'),
        endTime: new Date('2024-12-01 10:00:00'),
        project: project1,
    });

    //When
    const workDay1 = new WorkDay({
        expectedHours: 8,
        achievedHours: 8,
        date: new Date('2024-12-01'),
        user: user2,
        timeBlocks: [timeBlock],
    });

    const workDay2 = workDay1;
    //Then
    expect(workDay1.equals(workDay2)).toBe(true);
});

test('should give true if properties of 2 objects are same', function () {
    // Given
    const user2 = new User({
        id: 1,
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    const project1 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [user2],
    });

    const timeBlock = new TimeBlock({
        id: 1,
        startTime: new Date('2024-12-01 08:00:00'),
        endTime: new Date('2024-12-01 10:00:00'),
        project: project1,
    });
    const date = new Date('2024-12-01');

    //When
    const workDay1 = new WorkDay({
        expectedHours: 8,
        achievedHours: 8,
        date: date,
        user: user2,
        timeBlocks: [timeBlock],
    });

    const workDay2 = new WorkDay({
        expectedHours: 8,
        achievedHours: 8,
        date: date,
        user: user2,
        timeBlocks: [timeBlock],
    });
    //Then
    expect(workDay1.equals(workDay2)).toBe(true);
});
test('should give false if properties of 2 objects are not same', function () {
    // Given
    const user2 = new User({
        id: 1,
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    const project1 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [user2],
    });

    const timeBlock = new TimeBlock({
        id: 1,
        startTime: new Date('2024-12-01 08:00:00'),
        endTime: new Date('2024-12-01 10:00:00'),
        project: project1,
    });
    const date = new Date('2024-12-01');

    //When
    const workDay1 = new WorkDay({
        expectedHours: 8,
        achievedHours: 8,
        date: date,
        user: user2,
        timeBlocks: [timeBlock],
    });

    const workDay2 = new WorkDay({
        expectedHours: 8,
        achievedHours: 7,
        date: date,
        user: user2,
        timeBlocks: [timeBlock],
    });
    //Then
    expect(workDay1.equals(workDay2)).toBe(false);
});

//Validation Tests

//Work Day Fields
test('should not throw an error if all the fields are valid', function () {
    // Given
    const user2 = new User({
        id: 1,
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    const project1 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [user2],
    });

    const timeBlock = new TimeBlock({
        id: 1,
        startTime: new Date('2024-12-01 08:00:00'),
        endTime: new Date('2024-12-01 10:00:00'),
        project: project1,
    });
    const date = new Date('2024-12-01');

    // When
    const createWorkDay = () =>
        new WorkDay({
            expectedHours: 8,
            achievedHours: 7,
            date: date,
            user: user2,
            timeBlocks: [timeBlock],
        });
    const expectedError = 'WorkDay validation: Error';

    // Then
    expect(createWorkDay).not.toThrow(expectedError);
});
//Date Field
test('should throw an error if  Work Day date is in future', function () {
    // Given
    const user2 = new User({
        id: 1,
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    const project1 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [user2],
    });

    const timeBlock = new TimeBlock({
        id: 1,
        startTime: new Date('2024-12-01 08:00:00'),
        endTime: new Date('2024-12-01 10:00:00'),
        project: project1,
    });
    const date = new Date('2024-12-01');

    // When
    const createWorkDay = () =>
        new WorkDay({
            expectedHours: 8,
            achievedHours: 7,
            date: new Date('2100-12-01'),
            user: user2,
            timeBlocks: [timeBlock],
        });
    const expectedError = 'WorkDay validation: Date cannot be in the future';

    // Then
    expect(createWorkDay).toThrow(expectedError);
});
//Expected Hours
test('should throw an error if Expected hours are negative', function () {
    // Given
    const user2 = new User({
        id: 1,
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    const project1 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [user2],
    });

    const timeBlock = new TimeBlock({
        id: 1,
        startTime: new Date('2024-12-01 08:00:00'),
        endTime: new Date('2024-12-01 10:00:00'),
        project: project1,
    });
    const date = new Date('2024-12-01');

    // When
    const createWorkDay = () =>
        new WorkDay({
            expectedHours: -8,
            achievedHours: 7,
            date: date,
            user: user2,
            timeBlocks: [timeBlock],
        });
    const expectedError = 'WorkDay validation: Expected hours must be a non-negative number';

    // Then
    expect(createWorkDay).toThrow(expectedError);
});

//Achieved Hours
test('should throw an error if Project Color is not given', function () {
    // Given
    const user2 = new User({
        id: 1,
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    const project1 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [user2],
    });

    const timeBlock = new TimeBlock({
        id: 1,
        startTime: new Date('2024-12-01 08:00:00'),
        endTime: new Date('2024-12-01 10:00:00'),
        project: project1,
    });
    const date = new Date('2024-12-01');

    // When
    const createWorkDay = () =>
        new WorkDay({
            expectedHours: 8,
            achievedHours: -7,
            date: date,
            user: user2,
            timeBlocks: [timeBlock],
        });
    const expectedError = 'WorkDay validation: Achieved hours must be a non-negative number';

    // Then
    expect(createWorkDay).toThrow(expectedError);
});
//User
test('should throw an error if given User is not valid', function () {
    // Given
    const user2 = new User({
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    const project1 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [],
    });

    const timeBlock = new TimeBlock({
        id: 1,
        startTime: new Date('2024-12-01 08:00:00'),
        endTime: new Date('2024-12-01 10:00:00'),
        project: project1,
    });
    const date = new Date('2024-12-01');

    // When
    const createWorkDay = () =>
        new WorkDay({
            expectedHours: 8,
            achievedHours: 7,
            date: date,
            user: user2,
            timeBlocks: [timeBlock],
        });
    const expectedError = 'WorkDay validation: User must be valid';

    // Then
    expect(createWorkDay).toThrow(expectedError);
});
//Time Block
test('should throw an error if the linked Time Block is not valid', function () {
    // Given
    const user2 = new User({
        id: 1,
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    const project1 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [user2],
    });

    const timeBlock = new TimeBlock({
        startTime: new Date('2024-12-01 08:00:00'),
        endTime: new Date('2024-12-01 10:00:00'),
        project: project1,
    });
    const date = new Date('2024-12-01');

    // When
    const createWorkDay = () =>
        new WorkDay({
            expectedHours: 8,
            achievedHours: 7,
            date: date,
            user: user2,
            timeBlocks: [timeBlock],
        });
    const expectedError = 'WorkDay validation: Time block must be valid';

    // Then
    expect(createWorkDay).toThrow(expectedError);
});

//From method tests

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                workday: {
                    findUnique: jest.fn().mockResolvedValue({
                        id: 1,
                        expectedHours: 8,
                        achievedHours: 7,
                        date: date,
                        user: user2,
                        timeBlocks: [timeBlock],
                        createdDate: new Date('2024-01-01'),
                        updatedDate: new Date('2024-06-01'),
                    }),
                },
            };
        }),
    };
});
const user2 = new User({
    id: 1,
    userName: 'yasirrandom',
    firstName: 'Yasir',
    lastName: 'Bazzzinga',
    email: 'hozan.yasir@example.com',
    passWord: 'Password123!',
    role: 'user' as Role,
});
const project1 = new Project({
    name: 'test123',
    color: Color.Gray,
    users: [user2],
});

const timeBlock = new TimeBlock({
    id: 1,
    startTime: new Date('2024-12-01 08:00:00'),
    endTime: new Date('2024-12-01 10:00:00'),
    project: project1,
});
const date = new Date('2024-12-01');
const prisma = new PrismaClient();

test('should correctly map PrismaUser to WorkDay object', async () => {
    const prismaWorkDay = await prisma.workday.findUnique({ where: { id: 1 } });
    const domainWorkDayObject = WorkDay.from(prismaWorkDay as any);

    expect(domainWorkDayObject.getId()).toBe(1);
    expect(domainWorkDayObject.getExpectedHours()).toBe(8);
    expect(domainWorkDayObject.getAchievedHours()).toBe(7);
    expect(domainWorkDayObject.getDate()).toEqual(date);
    expect(domainWorkDayObject.getUser()).toEqual(user2);
    expect(domainWorkDayObject.getTimeBlocks()).toEqual([timeBlock]);
});

//Security ? Modified code not completely mine

test('should throw an error for SQL injection-like input', () => {
    const maliciousInput = "admin'; DROP TABLE users;--";
    const user2 = new User({
        id: 1,
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    expect(() => {
        new Project({
            name: maliciousInput,
            color: Color.Gray,
            users: [user2],
        });
    }).toThrow('Project validation: Project name can only contain letters, numbers, and spaces');
});

test('should throw an error for XSS injection attempts', () => {
    const xssInput = '<script>alert("XSS")</script>';
    const user2 = new User({
        id: 1,
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    expect(() => {
        new Project({
            name: xssInput,
            color: Color.Gray,
            users: [user2],
        });
    }).toThrow('Project validation: Project name can only contain letters, numbers, and spaces');
});
