

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
  getAllProjects,createProject
};

export default ProjectService;
