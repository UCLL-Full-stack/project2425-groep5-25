import { PrismaClient } from '@prisma/client';
import { Project } from '../../model/project';
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

    //when
    const project1 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [user2],
    });

    // Then
    expect(project1.getName()).toBe('test123');
    expect(project1.getColor()).toBe(Color.Gray);
    expect(project1.getUsers()).toEqual([user2]);
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

    //When
    const project1 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [user2],
    });

    const project2 = project1;
    //Then
    expect(project1.equals(project2)).toBe(true);
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
    //When
    const project1 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [user2],
    });
    const project2 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [user2],
    });

    //Then
    expect(project1.equals(project2)).toBe(true);
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
    //When
    const project1 = new Project({
        name: 'totallynotthesameprojectnameandiknowthisstringishardtoread',
        color: Color.Gray,
        users: [user2],
    });
    const project2 = new Project({
        name: 'test123',
        color: Color.Gray,
        users: [user2],
    });

    //Then
    expect(project1.equals(project2)).toBe(false);
});

//Validation Tests

//Project Name Field
test('should throw an error if Project name is not given', function () {
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

    // When
    const createProject = () =>
        new Project({
            name: '',
            color: Color.Gray,
            users: [user2],
        });
    const expectedError = 'Project validation: Project name is required';

    // Then
    expect(createProject).toThrow(expectedError);
});
test('should throw an error if Project name is less than 6 characters', function () {
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

    // When
    const createProject = () =>
        new Project({
            name: 'Test1',
            color: Color.Gray,
            users: [user2],
        });
    const expectedError = 'Project validation: Project name must be at least 6 characters long';

    // Then
    expect(createProject).toThrow(expectedError);
});

test('should throw an error if Project name contains anything beside letters,numbers and spaces', function () {
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

    // When
    const createProject = () =>
        new Project({
            name: 'Test1@@@@',
            color: Color.Gray,
            users: [user2],
        });
    const expectedError =
        'Project validation: Project name can only contain letters, numbers, and spaces';

    // Then
    expect(createProject).toThrow(expectedError);
});

//Color Field
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

    // When
    const createProject = () =>
        new Project({
            name: 'Test111',
            color: '' as Color,
            users: [user2],
        });
    const expectedError = 'Project validation: Project color is required';

    // Then
    expect(createProject).toThrow(expectedError);
});
test('should throw an error if Project Color is not valid', function () {
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

    // When
    const createProject = () =>
        new Project({
            name: 'Test111',
            color: 'NotValidColor' as Color,
            users: [user2],
        });
    const expectedError = 'Project validation: Please select a valid project color.';

    // Then
    expect(createProject).toThrow(expectedError);
});
//User Field
test('should throw an error if linked user(s) with project can not be found with given user ID', function () {
    // Given
    const user2 = new User({
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });

    // When
    const createProject = () =>
        new Project({
            name: 'Test111',
            color: Color.Gray,
            users: [user2],
        });
    const expectedError = `Project validation: User with ID ${user2.getId()} does not exist`;

    // Then
    expect(createProject).toThrow(expectedError);
});

//From method tests

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                project: {
                    findUnique: jest.fn().mockResolvedValue({
                        id: 1,
                        name: 'Test111',
                        color: Color.Gray,
                        users: [user2],
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
const prisma = new PrismaClient();

test('should correctly map PrismaUser to Project object', async () => {
    const prismaProject = await prisma.project.findUnique({ where: { id: 1 } });
    const domainProjectObject = Project.from(prismaProject as any);

    expect(domainProjectObject.getId()).toBe(1);
    expect(domainProjectObject.getName()).toBe('Test111');
    expect(domainProjectObject.getColor()).toBe(Color.Gray);
    expect(domainProjectObject.getUsers()).toEqual([user2]);
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
