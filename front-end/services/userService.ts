import { ProjectToUserInput } from '@types';
import { processEnv } from 'env/env';

const getAllUsersIdName = async () => {
    return await fetch(processEnv.getApiUrl() + `/users/id-name`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};

const enrollProject = async (formData: ProjectToUserInput) => {
    return await fetch(processEnv.getApiUrl() + `/users/enroll-projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
    });
};

export const userService = {
    getAllUsersIdName,
    enrollProject,
};
