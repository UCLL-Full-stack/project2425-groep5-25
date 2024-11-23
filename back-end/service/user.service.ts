import userDB from '../repository/user.db';
import { User } from '../model/user';
import { IdName, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { WorkSchedule } from '../model/workSchedule';
import { projectNames } from '../constants';
import projectDb from '../repository/project.db';
import workScheduleDb from '../repository/workSchedule.db';

const getAllUsers = async (): Promise<User[]> => {
    return userDB.getAllUsers();
};

const getAllUsersIdName = async (): Promise<IdName[]> => {
    const users = await userDB.getAllUsers();
    return users.map((user) => ({
        id: user.getId(),
        name: `${user.getFirstName()} ${user.getLastName()}`,
    }));
};

const createUser = async (userInput: UserInput): Promise<User> => {
    const { userName, passWord, firstName, lastName, email, role } = userInput;

    const existingUser = await userDB.getUserByUserName({ userName });
    if (existingUser) throw new Error(`User with username: ${userName} already exists.`);

    const defaultProject = await projectDb.getProjectByName({ name: projectNames.DEFAULT_PROJECT });
    if (!defaultProject) throw new Error(`Project with name: ${projectNames.DEFAULT_PROJECT} doesn't exist.`);

    const workSchedule = await workScheduleDb.createWorkSchedule(WorkSchedule.createDefault());
    const hashedPassword = await bcrypt.hash(passWord, 12);
    
    const newUser = new User({
        userName,
        firstName,
        lastName,
        email,
        passWord: hashedPassword,
        role,
        workSchedule,
        projects: [defaultProject],
        workDays: [],
    });

    return await userDB.createUser(newUser);
};

export default {
    getAllUsers,
    getAllUsersIdName,
    createUser
};
