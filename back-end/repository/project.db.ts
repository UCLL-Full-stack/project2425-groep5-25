import { NotFoundError } from "../errors";
import { Project } from "../model/project";
import database from "./database";
import userRepository from './user.db';

// const getProjectsByUserId = async ({ userId }: { userId: number }): Promise<Project[]> => {    
//     try {
//         const user = await userRepository.getUserById({ id: userId });
//         if (!user) throw new NotFoundError("User not found");
//         return user.getProjects();
//     } catch (error) {
//         throw new Error('Database error. See server log for details');
//     }
// };

// const getProjectsByName = async ({ name }: { name: string }): Promise<Project | null> => {    
//     try {
//         const foundProject = projects.find((project) => project.getName() === name);
//         return foundProject || null;
//     } catch (error) {
//         throw new Error('Database error. See server log for details');
//     }
// };

// const getAllProjects = (): Project[] => projects;

// const createProject = async (project: Project): Promise<Project> => {
//     project.setId(projects.length + 1);
//     await projects.push(project);
//     return project;
// }

const getAllProjects = async (): Promise<Project[]> => {
    try {
        const projectsPrisma = await database.project.findMany();
        return projectsPrisma.map((x) => Project.from(x));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default{
    getAllProjects
};