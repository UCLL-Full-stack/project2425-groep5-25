type Role = 'admin' | 'student' | 'lecturer' | 'guest';

enum Color {
    Red = '#FF0000',
    Green = '#00FF00',
    Blue = '#0000FF',
    Yellow = '#FFFF00',
    Orange = '#FFA500',
    Purple = '#800080'
}

type ProjectInput = {
    name: string;
    color: Color;
    userIds?: number[];
};

type IdName = {
    id?: number;
    name: string;
}

export {
    Role,
    Color,
    ProjectInput,
    IdName
};
