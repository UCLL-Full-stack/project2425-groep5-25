import { Project } from "../model/project";
import { TimeBlock } from "../model/timeBlock";
import { User } from "../model/user";
import { WorkDay } from "../model/workDay";
import { WorkSchedule } from "../model/workSchedule";
import { Color } from "../types";

// Define projects
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

const projectC = new Project({
    id: 3,
    name: 'Project Gamma',
    color: Color.Blue,
    users: []
});

// Temporary work schedule for users
const tempWorkSchedule = new WorkSchedule({
    id: 0,
    user: {} as User,
    mondayHours: 0,
    tuesdayHours: 0,
    wednesdayHours: 0,
    thursdayHours: 0,
    fridayHours: 0,
    saturdayHours: 0,
    sundayHours: 0,
});

// Define users
const user1 = new User({
    id: 1,
    username: 'Johnny Sinister',
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@example.com',
    password: 'password123',
    role: 'admin',
    projects: [projectA, projectB],
    workDays: [],
    workSchedule: tempWorkSchedule // Temporary
});

const user2 = new User({
    id: 2,
    username: 'JaneDynamic',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jsmith@example.com',
    password: 'password456',
    role: 'guest',
    projects: [projectB, projectC],
    workDays: [],
    workSchedule: tempWorkSchedule // Temporary
});

const user3 = new User({
    id: 3,
    username: 'SamCreative',
    firstName: 'Sam',
    lastName: 'Lee',
    email: 'slee@example.com',
    password: 'password789',
    role: 'guest',
    projects: [projectA, projectC],
    workDays: [],
    workSchedule: tempWorkSchedule // Temporary
});

// Define work schedules
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

const workSchedule2 = new WorkSchedule({
    id: 2,
    user: user2,
    mondayHours: 7,
    tuesdayHours: 7,
    wednesdayHours: 7,
    thursdayHours: 7,
    fridayHours: 5,
    saturdayHours: 0,
    sundayHours: 0,
});

const workSchedule3 = new WorkSchedule({
    id: 3,
    user: user3,
    mondayHours: 6,
    tuesdayHours: 6,
    wednesdayHours: 8,
    thursdayHours: 8,
    fridayHours: 6,
    saturdayHours: 4,
    sundayHours: 0,
});

// Set work schedules to users
user1.setWorkSchedule(workSchedule1);
user2.setWorkSchedule(workSchedule2);
user3.setWorkSchedule(workSchedule3);

workSchedule1.setUser(user1);
workSchedule2.setUser(user2);
workSchedule3.setUser(user3);

// Assign projects to users and vice versa
user1.addProject(projectA);
user1.addProject(projectB);
projectA.addUser(user1);
projectB.addUser(user1);

user2.addProject(projectB);
user2.addProject(projectC);
projectB.addUser(user2);
projectC.addUser(user2);

user3.addProject(projectA);
user3.addProject(projectC);
projectA.addUser(user3);
projectC.addUser(user3);

// Create a work day with time blocks
const workDays: WorkDay[] = [];  // Array to store created work days
const timeBlocks: TimeBlock[] = [];  // Array to store created time blocks

const createWorkDayWithTimeBlocks = (user: User, date: string, timeBlockData: { start: string, end: string, project: Project }[]) => {
    const workDay = new WorkDay({
        id: Math.floor(Math.random() * 1000),
        expectedHours: user.getWorkSchedule().getExpectedHoursForDate(new Date(date)),
        achievedHours: timeBlockData.reduce((total, block) => total + ((new Date(block.end).getTime() - new Date(block.start).getTime()) / 3600000), 0),
        date: new Date(date),
        user,
        timeBlocks: []
    });

    const timeBlocksArray = timeBlockData.map((block, index) => {
        const timeBlock = new TimeBlock({
            id: Math.floor(Math.random() * 1000),
            startTime: new Date(block.start),
            endTime: new Date(block.end),
            project: block.project,
            workday: workDay
        });
        timeBlocks.push(timeBlock);  // Store created time blocks
        return timeBlock;
    });

    timeBlocksArray.forEach((timeBlock) => workDay.addTimeBlock(timeBlock));
    workDays.push(workDay);  // Store created work days
    user.addWorkDay(workDay);
};

// Create work days for users
createWorkDayWithTimeBlocks(user1, '2024-10-30', [
    { start: '2024-10-30T09:00:00', end: '2024-10-30T10:00:00', project: projectA },
    { start: '2024-10-30T10:30:00', end: '2024-10-30T12:00:00', project: projectB },
    { start: '2024-10-30T13:00:00', end: '2024-10-30T14:30:00', project: projectA },
]);

createWorkDayWithTimeBlocks(user2, '2024-10-30', [
    { start: '2024-10-30T08:00:00', end: '2024-10-30T09:30:00', project: projectB },
    { start: '2024-10-30T10:00:00', end: '2024-10-30T11:00:00', project: projectC },
    { start: '2024-10-30T13:30:00', end: '2024-10-30T15:00:00', project: projectB },
]);

createWorkDayWithTimeBlocks(user3, '2024-10-30', [
    { start: '2024-10-30T09:00:00', end: '2024-10-30T10:30:00', project: projectA },
    { start: '2024-10-30T11:00:00', end: '2024-10-30T12:30:00', project: projectC },
    { start: '2024-10-30T14:00:00', end: '2024-10-30T15:30:00', project: projectA },
]);

// Create current work day
const createCurrentWorkday = (user: User) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const timeBlockData = [
        { start: `${currentDate}T09:00:00`, end: `${currentDate}T12:00:00`, project: projectA },
        { start: `${currentDate}T13:00:00`, end: `${currentDate}T17:00:00`, project: projectB }
    ];
    createWorkDayWithTimeBlocks(user, currentDate, timeBlockData);
};

// Create current work days for each user
createCurrentWorkday(user1);
createCurrentWorkday(user2);
createCurrentWorkday(user3);

const users = [user1, user2, user3];
const projects = [projectA, projectB, projectC];
const workSchedules = [workSchedule1, workSchedule2, workSchedule3];

export {
    users,
    projects,
    workSchedules,
    workDays,
    timeBlocks
};
