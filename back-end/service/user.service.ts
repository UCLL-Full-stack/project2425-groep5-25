import userRepository from '../repository/user.db';
import { User } from '../model/user';
import { IdName } from '../types';

const getAllUsers = async (): Promise<User[]> => {
    return userRepository.getAllUsers();
};

const getAllUsersIdName = async (): Promise<IdName[]> => {
    const users = await userRepository.getAllUsers();
    return users.map((user) => ({
        id: user.getId(),
        name: `${user.getFirstName()} ${user.getLastName()}`,
    }));
};

export default {
    getAllUsers,
    getAllUsersIdName,
};
