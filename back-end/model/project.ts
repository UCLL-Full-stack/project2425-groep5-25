import { Project as PrismaProject, TimeBlock as PrismaTimeBlock } from '@prisma/client';
import { Color } from '../types';
import { ModelBase } from './modelBase';
import { TimeBlock } from './timeBlock';
import { User } from './user';

export class Project extends ModelBase {
    private name: string;
    private color: Color;

    constructor(project: {
        id?: number;
        name: string;
        color: Color;
        createdDate: Date;
        updatedDate: Date;
    }) {
        super({
            id: project.id,
            createdDate: project.createdDate,
            updatedDate: project.updatedDate,
        });
        this.validate(project);

        this.name = project.name;
        this.color = project.color;
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

    validate(project: { name: string; color: Color; users?: User[] }) {
        if (!project.name) throw new Error('Project name is required');
        if (!project.color) throw new Error('Project color is required');
        if (project.name.trim().length < 6)
            throw new Error('Project name must be at least 6 characters long');

        if (project.users) {
            const allNumbers = project.users.every((user) => typeof user === 'number');
            if (!allNumbers) throw new Error('All usersIds must be numbers');

            const uniqueUsers = new Set(project.users);
            if (uniqueUsers.size !== project.users.length)
                throw new Error('UserId list contains duplicate values');
        }
    }

    equals(project: Project): boolean {
        return this.name === project.getName() && this.color === project.getColor();
    }

    static from({ id, name, color, createdDate, updatedDate }: PrismaProject) {
        return new Project({
            id,
            name,
            color,
            createdDate: createdDate,
            updatedDate: updatedDate,
        });
    }
}