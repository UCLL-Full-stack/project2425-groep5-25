import { ProjectInput } from '@types';
import { processEnv } from 'env/env';
import { getToken } from 'utils/authUtils';

const getAllProjects = async () => {
    return fetch(processEnv.getApiUrl() + `/projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

const createProject = async (formData: ProjectInput) => {
    return fetch(processEnv.getApiUrl() + `/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
        body: JSON.stringify(formData),
    });
};

export const projectService = {
    getAllProjects,
    createProject,
};
