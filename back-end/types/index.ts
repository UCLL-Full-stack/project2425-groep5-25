type Role = 'admin' | 'student' | 'lecturer' | 'guest';

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
    name: string;
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
    token: string;
    username: string;
    fullname: string;
    role: Role;
};

type ProjectInput = {
    id?: number;
    name?: string;
    color?: Color;
};

type ProjectToUserInput = {
    projectId?: number;
    userIds?: number[];
};

export { Role, Color, ProjectInput, IdName, UserInput, AuthenticationResponse, ProjectToUserInput };
