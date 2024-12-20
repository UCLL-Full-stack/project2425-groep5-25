import { ProjectInput } from '@types';
import { getToken } from '@utils/authUtils';
import { processEnv } from 'env/env';

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

const updateProject = async (projectId: string, formData: ProjectInput) => {
    return await fetch(processEnv.getApiUrl() + `/projects/${projectId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
        body: JSON.stringify(formData),
    });
};

const deleteProjectById = async (projectId: string) => {
    return await fetch(processEnv.getApiUrl() + `/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken(),
        },
    });
};

const getAllProjectsByUserId = async () => {
    return await fetch(processEnv.getApiUrl() + `/projects/user`, {
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
    updateProject,
    deleteProjectById,
    getAllProjectsByUserId,
};
