import { UserInput } from '@types';
import { processEnv } from 'env/env';

const getAllUsersIdName = async () => {
    return await fetch(processEnv.getApiUrl() + `/users/id-name`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });
};

const loginUser = (user: UserInput) => {
    return fetch(processEnv.getApiUrl() + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

const signupUser = (user: UserInput) => {
    return fetch(processEnv.getApiUrl() + '/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
};

export const userService = { loginUser, getAllUsersIdName, signupUser };
