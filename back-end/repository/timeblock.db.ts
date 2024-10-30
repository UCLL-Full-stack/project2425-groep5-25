import { Project } from '../model/project';
import { TimeBlock } from '../model/timeBlock';
import { User } from '../model/user';
import { WorkDay } from '../model/workDay';
import { WorkSchedule } from '../model/workSchedule';
import { Color } from '../types';

const projectA = new Project({
    id: 1,
    name: 'Project Alpha',
    color: Color.Red,
    users: []
});

const projectB = new Project({
    id: 2,
    name: 'Project Beta',
    color: Color.Green,
    users: []
});

const user1 = new User({
    id: 1,
    username: 'Johnny Sinister',
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@example.com',
    password: 'password123',
    role: 'admin',
    projects: [projectA, projectB],
    workDays: []
});

user1.addProject(projectA);
user1.addProject(projectB);
projectA.addUser(user1);
projectB.addUser(user1);

const workSchedule1 = new WorkSchedule({
    id: 1,
    user: user1,
    mondayHours: 8,
    tuesdayHours: 8,
    wednesdayHours: 8,
    thursdayHours: 8,
    fridayHours: 8,
    saturdayHours: 0,
    sundayHours: 0,
});

user1.setWorkSchedule(workSchedule1);

const workDay1 = new WorkDay({
    id: 1,
    expectedHours: 8,
    achievedHours: 6,
    date: new Date('2024-10-30'),
    user: user1,
    timeBlocks: []
});

user1.addWorkDay(workDay1);

const timeBlocks: TimeBlock[] = [
    new TimeBlock({
        id: 1,
        startTime: new Date('2024-10-30T09:00:00'),
        endTime: new Date('2024-10-30T10:00:00'),
        project: projectA,
        workday: workDay1,
    }),
    new TimeBlock({
        id: 2,
        startTime: new Date('2024-10-30T10:30:00'),
        endTime: new Date('2024-10-30T12:00:00'),
        project: projectB,
        workday: workDay1,
    }),
    new TimeBlock({
        id: 3,
        startTime: new Date('2024-10-30T13:00:00'),
        endTime: new Date('2024-10-30T14:30:00'),
        project: projectA,
        workday: workDay1,
    }),
    new TimeBlock({
        id: 4,
        startTime: new Date('2024-10-30T15:00:00'),
        endTime: new Date('2024-10-30T17:00:00'),
        project: projectB,
        workday: workDay1,
    }),
    new TimeBlock({
        id: 5,
        startTime: new Date('2024-10-30T17:30:00'),
        endTime: new Date('2024-10-30T19:00:00'),
        project: projectA,
        workday: workDay1,
    }),
];

timeBlocks.forEach((timeBlock) => {
    workDay1.addTimeBlock(timeBlock);
});

const getTimeBlocks = (): TimeBlock[] => {
    return timeBlocks;
};

export default {
    getTimeBlocks,
};
