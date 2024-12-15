import { Project } from '../model/project';
import database from './utils/database';

const getAllProjects = async (): Promise<Project[]> => {
    try {
        const projectsPrisma = await database.project.findMany({
            include: {
                users: true,
            },
            orderBy: { id: 'asc' },
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

const getProjectsByUserId = async ({ userId }: { userId: number }): Promise<Project[]> => {
    try {
        const projectsPrisma = await database.project.findMany({
            where: {
                users: { some: { id: userId } },
            },
            include: {
                users: true,
            },
            orderBy: { id: 'asc' },
        });

        return projectsPrisma.map((project) => Project.from(project));
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

const addUsersToProject = async (project: Project): Promise<Project> => {
    try {
        const projectPrisma = await database.project.update({
            where: { id: project.getId() },
            data: {
                users: {
                    set: project.getUsers().map((user) => ({ id: user.getId() })),
                },
            },
            include: {
                users: true,
            },
        });

        return Project.from(projectPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. Unable to add users to the project.');
    }
};

const updateProject = async (project: Project): Promise<Project> => {
    try {
        const projectPrisma = await database.project.update({
            where: { id: project.getId() },
            data: {
                name: project.getName(),
                color: project.getColor(),
                users: {
                    set: project.getUsers().map((user) => ({ id: user.getId() })),
                },
            },
            include: {
                users: true,
            },
        });

        return Project.from(projectPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. Unable to add users to the project.');
    }
};

const deleteProject = async (project: Project): Promise<Project> => {
    try {
        const deletedProject = await database.project.delete({
            where: { id: project.getId() },
            include: {
                users: true,
            },
        });

        return Project.from(deletedProject);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. Unable to delete the project.');
    }
};

export const projectDb = {
    getAllProjects,
    getProjectByName,
    getProjectById,
    getProjectsByUserId,
    createProject,
    addUsersToProject,
    updateProject,
    deleteProject,
};
