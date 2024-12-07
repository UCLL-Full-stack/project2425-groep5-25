import { projectNames } from '../constants';
import { Project } from '../model/project';
import { projectDb } from '../repository/project.db';
import { ProjectInput } from '../types';
import { userService } from './user.service';

const getAllProjects = async (): Promise<Project[]> => {
    return projectDb.getAllProjects();
};

const createProject = async (projectInput: ProjectInput): Promise<Project> => {
    const { name, color, userIds } = projectInput;

    const existingProject = await projectDb.getProjectByName({ name });
    if (existingProject) throw new Error(`Project with name <${name}> already exists.`);

    const users = await userService.getUsersByIds({ userIds });

    const newProject = new Project({
        name,
        color,
        users,
    });

    return await projectDb.createProject(newProject);
};

const addUsersToProject = async (projectInput: ProjectInput): Promise<Project> => {
    const { id, userIds } = projectInput;

    const existingProject = await projectDb.getProjectById({ id });
    if (!existingProject) throw new Error(`Project with id: <${id}> doesn't exists.`);

    const users = await userService.getUsersByIds({ userIds });

    const updatedProject = new Project({
        name: existingProject.getName(),
        color: existingProject.getColor(),
        users: [...existingProject.getUsers(), ...users],
    });

    return await projectDb.createProject(updatedProject);
};

const addUsersToDefaultProject = async (projectInput: ProjectInput): Promise<Project> => {
    const { userIds } = projectInput;

    const defaultProject = await projectDb.getProjectByName({ name: projectNames.DEFAULT_PROJECT });
    if (!defaultProject)
        throw new Error(`Project with name <${projectNames.DEFAULT_PROJECT}> doesn't exist.`);

    const users = await userService.getUsersByIds({ userIds });

    const updatedProject = new Project({
        name: defaultProject.getName(),
        color: defaultProject.getColor(),
        users: [...defaultProject.getUsers(), ...users],
    });

    return await projectDb.createProject(updatedProject);
};

export const projectService = {
    getAllProjects,
    createProject,
    addUsersToProject,
    addUsersToDefaultProject,
};
