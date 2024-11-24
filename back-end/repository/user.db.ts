import { Project } from '../model/project';
import { User } from '../model/user';
import database from './utils/database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: {
                workSchedule: true,
                projects: true,
                workDays: true,
            },
        });
        return usersPrisma.map((x) => User.from(x));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUserName = async ({ userName }: { userName: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { userName },
            include: {
                workSchedule: true,
                projects: true,
                workDays: true,
            },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                userName: user.getUserName(),
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                email: user.getEmail(),
                role: user.getRole(),
                passWord: user.getPassWord(),
                workSchedule: {
                    connect: { id: user.getWorkSchedule().getId() },
                },
                projects: {
                    connect: user.getProjects().map((x) => ({ id: x.getId() })),
                },
                workDays: {
                    connect: user.getWorkDays().map((x) => ({ id: x.getId() })),
                }
            },
            include: {
                workSchedule: true,
                projects: true,
                workDays: true,
            },
        });

        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addProjectToUser = async (user: User, project: Project): Promise<User> => {
    try {
        const userPrisma = await database.user.update({
            where: { id: user.getId() },
            data: {
                projects: {
                    connect: {
                        id: project.getId(),
                    },
                },
            },
            include: {
                workSchedule: true,
                workDays: true,
                projects: true,
            },
        });

        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllUsers,
    getUserByUserName,
    createUser,
    addProjectToUser
};
