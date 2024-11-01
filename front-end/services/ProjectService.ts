

import { ProjectDto } from '../types'; 
const API_URL = process.env.NEXT_PUBLIC_API_URL; 

const getAllProjects = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + `/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const ProjectService = {
  getAllProjects,
};

export default ProjectService;
