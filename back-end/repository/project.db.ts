import { NotFoundError } from "../errors";
import { Project } from "../model/project";
import userRepository from './user.db';
import { projects } from './fakeData.db';

const getProjectsByUserId = async ({ userId }: { userId: number }): Promise<Project[]> => {    
    try {
        const user = await userRepository.getUserById({ id: userId });
        if (!user) throw new NotFoundError("User not found");
        return user.getProjects();
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
};

const getAllProjects = (): Project[] => projects;

export default{
    getProjectsByUserId,
    getAllProjects
};