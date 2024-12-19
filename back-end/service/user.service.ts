import bcrypt from 'bcrypt';
import { User } from '../model/user';
import { userDb } from '../repository/user.db';
import { generateJwtToken } from '../repository/utils/jwt';
import { AuthenticationResponse, IdName, Role, UserInput } from '../types';
import { projectService } from './project.service';
import { workScheduleService } from './workSchedule.service';

const getAllUsers = async (): Promise<User[]> => {
    return userDb.getAllUsers();
};

const getAllUsersIdName = async (): Promise<IdName[]> => {
    const users = await userDb.getAllUsers();
    return users.map((user) => ({
        id: user.getId(),
        name: `${user.getFirstName()} ${user.getLastName()}`,
    }));
};

const getUserByUserName = async ({ userName }: { userName: string }): Promise<User> => {
    const user = await userDb.getUserByUserName({ userName });
    if (!user) {
        throw new Error(`User with username <${userName}> does not exist.`);
    }
    return user;
};

const getUserById = async ({ id }: { id: number }): Promise<User> => {
    const user = await userDb.getUserById({ id });
    if (!user) {
        throw new Error(`User with id <${id}> does not exist.`);
    }
    return user;
};

const getUsersByIds = async ({ userIds }: { userIds: number[] }): Promise<User[]> => {
    const users = await userDb.getUsersByIds({ userIds });
    if (users.length !== userIds.length) {
        throw new Error('There are invalid userIds values.');
    }
    return users;
};

const userSignUp = async (userInput: UserInput): Promise<AuthenticationResponse> => {
    const { userName, passWord, firstName, lastName, email } = userInput;

    const existingUser = await userDb.getUserByUserName({ userName });
    if (existingUser) throw new Error(`User with username <${userName}> already exists.`);

    const hashedPassword = await bcrypt.hash(passWord, 12);

    const newUser = new User({
        userName,
        firstName,
        lastName,
        email,
        passWord: hashedPassword,
        role: 'user' as Role,
    });

    const createdUser = await userDb.createUser(newUser);
    await workScheduleService.createDefaultWorkSchedule(createdUser);
    await projectService.addUsersToDefaultProject([createdUser.getId()!]);

    return {
        userId: createdUser.getId(),
        token: generateJwtToken({ userId: createdUser.getId()!, role: createdUser.getRole() }),
        userName: createdUser.getUserName(),
        fullName: `${createdUser.getFirstName()} ${createdUser.getLastName()}`,
        role: createdUser.getRole(),
    };
};

const userAuthenticate = async (userInput: UserInput): Promise<AuthenticationResponse> => {
    const { userName, passWord } = userInput;
    const user = await getUserByUserName({ userName });

    const isValidPassword = await bcrypt.compare(passWord, user.getPassWord());
    if (!isValidPassword) throw new Error('Invalid credentials.');

    return {
        userId: user.getId(),
        token: generateJwtToken({ userId: user.getId()!, role: user.getRole() }),
        userName: user.getUserName(),
        fullName: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole(),
    };
};

export const userService = {
    getAllUsers,
    getAllUsersIdName,
    getUserByUserName,
    getUserById,
    getUsersByIds,
    userSignUp,
    userAuthenticate,
};
