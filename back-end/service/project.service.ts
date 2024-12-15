import { UnauthorizedError } from 'express-jwt';
import { projectNames } from '../constants';
import { Project } from '../model/project';
import { projectDb } from '../repository/project.db';
import { authorizeRole } from '../repository/utils/jwt';
import { JwtToken, ProjectInput } from '../types';
import { userService } from './user.service';

const getAllProjects = async ({ auth }: { auth: JwtToken }): Promise<Project[]> => {
    const { userId, role } = auth;
    const permissions = authorizeRole(role);

    if (permissions.isAdmin || permissions.isHr) {
        return projectDb.getAllProjects();
    } else if (permissions.isUser) {
        return projectDb.getProjectsByUserId({ userId });
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
}): Promise<Project | null> => {
    const { userId, role } = auth;
    const permissions = authorizeRole(role);

    if (permissions.isAdmin || permissions.isHr) {
        return projectDb.getProjectById({ id: projectId });
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
    const { userId, role } = auth;
    const { id, name, color, userIds } = projectInput;
    const permissions = authorizeRole(role);

    if (id !== projectId) throw new Error('Project id mismatch.');

    const project = await projectDb.getProjectById({ id });
    if (!project) throw new Error(`Project with id <${id}> doesn't exist.`);

    const dProject = await getDefaultProject();
    if (dProject.getId() === project.getId()) throw new Error('Cannot update default project.');

    const users = await userService.getUsersByIds({ userIds });

    const uProject = new Project({
        id,
        name,
        color,
        users,
    });

    if (permissions.isAdmin || permissions.isHr) {
        return await projectDb.updateProject(uProject);
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }
};

const createProject = async (projectInput: ProjectInput): Promise<Project> => {
    const { name, color, userIds } = projectInput;

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

const addUsersToDefaultProject = async (projectInput: ProjectInput): Promise<Project> => {
    const { userIds } = projectInput;

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

const deleteProjectById = async ({
    auth,
    projectId,
}: {
    auth: JwtToken;
    projectId: number;
}): Promise<Project> => {
    const { userId, role } = auth;
    const permissions = authorizeRole(role);

    const project = await projectDb.getProjectById({ id: projectId });
    if (!project) throw new Error(`Project with id <${projectId}> doesn't exist.`);

    const dProject = await getDefaultProject();
    if (dProject.getId() === project.getId()) throw new Error('Cannot delete default project.');

    if (permissions.isAdmin) {
        return await projectDb.deleteProject(project);
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }
};

export const projectService = {
    getAllProjects,
    createProject,
    addUsersToDefaultProject,
    getProjectById,
    updateProject,
    deleteProjectById,
};
