import { UnauthorizedError } from 'express-jwt';
import { Project } from '../model/project';
import { projectDb } from '../repository/project.db';
import { authorizeRole } from '../repository/utils/jwt';
import { JwtToken, ProjectInput, projectNames } from '../types';

import { userService } from './user.service';

const getAllProjects = async ({ auth }: { auth: JwtToken }): Promise<Project[]> => {
    const permissions = authorizeRole(auth.role);

    if (permissions.isUser) return projectDb.getProjectsByUserId({ userId: auth.userId });

    if (permissions.isAdmin || permissions.isHr) {
        return projectDb.getAllProjects();
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }
};

const getAllProjectsByUserId = async ({ auth }: { auth: JwtToken }): Promise<Project[]> => {
    const permissions = authorizeRole(auth.role);

    if (permissions.isAdmin || permissions.isHr || permissions.isUser) {
        return projectDb.getProjectsByUserId({ userId: auth.userId });
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }
};

const getProjectById = async ({
    auth,
    projectId,
}: {
    auth: JwtToken;
    projectId: number;
}): Promise<Project> => {
    const permissions = authorizeRole(auth.role);

    if (permissions.isAdmin || permissions.isHr) {
        const fProject = await projectDb.getProjectById({ id: projectId });
        if (!fProject) throw new Error(`Project with id <${projectId}> doesn't exist.`);
        return fProject;
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }
};

const updateProject = async ({
    auth,
    projectId,
    projectInput,
}: {
    auth: JwtToken;
    projectId: number;
    projectInput: ProjectInput;
}): Promise<Project> => {
    if (!projectInput.id) throw new Error('ProjectInput Id is required.');

    const { id, name, color, userIds } = projectInput;

    const permissions = authorizeRole(auth.role);

    if (permissions.isAdmin || permissions.isHr) {
        if (id !== projectId) throw new Error('You are updating the wrong project.');

        const project = await projectDb.getProjectById({ id });
        if (!project) throw new Error(`Project with id <${id}> doesn't exist.`);

        const dProject = await getDefaultProject();
        if (dProject.getId() === project.getId()) throw new Error('Cannot update default project.');

        const users = await userService.getUsersByIds({ userIds: userIds });

        const uProject = new Project({
            id,
            name,
            color,
            users,
        });

        return await projectDb.updateProject(uProject);
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }
};

const deleteProjectById = async ({
    auth,
    projectId,
}: {
    auth: JwtToken;
    projectId: number;
}): Promise<Project> => {
    const permissions = authorizeRole(auth.role);

    if (permissions.isAdmin) {
        const project = await projectDb.getProjectById({ id: projectId });
        if (!project) throw new Error(`Project with id <${projectId}> doesn't exist.`);

        const dProject = await getDefaultProject();
        if (dProject.getId() === project.getId()) throw new Error('Cannot delete default project.');

        return await projectDb.deleteProject(project);
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }
};

const createProject = async ({
    auth,
    projectInput,
}: {
    auth: JwtToken;
    projectInput: ProjectInput;
}): Promise<Project> => {
    const { name, color, userIds } = projectInput;

    const permissions = authorizeRole(auth.role);

    if (!permissions.isAdmin) {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }

    const eProject = await projectDb.getProjectByName({ name });
    if (eProject) throw new Error(`Project with name <${name}> already exists.`);

    const users = await userService.getUsersByIds({ userIds });

    const nProject = new Project({
        name,
        color,
        users,
    });

    return await projectDb.createProject(nProject);
};

const getDefaultProject = async (): Promise<Project> => {
    const project = await projectDb.getProjectByName({ name: projectNames.DEFAULT_PROJECT });
    if (!project) {
        throw new Error(`Default project doesn't exist.`);
    }
    return project;
};

const addUsersToDefaultProject = async (userIds: number[]): Promise<Project> => {
    const dProject = await getDefaultProject();
    const users = await userService.getUsersByIds({ userIds });

    const uProject = new Project({
        id: dProject.getId(),
        name: dProject.getName(),
        color: dProject.getColor(),
        users: [...dProject.getUsers(), ...users],
    });

    return await projectDb.addUsersToProject(uProject);
};

export const projectService = {
    getAllProjects,
    createProject,
    addUsersToDefaultProject,
    getProjectById,
    updateProject,
    deleteProjectById,
    getAllProjectsByUserId,
};
