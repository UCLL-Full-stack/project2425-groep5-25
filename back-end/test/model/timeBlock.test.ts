import { PrismaClient } from '@prisma/client';
import { Project } from '../../model/project';
import { TimeBlock } from '../../model/timeBlock';
import { User } from '../../model/user';
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

    //when
    const startTime = new Date('2024-12-01 08:00:00');
    const endTime = new Date('2024-12-01 10:00:00');

    const timeBlock = new TimeBlock({
        startTime: startTime,
        endTime: endTime,
        project: project1,
    });

    // Then
    expect(timeBlock.getStartTime()).toBe(startTime);
    expect(timeBlock.getEndTime()).toBe(endTime);
    expect(timeBlock.getProject()).toEqual(project1);
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
    const startTime = new Date('2024-12-01 08:00:00');
    const endTime = new Date('2024-12-01 10:00:00');

    //When

    const timeBlock1 = new TimeBlock({
        startTime: startTime,
        endTime: endTime,
        project: project1,
    });

    const timeBlock2 = timeBlock1;
    //Then
    expect(timeBlock1.equals(timeBlock2)).toBe(true);
});

test('should give true if properties of 2 objects are same', function () {
    //Given
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
    const startTime = new Date('2024-12-01 08:00:00');
    const endTime = new Date('2024-12-01 10:00:00');

    //When
    const timeBlock1 = new TimeBlock({
        startTime: startTime,
        endTime: endTime,
        project: project1,
    });
    const timeBlock2 = new TimeBlock({
        startTime: startTime,
        endTime: endTime,
        project: project1,
    });

    //Then
    expect(timeBlock1.equals(timeBlock2)).toBe(true);
});
test('should give false if properties of 2 objects are not same', function () {
    //Given
    const user2 = new User({
        id: 1,
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    const startTime = new Date('2024-12-01 08:00:00');
    const endTime = new Date('2024-12-01 10:00:00');
    const project1 = new Project({
        name: 'totallynotthesameprojectnameandiknowthisstringishardtoread',
        color: Color.Gray,
        users: [user2],
    });
    //When
    const timeBlock1 = new TimeBlock({
        startTime: startTime,
        endTime: endTime,
        project: project1,
    });
    const timeBlock2 = new TimeBlock({
        startTime: startTime,
        project: project1,
    });

    //Then
    expect(timeBlock1.equals(timeBlock2)).toBe(false);
});

//Validation Tests

//timeBlock Start and End time Field
// test('should throw an error if Start Time is not given for a timeBlock object', function () {
//     Given
//     const user2 = new User({
//         id: 1,
//         userName: 'yasirrandom',
//         firstName: 'Yasir',
//         lastName: 'Bazzzinga',
//         email: 'hozan.yasir@example.com',
//         passWord: 'Password123!',
//         role: 'user' as Role,
//     });

//     const startTime = undefined;
//     const project1 = new Project({
//         name: 'totallynotthesameprojectnameandiknowthisstringishardtoread',
//         color: Color.Gray,
//         users: [user2],
//     });

//     When
//     const createTimeBlock = () => new TimeBlock({ startTime: startTime, project: project1 });
//     const expectedError = 'TimeBlock validation: Start time is required';

//     Then
//     expect(createTimeBlock).toThrow(expectedError);
// });
test('should not throw an error if Time Block does contain everything', function () {
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
    const startTime = new Date('2024-12-01 08:00:00');
    const endTime = new Date('2024-12-01 10:00:00');
    const project1 = new Project({
        name: 'totallynotthesameprojectnameandiknowthisstringishardtoread',
        color: Color.Gray,
        users: [user2],
    });

    // When
    const createTimeBlock = () =>
        new TimeBlock({
            startTime,
            endTime,
            project: project1,
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
    const startTime = new Date('2024-12-13 12:36:00');
    const endTime = new Date('2024-12-13 10:43:00');
    const project1 = new Project({
        name: 'totallynotthesameprojectnameandiknowthisstringishardtoread',
        color: Color.Gray,
        users: [user2],
    });
    // When
    const createTimeBlock = () =>
        new TimeBlock({
            startTime,
            endTime,
            project: project1,
        });
    const expectedError = 'TimeBlock validation: Start date cannot be after end date';

    // Then
    expect(createTimeBlock).toThrow(expectedError);
});

//From method tests
//Given
jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                timeBlock: {
                    findUnique: jest.fn().mockResolvedValue({
                        id: 1,
                        startTime: startTime,
                        endTime: endTime,
                        project: project1,
                        createdDate: new Date('2024-12-13'),
                        updatedDate: new Date('2024-12-14'),
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
const startTime = new Date('2024-12-13 10:43:00 ');
const endTime = new Date('2024-12-13 12:36:00');
const project1 = new Project({
    name: 'totallynotthesameprojectnameandiknowthisstringishardtoread',
    color: Color.Gray,
    users: [user2],
});
const prisma = new PrismaClient();
//When
test('should correctly map PrismaUser to Project object', async () => {
    const prismaProject = await prisma.timeBlock.findUnique({ where: { id: 1 } });
    const domainTimeBlockObject = TimeBlock.from(prismaProject as any);
    //Then
    expect(domainTimeBlockObject.getId()).toBe(1);
    expect(domainTimeBlockObject.getStartTime()).toBe(startTime);
    expect(domainTimeBlockObject.getEndTime()).toBe(endTime);
    expect(domainTimeBlockObject.getProject()).toEqual(project1);
});

// //Security ? Modified code not completely mine
// //Given actually we have a vulnerability Roel help
// test('should throw an error for SQL injection-like input', () => {
//     const maliciousInput = "admin'; DROP TABLE users;--";
//     const user2 = new User({
//         id: 1,
//         userName: 'yasirrandom',
//         firstName: 'Yasir',
//         lastName: 'Bazzzinga',
//         email: 'hozan.yasir@example.com',
//         passWord: 'Password123!',
//         role: 'user' as Role,
//     });
//     const startTime = new Date(maliciousInput);
//     const endTime = new Date('2024-12-13 12:36:00');
//     const project1 = new Project({
//         name: 'totallynotthesameprojectnameandiknowthisstringishardtoread',
//         color: Color.Gray,
//         users: [user2],
//     });

//     //When

//     //Then
//     expect(() => {
//         new TimeBlock({
//             startTime,
//             endTime,
//             project: project1,
//         });
//     }).toThrow('TimeBlock validation: Start time can be only date ');
// });
// //Given
// test('should throw an error for XSS injection attempts', () => {
//     const xssInput = '<script>alert("XSS")</script>';
//     const user2 = new User({
//         id: 1,
//         userName: 'yasirrandom',
//         firstName: 'Yasir',
//         lastName: 'Bazzzinga',
//         email: 'hozan.yasir@example.com',
//         passWord: 'Password123!',
//         role: 'user' as Role,
//     });
//     const startTime = new Date(xssInput);
//     const endTime = new Date('2024-12-13 12:36:00');
//     const project1 = new Project({
//         name: 'totallynotthesameprojectnameandiknowthisstringishardtoread',
//         color: Color.Gray,
//         users: [user2],
//     });

//     //When

//     //Then
//     expect(() => {
//         new TimeBlock({
//             startTime,
//             endTime,
//             project: project1,
//         });
//     }).toThrow('TimeBlock validation: Start time can be only date ');
// });
