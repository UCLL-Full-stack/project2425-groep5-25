import { Project } from "../model/project";
import { TimeBlock } from "../model/timeBlock";
import { User } from "../model/user";
import { WorkDay } from "../model/workDay";
import { WorkSchedule } from "../model/workSchedule";
import { Color } from "../types";

// Define projects
const projects: Project[] = [
    new Project({
        id: 1,
        name: 'Project Alpha',
        color: Color.Red,
        users: []
    }),
    new Project({
        id: 2,
        name: 'Project Beta',
        color: Color.Green,
        users: []
    }),
    new Project({
        id: 3,
        name: 'Project Gamma',
        color: Color.Blue,
        users: []
    }),
    new Project({
        id: 4,
        name: 'Project Delta',
        color: Color.Yellow,
        users: []
    }),
    new Project({
        id: 5,
        name: 'Project Epsilon',
        color: Color.Orange,
        users: []
    })
];

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
const users: User[] = [
    new User({
        id: 1,
        username: 'JohnnySinister',
        firstName: 'John',
        lastName: 'Doe',
        email: 'jdoe@example.com',
        password: 'password123',
        role: 'admin',
        projects: [projects[0], projects[1]],
        workDays: [],
        workSchedule: tempWorkSchedule
    }),
    new User({
        id: 2,
        username: 'JaneDynamic',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jsmith@example.com',
        password: 'password456',
        role: 'guest',
        projects: [projects[0], projects[1], projects[2]],
        workDays: [],
        workSchedule: tempWorkSchedule
    }),
    new User({
        id: 3,
        username: 'SamCreative',
        firstName: 'Sam',
        lastName: 'Lee',
        email: 'slee@example.com',
        password: 'password789',
        role: 'guest',
        projects: [projects[0], projects[2]],
        workDays: [],
        workSchedule: tempWorkSchedule
    }),
    new User({
        id: 4,
        username: 'AlexBuilder',
        firstName: 'Alex',
        lastName: 'Johnson',
        email: 'ajohnson@example.com',
        password: 'password321',
        role: 'admin',
        projects: [projects[0], projects[3], projects[4]],
        workDays: [],
        workSchedule: tempWorkSchedule
    }),
    new User({
        id: 5,
        username: 'ChrisInnovator',
        firstName: 'Chris',
        lastName: 'Brown',
        email: 'cbrown@example.com',
        password: 'password654',
        role: 'student',
        projects: [projects[0], projects[1], projects[4]],
        workDays: [],
        workSchedule: tempWorkSchedule
    }),
    new User({
        id: 6,
        username: 'TaylorVisionary',
        firstName: 'Taylor',
        lastName: 'Green',
        email: 'tgreen@example.com',
        password: 'password987',
        role: 'guest',
        projects: [projects[0], projects[2], projects[3]],
        workDays: [],
        workSchedule: tempWorkSchedule
    })
];

// Define work schedules
const workSchedules: WorkSchedule[] = [
    new WorkSchedule({
        id: 1,
        user: users[0],
        mondayHours: 8,
        tuesdayHours: 8,
        wednesdayHours: 8,
        thursdayHours: 8,
        fridayHours: 8,
        saturdayHours: 0,
        sundayHours: 0,
    }),
    new WorkSchedule({
        id: 2,
        user: users[1],
        mondayHours: 7,
        tuesdayHours: 7,
        wednesdayHours: 7,
        thursdayHours: 7,
        fridayHours: 5,
        saturdayHours: 0,
        sundayHours: 0,
    }),
    new WorkSchedule({
        id: 3,
        user: users[2],
        mondayHours: 6,
        tuesdayHours: 6,
        wednesdayHours: 8,
        thursdayHours: 8,
        fridayHours: 6,
        saturdayHours: 4,
        sundayHours: 0,
    }),
    new WorkSchedule({
        id: 4,
        user: users[3],
        mondayHours: 8,
        tuesdayHours: 8,
        wednesdayHours: 6,
        thursdayHours: 6,
        fridayHours: 4,
        saturdayHours: 0,
        sundayHours: 0,
    }),
    new WorkSchedule({
        id: 5,
        user: users[4],
        mondayHours: 7,
        tuesdayHours: 7,
        wednesdayHours: 7,
        thursdayHours: 8,
        fridayHours: 8,
        saturdayHours: 0,
        sundayHours: 0,
    }),
    new WorkSchedule({
        id: 6,
        user: users[5],
        mondayHours: 6,
        tuesdayHours: 5,
        wednesdayHours: 8,
        thursdayHours: 8,
        fridayHours: 7,
        saturdayHours: 3,
        sundayHours: 0,
    })
];

// Set each user's work schedule
users[0].setWorkSchedule(workSchedules[0]);
users[1].setWorkSchedule(workSchedules[1]);
users[2].setWorkSchedule(workSchedules[2]);
users[3].setWorkSchedule(workSchedules[3]);
users[4].setWorkSchedule(workSchedules[4]);
users[5].setWorkSchedule(workSchedules[5]);

// Set user for each work schedule
workSchedules[0].setUser(users[0]);
workSchedules[1].setUser(users[1]);
workSchedules[2].setUser(users[2]);
workSchedules[3].setUser(users[3]);
workSchedules[4].setUser(users[4]);
workSchedules[5].setUser(users[5]);

// Set up project and user relationships
users[0].addProject(projects[0]);
users[0].addProject(projects[1]);
projects[0].addUser(users[0]);
projects[1].addUser(users[0]);

users[1].addProject(projects[0]);
users[1].addProject(projects[1]);
users[1].addProject(projects[2]);
projects[0].addUser(users[1]);
projects[1].addUser(users[1]);
projects[2].addUser(users[1]);

users[2].addProject(projects[0]);
users[2].addProject(projects[2]);
projects[0].addUser(users[2]);
projects[2].addUser(users[2]);

users[3].addProject(projects[0]);
users[3].addProject(projects[3]);
users[3].addProject(projects[4]);
projects[0].addUser(users[3]);
projects[3].addUser(users[3]);
projects[4].addUser(users[3]);

users[4].addProject(projects[0]);
users[4].addProject(projects[1]);
users[4].addProject(projects[4]);
projects[0].addUser(users[4]);
projects[1].addUser(users[4]);
projects[4].addUser(users[4]);

users[5].addProject(projects[0]);
users[5].addProject(projects[2]);
users[5].addProject(projects[3]);
projects[0].addUser(users[5]);
projects[2].addUser(users[5]);
projects[3].addUser(users[5]);

const workDays: WorkDay[] = [];
const timeBlocks: TimeBlock[] = [];

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
        timeBlocks.push(timeBlock);
        return timeBlock;
    });

    timeBlocksArray.forEach((timeBlock) => workDay.addTimeBlock(timeBlock));
    workDays.push(workDay);
    user.addWorkDay(workDay);
};

// Create work days for users
createWorkDayWithTimeBlocks(users[0], '2024-10-30', [
    { start: '2024-10-30T09:00:00', end: '2024-10-30T10:00:00', project: projects[0] },
    { start: '2024-10-30T10:30:00', end: '2024-10-30T12:00:00', project: projects[1] },
    { start: '2024-10-30T13:00:00', end: '2024-10-30T14:30:00', project: projects[0] },
]);

createWorkDayWithTimeBlocks(users[1], '2024-10-30', [
    { start: '2024-10-30T08:00:00', end: '2024-10-30T09:30:00', project: projects[1] },
    { start: '2024-10-30T10:00:00', end: '2024-10-30T11:00:00', project: projects[2] },
    { start: '2024-10-30T13:30:00', end: '2024-10-30T15:00:00', project: projects[1] },
]);

createWorkDayWithTimeBlocks(users[2], '2024-10-30', [
    { start: '2024-10-30T09:00:00', end: '2024-10-30T10:30:00', project: projects[0] },
    { start: '2024-10-30T11:00:00', end: '2024-10-30T12:30:00', project: projects[2] },
    { start: '2024-10-30T14:00:00', end: '2024-10-30T15:30:00', project: projects[0] },
]);

createWorkDayWithTimeBlocks(users[3], '2024-10-30', [
    { start: '2024-10-30T08:00:00', end: '2024-10-30T10:00:00', project: projects[3] },
    { start: '2024-10-30T10:30:00', end: '2024-10-30T12:30:00', project: projects[4] },
    { start: '2024-10-30T13:00:00', end: '2024-10-30T15:00:00', project: projects[3] },
]);

createWorkDayWithTimeBlocks(users[4], '2024-10-30', [
    { start: '2024-10-30T09:00:00', end: '2024-10-30T11:00:00', project: projects[1] },
    { start: '2024-10-30T11:30:00', end: '2024-10-30T13:00:00', project: projects[4] },
    { start: '2024-10-30T13:30:00', end: '2024-10-30T15:00:00', project: projects[1] },
]);

createWorkDayWithTimeBlocks(users[5], '2024-10-30', [
    { start: '2024-10-30T08:00:00', end: '2024-10-30T09:30:00', project: projects[2] },
    { start: '2024-10-30T10:00:00', end: '2024-10-30T11:30:00', project: projects[3] },
    { start: '2024-10-30T13:00:00', end: '2024-10-30T14:30:00', project: projects[2] },
]);

// Create current work day
const createCurrentWorkday = (user: User) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const timeBlockData = [
        { start: `${currentDate}T09:00:00`, end: `${currentDate}T12:00:00`, project: projects[0] }
    ];
    createWorkDayWithTimeBlocks(user, currentDate, timeBlockData);
};

// Create current workday for each user
users.forEach(createCurrentWorkday);

export {
    users,
    projects,
    workSchedules,
    workDays,
    timeBlocks
};
