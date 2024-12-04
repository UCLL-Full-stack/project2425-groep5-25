import { ProjectOutput } from '@types';
import { processEnv } from 'env/env';

const getAllProjects = async () => {
    return await fetch(processEnv.getApiUrl() + `/projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const createProject = async (formData: ProjectOutput) => {
    return await fetch(processEnv.getApiUrl() + `/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
};

export const projectService = {
    getAllProjects,
    createProject,
};
