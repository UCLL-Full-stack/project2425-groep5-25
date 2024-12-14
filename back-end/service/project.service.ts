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

export const projectService = {
    getAllProjects,
    createProject,
    addUsersToDefaultProject,
};
