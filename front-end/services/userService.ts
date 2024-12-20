import { UserInput } from '@types';
import { getToken } from '@utils/authUtils';
import { processEnv } from 'env/env';

const getAllUsersIdName = async () => {
    return fetch(processEnv.getApiUrl() + `/users/id-name`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

const loginUser = async (user: UserInput) => {
    return await fetch(processEnv.getApiUrl() + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

const signupUser = async (user: UserInput) => {
    return await fetch(processEnv.getApiUrl() + '/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

export const userService = { loginUser, getAllUsersIdName, signupUser };
