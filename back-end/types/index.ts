type Role = 'admin' | 'student' | 'lecturer' | 'guest';

enum Color {
    Red = '#FF0000',
    Green = '#00FF00',
    Blue = '#0000FF',
    Yellow = '#FFFF00',
    Orange = '#FFA500',
    Purple = '#800080',
    Black = '#000000',
    White = '#FFFFFF',
}

type ProjectInput = {
    name: string;
    color: Color;
    userIds?: number[];
};

export {
    Role,
    Color,
    ProjectInput
};
