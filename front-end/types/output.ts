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
