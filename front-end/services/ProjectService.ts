import { ProjectUserCount } from "@types";

const getAllProjects = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + `/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getAllProjectsUserCount = async () => {
  const [response] = await Promise.all([getAllProjects()]);
  const [projectResponse] = await Promise.all([response.json()]);
  const simplifiedProjects: ProjectUserCount[] = projectResponse.map((project: any) => ({
    id: project.id,
    name: project.name,
    color: project.color,
    userCount: project.users ? project.users.length : 0,
}));

return simplifiedProjects;
};

const createProject= async(formData:any)=>{

    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(formData),
    });


  }
 

const ProjectService = {
  getAllProjects,createProject,
  getAllProjectsUserCount
};

export default ProjectService;
