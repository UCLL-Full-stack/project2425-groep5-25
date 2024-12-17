import { PrismaClient } from '@prisma/client';
import { User } from '../../model/user';
import { Role } from '../../types';
//Constructor Test
test('Constructor tests with getters', () => {
    //Given
    const user2 = new User({
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });

    //when
    const password = user2.getPassWord();
    console.log(password);
    // Then
    expect(user2.getUserName()).toBe('yasirrandom');
    expect(user2.getFirstName()).toBe('Yasir');
    expect(user2.getLastName()).toBe('Bazzzinga');
    expect(user2.getEmail()).toBe('hozan.yasir@example.com');
    expect(user2.getPassWord()).toBe('Password123!');
    expect(user2.getRole()).toBe('user');
});

//Equals Test Checks if 2 object point same place in memory not field check
test('should give true if instance of 2 objects are same', function () {
    // Given
    const user1 = new User({
        userName: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    //When

    const user2 = user1;
    //Then nodoby reads commented lines anyways i might as well say that im braindead -y
    expect(user1.equals(user2)).toBe(true);
});

test('should give true if properties of 2 objects are same', function () {
    //Given
    const user1 = new User({
        userName: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    const user2 = new User({
        userName: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    //Then
    expect(user1.equals(user2)).toBe(true);
});
test('should give false if properties of 2 objects are not same', function () {
    //Given
    const user1 = new User({
        userName: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    const user2 = new User({
        userName: 'yasirrandom',
        firstName: 'Yasir',
        lastName: 'Bazzzinga',
        email: 'hozan.yasir@example.com',
        passWord: 'Password123!',
        role: 'user' as Role,
    });
    //Then
    expect(user1.equals(user2)).toBe(false);
});

//Validation Tests

//Username Field
test('should throw an error if username is not given', function () {
    // Given
    const invalidUserData = {
        userName: '  ',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Passw0rd!',
        role: 'admin' as Role,
    };

    // When
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: Username is required';

    // Then
    expect(createUser).toThrow(expectedError);
});
test('should throw an error if username is less than 6 characters', function () {
    // Given
    const invalidUserData = {
        userName: 'user',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Passw0rd!',
        role: 'admin' as Role,
    };

    // When/Then
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: Username must be at least 6 characters long';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('should throw an error if username contains anything beside letters,numbers and underscores', function () {
    // Given
    const invalidUserData = {
        userName: 'user11!',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Passw0rd!',
        role: 'admin' as Role,
    };

    // When
    const createUser = () => new User(invalidUserData);
    const expectedError =
        'User validation: Username can only contain letters, numbers, and underscores';

    // Then
    expect(createUser).toThrow(expectedError);
});

//First Name Field
test('should throw an error if firstname is not given', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: '  ',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Passw0rd!',
        role: 'admin' as Role,
    };

    // When
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: First name is required';

    // Then
    expect(createUser).toThrow(expectedError);
});
test('should throw an error if firstname is less than 2 letters', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'A',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Passw0rd!',
        role: 'admin' as Role,
    };

    // When
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: First name needs to be at least 2 letters';

    // Then
    expect(createUser).toThrow(expectedError);
});
test('should throw an error if firstname does not start with capital letter', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'john',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Passw0rd!',
        role: 'admin' as Role,
    };

    // When/Then
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: First name needs to start with a capital letter';

    // Assert
    expect(createUser).toThrow(expectedError);
});
test('should throw an error if firstname includes any other characters', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John@@',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Passw0rd!',
        role: 'admin' as Role,
    };

    // When/Then
    const createUser = () => new User(invalidUserData);
    const expectedError =
        'User validation: First name can only contain letters (including accented characters)';

    // Assert
    expect(createUser).toThrow(expectedError);
});

//Last Name field
test('should throw an error if lastname is not given', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John',
        lastName: '  ',
        email: 'john.doe@example.com',
        passWord: 'Passw0rd!',
        role: 'admin' as Role,
    };

    // When/Then
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: Last name is required';

    // Assert
    expect(createUser).toThrow(expectedError);
});
test('should throw an error if lastname is less than 2 letters', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John',
        lastName: 'A',
        email: 'john.doe@example.com',
        passWord: 'Passw0rd!',
        role: 'admin' as Role,
    };

    // When/Then
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: Last name needs to be at least 2 letters';

    // Assert
    expect(createUser).toThrow(expectedError);
});
test('should throw an error if lastname does not start with capital letter', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John',
        lastName: 'doe',
        email: 'john.doe@example.com',
        passWord: 'Passw0rd!',
        role: 'admin' as Role,
    };

    // When/Then
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: Last name needs to start with a capital letter';

    // Assert
    expect(createUser).toThrow(expectedError);
});
test('should throw an error if lastname includes any other characters', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John',
        lastName: 'Doe@@',
        email: 'john.doe@example.com',
        passWord: 'Passw0rd!',
        role: 'admin' as Role,
    };

    // When/Then
    const createUser = () => new User(invalidUserData);
    const expectedError =
        'User validation: Last name can only contain letters (including accented characters)';

    // Assert
    expect(createUser).toThrow(expectedError);
});

//Email field

test('should throw an error if email is not given', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John',
        lastName: 'Doe',
        email: '  ',
        passWord: 'Passw0rd!',
        role: 'admin' as Role,
    };

    // When
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: Email is required';

    // Then
    expect(createUser).toThrow(expectedError);
});
test('should throw an error if email does not include @ symbol', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doeexample.com',
        passWord: 'Passw0rd!',
        role: 'admin' as Role,
    };

    // When
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: Email must contain "@" symbol';

    // Then
    expect(createUser).toThrow(expectedError);
});
test('should throw an error if email format is not correct', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe @example.',
        passWord: 'Passw0rd!',
        role: 'admin' as Role,
    };

    // When
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: Email format is invalid';

    // Then
    expect(createUser).toThrow(expectedError);
});

//Password Field

test('should throw an error if password is not given', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: '  ',
        role: 'admin' as Role,
    };

    // When
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: Password is required';

    // Then
    expect(createUser).toThrow(expectedError);
});
test('should throw an error if password is less than 6 characters', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Pas0!',
        role: 'admin' as Role,
    };

    // When
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: Password must be at least 6 characters long';

    // Then
    expect(createUser).toThrow(expectedError);
});

test('should throw an error if password does not contain at least 1 capital letter', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'passw0rd!',
        role: 'admin' as Role,
    };

    // When
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: Password must contain at least one uppercase letter';

    // Then
    expect(createUser).toThrow(expectedError);
});
test('should throw an error if password does not contain at least 1 small letter', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'PASSW0RD!',
        role: 'admin' as Role,
    };

    // When
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: Password must contain at least one lowercase letter';

    // Then
    expect(createUser).toThrow(expectedError);
});
test('should throw an error if password does not contain at least 1 number', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Password!',
        role: 'admin' as Role,
    };

    // When
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: Password must contain at least one number';

    // Then
    expect(createUser).toThrow(expectedError);
});
test('should throw an error if password does not contain at least 1 special character', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Passw0rd',
        role: 'admin' as Role,
    };

    // When
    const createUser = () => new User(invalidUserData);
    const expectedError =
        'User validation: Password must contain at least one special character (@, $, !, %, *, ?, & or #)';

    // Then
    expect(createUser).toThrow(expectedError);
});

//Role Field
test('should throw an error if role does not exist', function () {
    // Given
    const invalidUserData = {
        userName: 'user111',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        passWord: 'Passw0rd!',
        role: '' as Role,
    };

    // When
    const createUser = () => new User(invalidUserData);
    const expectedError = 'User validation: Role is required';

    // Then
    expect(createUser).toThrow(expectedError);
});

//From method tests

jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                user: {
                    findUnique: jest.fn().mockResolvedValue({
                        id: 1,
                        userName: 'fromMethodValidationUser',
                        firstName: 'Roel',
                        lastName: 'Crabbe',
                        email: 'roel.crabbe@example.com',
                        passWord: 'Password1@',
                        role: 'ADMIN',
                        createdDate: new Date('2024-01-01'),
                        updatedDate: new Date('2024-06-01'),
                    }),
                },
            };
        }),
    };
});

const prisma = new PrismaClient();

test('should correctly map PrismaUser to User object', async () => {
    const prismaUser = await prisma.user.findUnique({ where: { id: 1 } });
    const user = User.from(prismaUser as any);

    expect(user.getId()).toBe(1);
    expect(user.getUserName()).toBe('fromMethodValidationUser');
    expect(user.getFirstName()).toBe('Roel');
    expect(user.getLastName()).toBe('Crabbe');
    expect(user.getEmail()).toBe('roel.crabbe@example.com');
    expect(user.getPassWord()).toBe('Password1@');
    expect(user.getRole()).toBe('ADMIN');
});

//Security ? Modified code not completely mine

test('should throw an error for SQL injection-like input', () => {
    const maliciousInput = "admin'; DROP TABLE users;--";
    expect(() => {
        new User({
            userName: maliciousInput,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            passWord: 'Password1@',
            role: 'admin' as Role,
        });
    }).toThrow('User validation: Username can only contain letters, numbers, and underscores');
});

test('should throw an error for XSS injection attempts', () => {
    const xssInput = '<script>alert("XSS")</script>';
    expect(() => {
        new User({
            userName: xssInput,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            passWord: 'Password1@',
            role: 'user' as Role,
        });
    }).toThrow('User validation: Username can only contain letters, numbers, and underscores');
});
