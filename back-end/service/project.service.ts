import { ProjectDto } from '../dto';
import { Project } from '../model/project';
import { mapProject } from '../service/mapper.service';
import { Color, ProjectInput } from '../types';
import projectRepository from '../repository/project.db';
import userRepository from '../repository/user.db';

const getAllProjects = (): ProjectDto[] => {
    try {
        const projects: Project[] = projectRepository.getAllProjects();
        return projects.map(mapProject);
    } catch (error) {
        throw new Error('Error occurred at project service. See server log for details');
    }
};

const createProject = async ({ name, color, userIds }: ProjectInput): Promise<ProjectDto> => {
    if (!name || !color) throw new Error('Name & color is required');
    if (name.trim().length < 6) throw new Error('Project name must be at least 6 characters long.');
    if (!Object.values(Color).includes(color)) throw new Error('Invalid color value.');

    const existingProject = await projectRepository.getProjectsByName({ name });
    if (existingProject) {
        throw new Error('A project with this name already exists. Please choose a different name.');
    }

    const project = new Project({ name, color, users: [] });

    if (userIds && userIds.length > 0) {
        if (!userIds.every((id) => typeof id === 'number'))
            throw new Error('All userIds must be valid numbers.');

        const uniqueUserIds = new Set(userIds);
        if (uniqueUserIds.size !== userIds.length)
            throw new Error('UserIds must be unique. Duplicates found.');

        const allUsers = await userRepository.getAllUsers();
        const validUsers = allUsers.filter((user) => userIds.includes(user.getId() as number));
        const missingUserIds = userIds.filter(
            (id) => !validUsers.some((user) => user.getId() === id)
        );

        if (missingUserIds.length > 0)
            throw new Error(`Users with IDs ${missingUserIds.join(', ')} do not exist.`);

        validUsers.forEach((user) => project.addUser(user));
    }

    const newProject = await projectRepository.createProject(project);
    return mapProject(newProject);
};

export default {
    getAllProjects,
    createProject,
};
