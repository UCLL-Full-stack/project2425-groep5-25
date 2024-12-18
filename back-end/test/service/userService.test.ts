import { afterEach, beforeEach, expect, jest, test } from '@jest/globals';
import bcrypt from 'bcrypt';
import { User } from '../../model/user';
import { userDb } from '../../repository/user.db';
import { generateJwtToken } from '../../repository/utils/jwt';
import { userService } from '../../service/user.service';
import { Role, UserInput } from '../../types';

const userInput: UserInput = {
    userName: 'Roel_Crabbe',
    passWord: '@Password123!',
    firstName: 'Roel',
    lastName: 'Crabbé',
    email: 'roel.crabbe@example.com',
};

let getUserByUserNameMock: jest.Mock<({ userName }: { userName: string }) => Promise<User | null>>;

beforeEach(() => {
    getUserByUserNameMock = jest.fn();

    userDb.getUserByUserName = getUserByUserNameMock;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('Given correct credentials, user will be authenticated successfully', async () => {
    // Arrange
    const validUser = new User({
        id: 1,
        userName: 'Roel_Crabbe',
        passWord: await bcrypt.hash('@Password123!', 12),
        firstName: 'Roel',
        lastName: 'Crabbé',
        email: 'roel.crabbe@example.com',
        role: 'user' as Role,
    });

    getUserByUserNameMock.mockResolvedValue(validUser);

    // Act
    const result = await userService.userAuthenticate(userInput);

    // Assert
    expect(getUserByUserNameMock).toHaveBeenCalledTimes(1);
    expect(getUserByUserNameMock).toHaveBeenCalledWith({ userName: userInput.userName });

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
