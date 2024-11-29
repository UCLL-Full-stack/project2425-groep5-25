import { Project } from '../model/project';
import database from './utils/database';

const getAllProjects = async (): Promise<Project[]> => {
    try {
        const projectsPrisma = await database.project.findMany();
        return projectsPrisma.map((x) => Project.from(x));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getProjectByName = async ({ name }: { name: string }): Promise<Project | null> => {
    try {
        const projectPrisma = await database.project.findFirst({
            where: { name },
        });

        return projectPrisma ? Project.from(projectPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getProjectById = async ({ id }: { id: number }): Promise<Project | null> => {
    try {
        const projectPrisma = await database.project.findFirst({
            where: { id },
        });

        return projectPrisma ? Project.from(projectPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createProject = async (project: Project): Promise<Project> => {
    try {
        const projectPrisma = await database.project.create({
            data: {
                name: project.getName(),
                color: project.getColor(),
            },
        });

        return Project.from(projectPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export const projectDb = {
    getAllProjects,
    getProjectByName,
    getProjectById,
    createProject,
};