import { afterEach, beforeEach, expect, jest, test } from '@jest/globals';
import bcrypt from 'bcrypt';
import { User } from '../../model/user';
import { userDb } from '../../repository/user.db';
import { generateJwtToken } from '../../repository/utils/jwt';
import { userService } from '../../service/user.service';
import { IdName, Role, UserInput } from '../../types';

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
const userInput: UserInput = {
    userName: 'Roel_Crabbe',
    passWord: '@Password123!',
    firstName: 'Roel',
    lastName: 'Crabbé',
    email: 'roel.crabbe@example.com',
};
const mockAllUsers: User[] = [cUser1, cUser2];
const mockAllUsersIdNames: IdName[] = [
    {
        id: cUser1.getId(),
        name: `${cUser1.getFirstName()} ${cUser1.getLastName()}`,
    },
    {
        id: cUser2.getId(),
        name: `${cUser2.getFirstName()} ${cUser2.getLastName()}`,
    },
];
const mockUserInput: UserInput = {
    userName: 'test123',
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@gmail.com',
    passWord: 'Test123@',
};
const userName = 'Yasir_DaBoss';
const userId = 1;
const userIds = [1, 2];

//let getUserByUserNameMock: jest.Mock<({ userName }: { userName: string }) => Promise<User | null>>;
let mockGetAllUsers: jest.MockedFunction<typeof userDb.getAllUsers>;
let mockGetUserByUserName: jest.MockedFunction<typeof userDb.getUserByUserName>;
let mockGetUsersByIds: jest.MockedFunction<typeof userDb.getUsersByIds>;
let mockGetUserById: jest.MockedFunction<typeof userDb.getUserById>;
let mockBcryptHash: jest.MockedFunction<typeof bcrypt.hash>;
beforeEach(() => {
    //getUserByUserNameMock = jest.fn();
    mockGetAllUsers = jest.fn();
    mockGetUserByUserName = jest.fn();
    mockGetUserById = jest.fn();
    mockGetUsersByIds = jest.fn();
    //need hotfix mockBcryptHash=jest.fn();
    userDb.getUsersByIds = mockGetUsersByIds;
    userDb.getUserById = mockGetUserById;
    userDb.getUserByUserName = mockGetUserByUserName;
    userDb.getAllUsers = mockGetAllUsers;

    //userDb.getUserByUserName = getUserByUserNameMock;
});

afterEach(() => {
    jest.clearAllMocks();
});
//getAllUsers
test('should return all users ', async () => {
    //given
    mockGetAllUsers.mockResolvedValue(mockAllUsers);
    //when
    const result = await userService.getAllUsers();

    //then
    expect(result).toEqual(mockAllUsers);

    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
});
//getAllUsersIdName
test('should  return all user id names  ', async () => {
    //given
    mockGetAllUsers.mockResolvedValue(mockAllUsers);
    //when
    const result = await userService.getAllUsersIdName();
    //then
    expect(mockGetAllUsers).toHaveBeenCalledWith();
    expect(result).toEqual(mockAllUsersIdNames);
});
//getUserByUserName
test('should return user with given username ', async () => {
    //given
    mockGetUserByUserName.mockResolvedValue(cUser1);
    //when
    const result = await userService.getUserByUserName({ userName: 'Yasir_DaBoss' });
    //then
    expect(mockGetUserByUserName).toHaveBeenCalledWith({ userName: 'Yasir_DaBoss' });
    expect(mockGetUserByUserName).toHaveBeenCalledTimes(1);
    expect(result).toEqual(cUser1);
});
test('should throw an error if given username does not exist ', async () => {
    //given
    mockGetUserByUserName.mockResolvedValue(null);
    //when
    await expect(userService.getUserByUserName({ userName: userName })).rejects.toThrowError(
        new Error(`User with username <${userName}> does not exist.`),
    );
    //then
    expect(mockGetUserByUserName).toHaveBeenCalledWith({ userName: userName });
    expect(mockGetUserByUserName).toHaveBeenCalledTimes(1);
});
//getUserById
test('should return the user with given id ', async () => {
    //given
    mockGetUserById.mockResolvedValue(cUser1);
    //when
    const result = await userService.getUserById({ id: userId });

    //then
    expect(result).toEqual(cUser1);
    expect(mockGetUserById).toBeCalledWith({ id: userId });
    expect(mockGetUserById).toHaveBeenCalledTimes(1);
});
test('should throw an error if given user id  does not exist ', async () => {
    //given
    mockGetUserById.mockResolvedValue(null);
    //when
    await expect(userService.getUserById({ id: userId })).rejects.toThrowError(
        new Error(`User with id <${userId}> does not exist.`),
    );
    //then
    expect(mockGetUserById).toHaveBeenCalledWith({ id: userId });
    expect(mockGetUserById).toHaveBeenCalledTimes(1);
});
//getUsersByIds
test('should return the users with given ids ', async () => {
    //given
    mockGetUsersByIds.mockResolvedValue([cUser1, cUser2]);
    //when
    const result = await userService.getUsersByIds({ userIds: userIds });

    //then
    expect(result).toEqual([cUser1, cUser2]);
    expect(mockGetUsersByIds).toBeCalledWith({ userIds: userIds });
    expect(mockGetUsersByIds).toHaveBeenCalledTimes(1);
});
test('should throw an error if given user ids  does not exist ', async () => {
    //given
    mockGetUsersByIds.mockResolvedValue([]);
    //when
    await expect(userService.getUsersByIds({ userIds: userIds })).rejects.toThrowError(
        new Error('There are invalid userIds values.'),
    );
    //then
    expect(mockGetUsersByIds).toHaveBeenCalledWith({ userIds: userIds });
    expect(mockGetUsersByIds).toHaveBeenCalledTimes(1);
});
//userSignUp
//need hotfix
// test('should signup a user with given user input ', async () => {
//     //given
//     mockGetUserByUserName.mockResolvedValue(null);
//     //when
//     const result = await userService.userSignUp(userInput);

//     //then
//     expect(mockGetUserByUserName).toHaveBeenCalledWith({ userName: 'Yasir_DaBoss' });
//     expect(mockGetUserByUserName).toHaveBeenCalledTimes(1);
//     expect(result).toEqual(cUser1);
// });
// test('should throw an error if given username does not exist ', async () => {
//     //given
//     mockGetUserByUserName.mockResolvedValue(null);
//     //when
//     await expect(userService.getUserByUserName({ userName: userName })).rejects.toThrowError(
//         new Error(`User with username <${userName}> does not exist.`),
//     );
//     //then
//     expect(mockGetUserByUserName).toHaveBeenCalledWith({ userName: userName });
//     expect(mockGetUserByUserName).toHaveBeenCalledTimes(1);
// });

//userAuthenticate
test('Given correct credentials, user will be authenticated successfully', async () => {
    // given
    const validUser = new User({
        id: 1,
        userName: 'Roel_Crabbe',
        passWord: await bcrypt.hash('@Password123!', 12),
        firstName: 'Roel',
        lastName: 'Crabbé',
        email: 'roel.crabbe@example.com',
        role: 'user' as Role,
    });

    mockGetUserByUserName.mockResolvedValue(validUser);

    // when
    const result = await userService.userAuthenticate(userInput);

    // then
    expect(mockGetUserByUserName).toHaveBeenCalledTimes(1);
    expect(mockGetUserByUserName).toHaveBeenCalledWith({ userName: userInput.userName });

    expect(result).toEqual({
        userId: validUser.getId(),
        token: generateJwtToken({ userId: validUser.getId(), role: validUser.getRole() }),
        userName: validUser.getUserName(),
        fullName: `${validUser.getFirstName()} ${validUser.getLastName()}`,
        role: validUser.getRole(),
    });
});

// test('Given correct values a user will be created with those values', async () => {
//     // When
//     getUserByUserNameMock.mockResolvedValue(null);

//     const hashedPassword = await bcrypt.hash(cUser.getPassWord()!, 12);

//     const mockCreatedUser = new User({
//         id: 1,
//         userName: cUser.getUserName(),
//         passWord: hashedPassword,
//         firstName: cUser.getFirstName(),
//         lastName: cUser.getLastName(),
//         email: cUser.getEmail(),
//         role: cUser.getRole(),
//     });

//     userSignUpMock.mockResolvedValue(mockCreatedUser);
//     // createDefaultWorkScheduleMock.mockResolvedValue(mockCreatedUser);
//     // getUsersByIdsMock.mockResolvedValue([mockCreatedUser]);

//     // When
//     const result = await userService.userSignUp({
//         userName: userInput.userName,
//         passWord: userInput.passWord,
//         firstName: userInput.firstName,
//         lastName: userInput.lastName,
//         email: userInput.email,
//     });

//     // Then
//     expect(getUserByUserNameMock).toHaveBeenCalledTimes(1);
//     expect(getUserByUserNameMock).toHaveBeenCalledWith({ userName: userInput.userName });

//     expect(userSignUpMock).toHaveBeenCalledTimes(1);
//     expect(userSignUpMock).toHaveBeenCalledWith(
//         new User({
//             id: 1,
//             userName: cUser.getUserName(),
//             passWord: hashedPassword,
//             firstName: cUser.getFirstName(),
//             lastName: cUser.getLastName(),
//             email: cUser.getEmail(),
//             role: cUser.getRole(),
//         }),
//     );

//     expect(createDefaultWorkScheduleMock).toHaveBeenCalledTimes(1);
//     expect(createDefaultWorkScheduleMock).toHaveBeenCalledWith(mockCreatedUser);

//     expect(getUsersByIdsMock).toHaveBeenCalledTimes(1);
//     expect(getUsersByIdsMock).toHaveBeenCalledWith({ userIds: [mockCreatedUser.getId()] });
// });
