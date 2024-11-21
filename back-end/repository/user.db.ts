import { User } from "../model/user";
import { IdName } from "../types";
import database from "./database";

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

const getAllUsersIdName = async (): Promise<IdName[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true
            }
        });
        return usersPrisma.map((user) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`
        }));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllUsers,
    getAllUsersIdName
};