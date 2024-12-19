import { Project as PrismaProject, User as PrismaUser } from '@prisma/client';
import { Color } from '../types';
import { ModelBase } from './modelBase';
import { User } from './user';

export class Project extends ModelBase {
    private name: string;
    private color: Color;
    private users: User[];

    constructor(project: {
        id?: number;
        name: string;
        color: Color;
        users: User[];
        createdDate?: Date;
        updatedDate?: Date;
    }) {
        super({
            id: project.id,
            createdDate: project.createdDate,
            updatedDate: project.updatedDate,
        });
        this.validate(project);

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
        return this.users;
    }

    validate(project: { name: string; color: Color; users?: User[] }) {
        if (!project.name?.trim()) throw new Error('Project validation: Project name is required');
        if (project.name?.trim().length < 6)
            throw new Error('Project validation: Project name must be at least 6 characters long');
        if (project.name?.trim().length > 30)
            throw new Error('Project validation: Project name cannot be longer than 30 characters');
        if (!/^[a-zA-Z0-9 ]+$/.test(project.name)) {
            throw new Error(
                'Project validation: Project name can only contain letters, numbers, and spaces',
            );
        }

        if (!project.color) throw new Error('Project validation: Project color is required');
        if (!Object.values(Color).includes(project.color))
            throw new Error('Project validation: Please select a valid project color.');

        if (project.users) {
            const userIds = new Set();
            for (const user of project.users) {
                if (!user.getId()) {
                    throw new Error(`Project validation: User does not exist!`);
                }
                if (userIds.has(user.getId())) {
                    throw new Error(`Project validation: Duplicate user found!`);
                }
                userIds.add(user.getId());
            }
        }
    }

    equals(project: Project): boolean {
        return (
            this.name === project.getName() &&
            this.color === project.getColor() &&
            this.users.every((user, index) => user.equals(project.getUsers()[index]))
        );
    }

    static from({
        id,
        name,
        color,
        users,
        createdDate,
        updatedDate,
    }: PrismaProject & { users: PrismaUser[] }): Project {
        return new Project({
            id,
            name,
            color: color as Color,
            users: users.map((user) => User.from(user)),
            createdDate: createdDate || undefined,
            updatedDate: updatedDate || undefined,
        });
    }
}
