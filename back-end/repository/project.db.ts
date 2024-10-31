import { Project } from "../model/project";
import { User } from "../model/user";
import { Color } from '../types';
const projects=[
    new Project({
        id:1,name:'firstProject',color: Color.Red,users:[]
    }),
    new Project({
        id:2,name:'secondProject',color:Color.Black,users:[]
    })
]
const getAllProjects=():Project[] => {
    return projects;
}
const getProjectById=({id}:{id?:number}):Project|null =>{
    if(id===null)
    {
        console.log("invalid id")
        return null;
    }
    console.log("project with id=",id,"is being returned")
    return projects.find(project =>project.getId()===id) || null
}
export default{
    getAllProjects,getProjectById
};