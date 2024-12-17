import { User } from '../../model/user';
import { Role } from '../../types';

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

test('Testing the getter methods 1', () => {
    //Given
    const eUser1 = new User({
        id: 1,
        userName: 'Yasir_DaBoss',
        firstName: 'Yasir',
        lastName: 'Hozan',
        email: 'yasir.hozan@example.com',
        passWord: '@Password123!',
        role: 'user' as Role,
    });

    // Then
    expect(eUser1.getUserName()).toEqual(cUser1.getUserName());
    expect(eUser1.getFirstName()).toEqual(cUser1.getFirstName());
    expect(eUser1.getLastName()).toEqual(cUser1.getLastName());
    expect(eUser1.getEmail()).toEqual(cUser1.getEmail());
    expect(eUser1.getPassWord()).toEqual(cUser1.getPassWord());
    expect(eUser1.getRole()).toEqual(cUser1.getRole());
});

test('Testing the equals method (passed)', () => {
    //Given
    const eUser1 = new User({
        id: 1,
        userName: 'Yasir_DaBoss',
        firstName: 'Yasir',
        lastName: 'Hozan',
        email: 'yasir.hozan@example.com',
        passWord: '@Password123!',
        role: 'user' as Role,
    });

    // Then nodoby reads commented lines anyways I might as well say that im braindead. - Yasir 2024
    expect(eUser1.equals(cUser1)).toBe(true);
});

test('Testing the equals method (failed)', () => {
    //Then
    expect(cUser1.equals(cUser2)).toBe(false);
});

test('Expect to throw an error if username is not given', () => {
    // When
    const createUser = () =>
        new User({
            id: 1,
            userName: '',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Username is required';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if username is too short', () => {
    // When
    const createUser = () =>
        new User({
            id: 1,
            userName: 'Yas',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Username must be at least 6 characters long';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if UserName is too long', () => {
    // When
    const createUser = () =>
        new User({
            id: 1,
            userName: 'Yasir_Was_Here_Before_69',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Username cannot be longer than 15 characters';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if UserName contains invalid characters', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'user11!',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError =
        'User validation: Username can only contain letters, numbers, and underscores';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if FirstName is empty', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: '',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: First name is required';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if FirstName is too short', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Y',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: First name needs to be at least 2 letters';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if FirstName is too long', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yyyaaaaaaaaaaassssiiiiiiiiiiiiirrrrrrrrrr',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: First name cannot be longer than 20 characters';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if FirstName does not start with a capital letter', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'yasir',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: First name needs to start with a capital letter';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if FirstName contains invalid characters', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir!',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError =
        'User validation: First name can only contain letters (including accented characters)';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if LastName is not given', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: '',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Last name is required';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if LastName is too short', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'H',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Last name needs to be at least 2 letters';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if LastName is too long', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'Hhhhoooooooozzzzzzzzzaaaaaaannnnnnnn',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Last name cannot be longer than 20 characters';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if LastName does not start with capital letter', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'hozan',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Last name needs to start with a capital letter';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if LastName contains invalid characters', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'Hozan@69',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError =
        'User validation: Last name can only contain letters (including accented characters)';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if FirstName is empty', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: '',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Email is required';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if email does not include @ symbol', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: 'yasir.hozan|example.com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Email must contain "@" symbol';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if email format is not correct', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: 'yasir .hozan@example com',
            passWord: '@Password123!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Email format is invalid';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if PassWord is empty', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: '',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Password is required';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if PassWord is too short', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: 'Yasir',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Password must be at least 6 characters long';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if PassWord is too long', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: 'YasirsPasswordIsWayTooLongAndHeNeedsToUpdateIt',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Password cannot be longer than 30 characters';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if password does not contain at least 1 capital letter', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: 'passw0rd!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Password must contain at least one uppercase letter';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if password does not contain at least 1 small letter', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: 'PASSW0RD!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Password must contain at least one lowercase letter';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if password does not contain at least 1 number', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: 'Password!',
            role: 'user' as Role,
        });
    const expectedError = 'User validation: Password must contain at least one number';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if password does not contain at least 1 special character', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: 'P8ssword',
            role: 'user' as Role,
        });
    const expectedError =
        'User validation: Password must contain at least one special character (@, $, !, %, *, ?, & or #)';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('Expect to throw an error if role does not exist', () => {
    // When
    const createUser = () =>
        new User({
            userName: 'Yasir_DaBoss',
            firstName: 'Yasir',
            lastName: 'Hozan',
            email: 'yasir.hozan@example.com',
            passWord: '@Password123!',
            role: '' as Role,
        });
    const expectedError = 'User validation: Role is required';

    // Then
    expect(createUser).toThrow(expectedError);
});
