import userRepository from '../repository/user.db';
import { User } from '../model/user';
import { IdName } from '../types';

const getAllUsers = async (): Promise<User[]> => {
    return userRepository.getAllUsers();
};

const getAllUsersIdName = async (): Promise<IdName[]> => {
    return userRepository.getAllUsersIdName();
};

export default {
    getAllUsers,
    getAllUsersIdName
};