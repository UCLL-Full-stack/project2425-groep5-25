import { ProjectUserCountDto } from "@types";
import { processEnv } from "env/env";

const getAllProjects = async () => {
  return await fetch(processEnv.getApiUrl() + `/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createProject = async (formData: ProjectUserCountDto) => {
  return await fetch(processEnv.getApiUrl() + `/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

const getAllProjectsUserCount = async () => {
  const [response] = await Promise.all([getAllProjects()]);
  const [projectResponse] = await Promise.all([response.json()]);
  const projectUserCounts: ProjectUserCountDto[] = projectResponse.map(
    (project: any) => ({
      id: project.id,
      name: project.name,
      color: project.color,
      userCount: project.users ? project.users.length : 0,
    })
  );
  return projectUserCounts;
};

const ProjectService = {
  getAllProjects,
  createProject,
  getAllProjectsUserCount,
};

export default ProjectService;
