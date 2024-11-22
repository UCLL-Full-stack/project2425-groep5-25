import { User } from "../model/user";
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

export default {
    getAllUsers
};