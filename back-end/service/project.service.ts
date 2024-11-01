import { ProjectDto, TimeBlockDto, UserDto, WorkDayDto } from '../dto';
import projectRepository from '../repository/project.db';
import { Project } from '../model/project';
import { mapProject, mapTimeBlock, mapUser, mapWorkDay, mapWorkSchedule } from '../service/mapper.service';

const getAllProjects = (): ProjectDto[] => {
    try {
      const projects: Project[] = projectRepository.getAllProjects();
      return projects.map(mapProject);
    } catch (error) {
        throw new Error('Error occurred at project service. See server log for details');
    }
};

export default {
    getAllProjects,
};
