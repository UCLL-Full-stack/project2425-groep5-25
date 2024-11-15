import { Project } from '../model/project';
import projectRepository from '../repository/project.db';

// const createProject = async ({ name, color, userIds }: ProjectInput): Promise<ProjectDto> => {
    
//     const existingProject = await projectRepository.getProjectsByName({ name });
//     if (existingProject)
//         throw new Error('A project with this name already exists. Please choose a different name.');

//     const project = new Project({ name, color, users: [] });

//     if (userIds && userIds.length > 0) {
//         const allUsers = await userRepository.getAllUsers();
//         const validUsers = allUsers.filter((user) => userIds.includes(user.getId() as number));
//         const missingUserIds = userIds.filter(
//             (id) => !validUsers.some((user) => user.getId() === id)
//         );

//         if (missingUserIds.length > 0)
//             throw new Error(`Users with IDs ${missingUserIds.join(', ')} do not exist.`);

//         validUsers.forEach((user) => project.addUser(user));
//     }

//     const newProject = await projectRepository.createProject(project);
//     return mapProject(newProject);
// };

const getAllProjects = async (): Promise<Project[]> => {
    return projectRepository.getAllProjects();
};

export default {
    getAllProjects
};
