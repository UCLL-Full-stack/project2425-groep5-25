type Role = 'admin' | 'student' | 'lecturer' | 'guest';

type Color = 'Red' | 'Green' | 'Blue' | 'Yellow' | 'Orange' | 'Purple';

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
