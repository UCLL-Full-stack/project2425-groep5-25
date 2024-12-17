import { Project } from '../../model/project';
import { User } from '../../model/user';
import { Color, Role } from '../../types';

const pName1 = 'General';
const pColor1 = Color.Gray;

const cUser1 = new User({
    id: 1,
    userName: 'Yasir_DaBoss',
    firstName: 'Yasir',
    lastName: 'Hozan',
    email: 'yasir.hozan@example.com',
    passWord: '@Password123!',
    role: 'user' as Role,
});

const cUser2 = new User({
    id: 2,
    userName: 'Roel_DaBoss',
    firstName: 'Roel',
    lastName: 'Crabbé',
    email: 'roel.crabbe@example.com',
    passWord: '@Password123!',
    role: 'admin' as Role,
});

const cInvalidUser1 = new User({
    userName: 'Yasir_DaBoss',
    firstName: 'Yasir',
    lastName: 'Hozan',
    email: 'yasir.hozan@example.com',
    passWord: '@Password123!',
    role: 'hr' as Role,
});

test('Testing the getter methods 1', () => {
    // When
    const cProject1 = new Project({
        name: pName1,
        color: pColor1,
        users: [cUser1],
    });

    // Then
    expect(cProject1.getName()).toEqual(pName1);
    expect(cProject1.getColor()).toEqual(pColor1);
    expect(cProject1.getUsers()).toContain(cUser1);
});

test('Testing the getter methods 2', () => {
    // When
    const cProject1 = new Project({
        name: pName1,
        color: pColor1,
        users: [cUser1, cUser2],
    });

    // Then
    expect(cProject1.getName()).toEqual(pName1);
    expect(cProject1.getColor()).toEqual(pColor1);
    expect(cProject1.getUsers()).toEqual([cUser1, cUser2]);
});

test('Testing the equals method (passed)', () => {
    // When
    const cProject1 = new Project({
        name: pName1,
        color: pColor1,
        users: [cUser1],
    });
    const cProject2 = new Project({
        name: pName1,
        color: pColor1,
        users: [cUser1],
    });

    //  Then
    expect(cProject1.equals(cProject2)).toBe(true);
});

test('Testing the equals method (failed)', () => {
    // When
    const cProject1 = new Project({
        name: pName1,
        color: pColor1,
        users: [cUser1],
    });
    const cProject2 = new Project({
        name: pName1,
        color: pColor1,
        users: [cUser2, cUser1],
    });

    // Then
    expect(cProject1.equals(cProject2)).toBe(false);
});

test('Expect to throw an error if Project name is not given', () => {
    // When
    const createProject = () =>
        new Project({
            name: '',
            color: pColor1,
            users: [cUser1],
        });
    const expectedError = 'Project validation: Project name is required';

    // Then
    expect(createProject).toThrow(expectedError);
});

test('Expect to throw an error if Project name is too short', () => {
    // When
    const createProject = () =>
        new Project({
            name: 'Test',
            color: pColor1,
            users: [cUser1],
        });
    const expectedError = 'Project validation: Project name must be at least 6 characters long';

    // Then
    expect(createProject).toThrow(expectedError);
});

test('Expect to throw an error if Project name is too long', () => {
    // When
    const createProject = () =>
        new Project({
            name: 'Testing this super long name of a project',
            color: pColor1,
            users: [cUser1],
        });
    const expectedError = 'Project validation: Project name cannot be longer than 30 characters';

    // Then
    expect(createProject).toThrow(expectedError);
});

test('Expect to throw an error if Project name is not valid', () => {
    // When
    const createProject = () =>
        new Project({
            name: '@Test69420',
            color: pColor1,
            users: [cUser1],
        });
    const expectedError =
        'Project validation: Project name can only contain letters, numbers, and spaces';

    // Then
    expect(createProject).toThrow(expectedError);
});

test('Expect to throw an error if Project Color is not given', () => {
    // When
    const createProject = () =>
        new Project({
            name: pName1,
            color: '' as Color,
            users: [cUser1],
        });
    const expectedError = 'Project validation: Project color is required';

    // Then
    expect(createProject).toThrow(expectedError);
});

test('Expect to throw an error if Project Color is not valid', () => {
    // When
    const createProject = () =>
        new Project({
            name: pName1,
            color: '-_-' as Color,
            users: [cUser1],
        });
    const expectedError = 'Project validation: Please select a valid project color.';

    // Then
    expect(createProject).toThrow(expectedError);
});

test('Expect to throw an error if User does not exist', () => {
    // When
    const createProject = () =>
        new Project({
            name: pName1,
            color: pColor1,
            users: [cInvalidUser1],
        });
    const expectedError = `Project validation: User does not exist!`;

    // Then
    expect(createProject).toThrow(expectedError);
});

test('Expect to throw an error if Users contains duplicate', () => {
    // When
    const createProject = () =>
        new Project({
            name: pName1,
            color: pColor1,
            users: [cUser1, cUser1],
        });
    const expectedError = `Project validation: Duplicate user found!`;

    // Then
    expect(createProject).toThrow(expectedError);
});
//DO WE NEED TO HAVE FROM METHOD TESTS ? AND ALSO ASK IF THEY CAN INJECT WITH DATE NOW WITH CONST
