type Role = 'admin' | 'student' | 'lecturer' | 'guest';

type Color = 'Red' | 'Green' | 'Blue' | 'Yellow' | 'Orange' | 'Purple' | 'Gray';

type ProjectInput = {
    name: string;
    color: Color;
    userIds?: number[];
};

type IdName = {
    id?: number;
    name: string;
}

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

export {
    Role,
    Color,
    ProjectInput,
    IdName,
    UserInput,
    AuthenticationResponse
};
