import bcrypt from 'bcrypt';
import { projectNames } from '../constants';
import { User } from '../model/user';
import { WorkSchedule } from '../model/workSchedule';
import { projectDb } from '../repository/project.db';
import { userDb } from '../repository/user.db';
import { generateJwtToken } from '../repository/utils/jwt';
import { workScheduleDb } from '../repository/workSchedule.db';
import { AuthenticationResponse, IdName, ProjectToUserInput, UserInput } from '../types';

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
    return await Promise.all(userIds.map((id) => getUserById({ id })));
};

const userSignUp = async (userInput: UserInput): Promise<User> => {
    const { userName, passWord, firstName, lastName, email, role } = userInput;

    const existingUser = await userDb.getUserByUserName({ userName });
    if (existingUser) throw new Error(`User with username <${userName}> already exists.`);

    const defaultProject = await projectDb.getProjectByName({ name: projectNames.DEFAULT_PROJECT });
    if (!defaultProject)
        throw new Error(`Project with name <${projectNames.DEFAULT_PROJECT}> doesn't exist.`);

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

    return await userDb.createUser(newUser);
};

const userAuthenticate = async (userInput: UserInput): Promise<AuthenticationResponse> => {
    const { userName, passWord, role } = userInput;
    const user = await getUserByUserName({ userName });

    const isValidPassword = await bcrypt.compare(passWord, user.getPassWord());
    if (!isValidPassword) throw new Error('Invalid credentials.');

    return {
        token: generateJwtToken({ userName, role: user.getRole() }),
        username: user.getUserName(),
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role,
    };
};

const addProjectToUsers = async (projectToUserInput: ProjectToUserInput): Promise<User[]> => {
    const { projectId, userIds } = projectToUserInput;

    const users = await getUsersByIds({ userIds });
    const project = await projectDb.getProjectById({ id: projectId });
    if (!project) throw new Error(`Project with id <${projectId}> doesn't exist.`);

    const enrollmentCheck = await Promise.all(
        users.map((user) => userDb.checkUserInProject(user, project)),
    );
    if (enrollmentCheck.includes(true))
        throw new Error('Some users are already enrolled in this project.');

    return await userDb.addProjectToUsers(users, project);
};

export const userService = {
    getAllUsers,
    getAllUsersIdName,
    getUserByUserName,
    getUserById,
    getUsersByIds,
    userSignUp,
    userAuthenticate,
    addProjectToUsers,
};
