export type ProjectOutput = {
    id?: number;
    name?: string;
    color?: String;
    users?: UserOutput[];
};

export type UserOutput = {
    id?: number;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    email?: string;
    userName?: string;
    passWord?: string;
    role?: string;
};

export type ProjectInput = {
    id?: number;
    name?: string;
    color?: String;
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
    id?: number | null;
    userName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    passWord?: string;
};
