import { Project } from '../model/project';
import database from './utils/database';

const getAllProjects = async (): Promise<Project[]> => {
    try {
        const projectsPrisma = await database.project.findMany({
            include: {
                users: true,
            },
        });

        return projectsPrisma.map((project) => Project.from(project));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getProjectByName = async ({ name }: { name: string }): Promise<Project | null> => {
    try {
        const projectPrisma = await database.project.findFirst({
            where: { name },
            include: {
                users: true,
            },
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
            include: {
                users: true,
            },
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
                users: {
                    connect: project.getUsers().map((user) => ({ id: user.getId() })),
                },
            },
            include: {
                users: true,
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
