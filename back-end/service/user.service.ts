import userDB from '../repository/user.db';
import { User } from '../model/user';
import { AuthenticationResponse, IdName, ProjectInput, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { WorkSchedule } from '../model/workSchedule';
import { projectNames } from '../constants';
import projectDb from '../repository/project.db';
import workScheduleDb from '../repository/workSchedule.db';
import { generateJwtToken } from '../repository/utils/jwt';

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

const getUserByUserName = async ({ userName }: { userName: string }): Promise<User> => {
    const user = await userDB.getUserByUserName({ userName });
    if (!user) {
        throw new Error(`User with username <${userName}> does not exist.`);
    }
    return user;
};

const userSignUp = async (userInput: UserInput): Promise<User> => {
    const { userName, passWord, firstName, lastName, email, role } = userInput;

    const existingUser = await userDB.getUserByUserName({ userName });
    if (existingUser) throw new Error(`User with username <${userName}> already exists.`);

    const defaultProject = await projectDb.getProjectByName({ name: projectNames.DEFAULT_PROJECT });
    if (!defaultProject) throw new Error(`Project with name <${projectNames.DEFAULT_PROJECT}> doesn't exist.`);

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

const userAuthenticate = async (userInput: UserInput): Promise<AuthenticationResponse> => {
    const { userName, passWord, role } = userInput;
    const user = await getUserByUserName({ userName });

    const isValidPassword = await bcrypt.compare(passWord, user.getPassWord());
    if (!isValidPassword) throw new Error('Invalid credentials.');    

    return {
        token: generateJwtToken({ userName, role: user.getRole() }),
        username: user.getUserName(),
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role
    }
}

const addProjectToUser = async (userInput: UserInput, projectInput: ProjectInput): Promise<User> => {
    const { userName } = userInput;
    const { name } = projectInput;

    const user = await getUserByUserName({ userName });
    const project = await projectDb.getProjectByName({ name });
    if (!project) throw new Error(`Project with name <${name}> doesn't exist.`);

    return await userDB.addProjectToUser(user, project);
}

export default {
    getAllUsers,
    getAllUsersIdName,
    getUserByUserName,
    userSignUp,
    userAuthenticate,
    addProjectToUser
};
