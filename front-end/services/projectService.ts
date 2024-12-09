import { ProjectInput } from '@types';
import { processEnv } from 'env/env';

const getAllProjects = async () => {
    return await fetch(processEnv.getApiUrl() + `/projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });
};

const createProject = async (formData: ProjectInput) => {
    return await fetch(processEnv.getApiUrl() + `/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(formData),
    });
};

export const projectService = {
    getAllProjects,
    createProject,
};
