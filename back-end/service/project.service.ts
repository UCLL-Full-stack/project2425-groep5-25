import { Project } from '../model/project';
import { projectDb } from '../repository/project.db';
import { ProjectInput } from '../types';

const getAllProjects = async (): Promise<Project[]> => {
    return projectDb.getAllProjects();
};

const createProject = async (projectInput: ProjectInput): Promise<Project> => {
    const { name, color } = projectInput;

    const existingProject = await projectDb.getProjectByName({ name });
    if (existingProject) throw new Error(`Project with name <${name}> already exists.`);

    const newProject = new Project({
        name,
        color,
    });

    return await projectDb.createProject(newProject);
};

export const projectService = {
    getAllProjects,
    createProject,
};
