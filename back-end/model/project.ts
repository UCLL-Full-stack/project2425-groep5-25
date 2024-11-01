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
    }) {
        if (!project.name?.trim()) throw new Error('Project name is required');        
        if (!project.color) throw new Error('Project color is required');        
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