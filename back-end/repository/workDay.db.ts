import { Project } from '../model/project';
import { TimeBlock } from '../model/timeblock';
import { User } from '../model/user';
import { WorkDay } from '../model/workDay';
import { WorkSchedule } from '../model/workSchedule';
import { Color } from '../types';
const projectB = new Project({
    id: 2,
    name: 'Project Beta',
    color: Color.Green,
    users: []
});
const user1=new User({
    id: 1,
    username: 'Johnny Sinister',
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@example.com',
    password: 'password123',
    role: 'admin',
    projects: [projectB],
    workDays: []
})


const workDays :WorkDay[]=[
    new WorkDay({
        id: 1,
        expectedHours: 8,
        achievedHours: 6,
        date: new Date('2024-10-30'),
        user: user1,timeBlocks:[]
    }), new WorkDay({
        id: 2,
        expectedHours: 7,
        achievedHours: 5,
        date: new Date('2024-10-31'),
        user: user1,timeBlocks:[]
    }),
]

const getWorkDayByDateAndUser = (date: Date, userId: number): WorkDay | null => {
    

    
    return workDays.find(workDay => {
        
        const workDayDate = workDay.getDate();


        return (
            workDayDate.getFullYear() === date.getFullYear() &&
            workDayDate.getMonth() === date.getMonth() &&
            workDayDate.getDate() === date.getDate() &&
            workDay.getUser().getId() === userId
        );
    }) || null; // Return null if not found
};
const createWorkDay =(workDay:WorkDay): WorkDay =>{
    workDays.push(workDay)
    return workDay;
};
export default{
    createWorkDay,getWorkDayByDateAndUser
}