import { Color } from "../types";
import { User } from "./user";

export class Project {
    private id?: number;
    private name: string;
    private color: Color;
    private users?: User[];

    constructor(project: {
        id?: number;
        name: string;
        color: Color;
        users?: User[];       
    }) {
        this.validate(project);

        this.id = project.id;
        this.name = project.name;
        this.color = project.color;
        this.users = project.users;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getColor(): Color {
        return this.color;
    }

    getUsers(): User[] {
        return this.users || [];
    }

    setId(id: number): void {
        this.id = id;
    }

    setName(name: string): void {
        this.name = name;
    }
    
    setColor(color: Color): void {
        this.color = color;
    }
    
    setUsers(users: User[]): void {
        this.users = users;
    }    

    validate(project: {
        name: string;
        color: Color;
        users?: User[];
    }) {
        if (!project.name) throw new Error('Project name is required');
        if (!project.color) throw new Error('Project color is required');
        if (project.name.trim().length < 6) throw new Error('Project name must be at least 6 characters long');
        if (!Object.values(Color).includes(project.color)) throw new Error('Invalid color value');

        if (project.users) {
            const allNumbers = project.users.every(user => typeof user === 'number');
            if (!allNumbers) throw new Error('All usersIds must be numbers');
    
            const uniqueUsers = new Set(project.users);
            if (uniqueUsers.size !== project.users.length) throw new Error('UserId list contains duplicate values');
        }
    }

    equals(project: Project): boolean {
        return (
            this.name === project.getName() &&
            this.color === project.getColor() &&
            this.users?.length === project.getUsers().length &&
            this.users?.every((user, index) => user.equals(project.getUsers()[index]))
        );
    }

    addUser(user: User): void {
        if (!this.users) {
            this.users = [];
        }

        if (!this.users.find(u => u.getId() === user.getId())) {
            this.users.push(user);
        }
    }

    removeUser(user: User): void {
        if (this.users) {
            this.users = this.users.filter(u => u.getId() !== user.getId());
        }
    }
}