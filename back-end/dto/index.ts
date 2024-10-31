import { Color, Role } from '../types';

export class DtoBase {
    id?: number;

    constructor(base: { id?: number }) {
        this.id = base.id;
    }
}

export class ProjectDto extends DtoBase {
    name?: string;
    color?: Color;
    users?: UserDto[];

    constructor(project: { 
        id?: number; 
        name?: string; 
        color?: Color;
        users?: UserDto[] 
    }) {
        super(project);
        this.name = project.name;
        this.color = project.color;
        this.users = project.users;
    }
}

export class TimeBlockDto extends DtoBase {
    startTime?: Date;
    endTime?: Date;
    project?: ProjectDto;
    projectId?: number;
    workday?: WorkDayDto;
    workdayId?: number;

    constructor(timeBlock: {
        id?: number;
        startTime?: Date;
        endTime?: Date;
        project?: ProjectDto;
        projectId?: number;
        workday?: WorkDayDto;
        workdayId?: number;
    }) {
        super(timeBlock);
        this.startTime = timeBlock.startTime;
        this.endTime = timeBlock.endTime;
        this.project = timeBlock.project;
        this.projectId = timeBlock.projectId;
        this.workday = timeBlock.workday;
        this.workdayId = timeBlock.workdayId;
    }
}

export class UserDto extends DtoBase {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: Role;
    projects?: ProjectDto[];
    workDays?: WorkDayDto[];
    workSchedule?: WorkScheduleDto;
    workScheduleId?: number;

    constructor(user: {
        id?: number;
        username?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        role?: Role;
        projects?: ProjectDto[];
        workDays?: WorkDayDto[];
        workSchedule?: WorkScheduleDto;
        workScheduleId?: number;
    }) {
        super(user);
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.projects = user.projects;
        this.workDays = user.workDays;
        this.workSchedule = user.workSchedule;
        this.workScheduleId = user.workScheduleId;
    }
}

export class WorkDayDto extends DtoBase {
    expectedHours?: number;
    achievedHours?: number;
    date?: Date;
    user?: UserDto;
    userId?: number;
    timeBlocks?: TimeBlockDto[];

    constructor(workDay: {
        id?: number;
        expectedHours?: number;
        achievedHours?: number;
        date?: Date;
        user?: UserDto;
        userId?: number;
        timeBlocks?: TimeBlockDto[];
    }) {
        super(workDay);
        this.expectedHours = workDay.expectedHours;
        this.achievedHours = workDay.achievedHours;
        this.date = workDay.date;
        this.user = workDay.user;
        this.userId = workDay.userId;
        this.timeBlocks = workDay.timeBlocks;
    }
}

export class WorkScheduleDto extends DtoBase {
    user?: UserDto;
    userId?: number;
    mondayHours?: number;
    tuesdayHours?: number;
    wednesdayHours?: number;
    thursdayHours?: number;
    fridayHours?: number;
    saturdayHours?: number;
    sundayHours?: number;

    constructor(workSchedule: {
        id?: number;
        user?: UserDto;
        userId?: number;
        mondayHours?: number;
        tuesdayHours?: number;
        wednesdayHours?: number;
        thursdayHours?: number;
        fridayHours?: number;
        saturdayHours?: number;
        sundayHours?: number;
    }) {
        super(workSchedule);
        this.user = workSchedule.user;
        this.userId = workSchedule.userId;
        this.mondayHours = workSchedule.mondayHours;
        this.tuesdayHours = workSchedule.tuesdayHours;
        this.wednesdayHours = workSchedule.wednesdayHours;
        this.thursdayHours = workSchedule.thursdayHours;
        this.fridayHours = workSchedule.fridayHours;
        this.saturdayHours = workSchedule.saturdayHours;
        this.sundayHours = workSchedule.sundayHours;
    }
}
