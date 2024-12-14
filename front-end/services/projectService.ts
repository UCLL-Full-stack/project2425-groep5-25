import { ProjectInput } from '@types';
import { processEnv } from 'env/env';
import { getToken } from 'utils/authUtils';

const getAllProjects = async () => {
    return await fetch(processEnv.getApiUrl() + `/projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

const createProject = async (formData: ProjectInput) => {
    return await fetch(processEnv.getApiUrl() + `/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
        body: JSON.stringify(formData),
    });
};

const getProjectById = async (projectId: string) => {
    return await fetch(processEnv.getApiUrl() + `/projects/${projectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

export const projectService = {
    getAllProjects,
    createProject,
    getProjectById,
};
