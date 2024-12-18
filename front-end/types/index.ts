export type ProjectInput = {
    id?: number;
    name?: string;
    color?: string;
    userIds?: number[];
};

export enum Color {
    Red = '#FF0000',
    Green = '#00FF00',
    Blue = '#0000FF',
    Yellow = '#FFFF00',
    Orange = '#FFA500',
    Purple = '#800080',
    Gray = '#000000',
}

export type IdName = {
    id?: number;
    name: string;
};

export type ErrorLabelMessage = {
    label: string;
    message: string;
};

export type ProjectToUserInput = {
    projectId?: number;
    userIds?: number[];
};

export type UserInput = {
    id?: number;
    userName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    passWord?: string;
};

export type TimeBlockInput = {
    id?: number;
    projectId?: number;
};

/* OUTPUT VALUES */

export type WorkDayOutput = {
    id?: number;
    date: Date;
    expectedHours: number;
    achievedHours?: number;
    user: UserOutput;
    timeBlocks?: TimeBlockOutput[];
};

export type TimeBlockOutput = {
    id?: number;
    startTime: Date;
    endTime?: Date;
    project: ProjectOutput;
};

export type ProjectOutput = {
    id?: number;
    name: string;
    color: string;
    users?: UserOutput[];
};

export type UserOutput = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    passWord?: string;
    role: string;
};
