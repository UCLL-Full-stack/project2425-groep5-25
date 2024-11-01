import { User } from "../model/user";
import { users } from './fakeData.db';

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        return await users.find((user) => user.getId() === id) || null;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const getAllUsers = (): User[] => users;


export default{
    getUserById,
    getAllUsers
};