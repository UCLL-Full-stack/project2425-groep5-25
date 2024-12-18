type Role = 'admin' | 'user' | 'hr';

enum Color {
    Red = '#FF0000',
    Green = '#00FF00',
    Blue = '#0000FF',
    Yellow = '#FFFF00',
    Orange = '#FFA500',
    Purple = '#800080',
    Gray = '#000000',
}

type IdName = {
    id?: number;
    name?: string;
};

type UserInput = {
    id?: number;
    userName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: Role;
    passWord?: string;
};

type AuthenticationResponse = {
    userId?: number;
    token?: string;
    userName?: string;
    fullName?: string;
    role?: Role;
};

type ProjectInput = {
    id?: number;
    name?: string;
    color?: Color;
    userIds?: number[];
};

type ProjectToUserInput = {
    projectId?: number;
    userIds?: number[];
};

type JwtToken = {
    userId?: number;
    role?: Role;
};

const projectNames = {
    DEFAULT_PROJECT: 'General',
};

type TimeBlockInput = {
    id?: number;
    projectId?: number;
};

export {
    AuthenticationResponse,
    Color,
    IdName,
    JwtToken,
    ProjectInput,
    projectNames,
    ProjectToUserInput,
    Role,
    TimeBlockInput,
    UserInput,
};
