import { Project } from "../model/project";
import { User } from "../model/user";
import { Role } from '../types';
import { Color } from "../types";
const projectB = new Project({
    id: 2,
    name: 'Project Beta',
    color: Color.Green,
    users: []
});
const users=[
    new User({
        id: 1,
        username: 'Johnny Sinister',
        firstName: 'John',
        lastName: 'Doe',
        email: 'jdoe@example.com',
        password: 'password123',
        role: 'admin',
        projects: [ projectB],
        workDays: []
    }),
    new User({
        id: 2,
        username: 'Johnny Bravo',
        firstName: 'Bravo',
        lastName: 'Bravo',
        email: 'bravo@example.com',
        password: 'password123',
        role: 'student',
        projects: [ projectB],
        workDays: []
    })
]
const getAllUsers=():User[] => {
    return users;
}
const getUserById=({id}:{id?:number}):User|null =>{
    if(id===null)
    {
        console.log("invalid id")
        return null;
    }
    console.log("user with id=",id,"is being returned")
    return users.find(user =>user.getId()===id) || null
}
export default{
    getAllUsers,getUserById
};