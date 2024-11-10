import { Color } from "../types";
import { ModelBase } from "./modelBase";
import { TimeBlock } from "./timeBlock";
import { User } from "./user";

export class Project extends ModelBase {
    private name: string;
    private color: Color;
    private timeBlocks?: TimeBlock[]
    
    constructor(project: {
        id?: number;
        name: string;
        color: Color;
        timeBlocks?: TimeBlock[];
        createdDate?: Date;
        updatedDate?: Date;
    }) {
        super({ id: project.id, createdDate: project.createdDate, updatedDate: project.updatedDate });
        this.validate(project);

        this.name = project.name;
        this.color = project.color;
        this.timeBlocks =  project.timeBlocks ?? [];
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

    getTimeBlocks(): TimeBlock[] {
        return this.timeBlocks || [];
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
    
    setTimeBlocks(timeBlocks: TimeBlock[]): void {
        this.timeBlocks = timeBlocks;
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
            this.color === project.getColor()
        );
    }

    addTimeBlock(timeBlock: TimeBlock): void {
        if (!this.timeBlocks) {
            this.timeBlocks = [];
        }

        if (!this.timeBlocks.find(u => u.getId() === timeBlock.getId())) {
            this.timeBlocks.push(timeBlock);
        }
    }

    removeTimeBlock(timeBlock: TimeBlock): void {
        if (this.timeBlocks) {
            this.timeBlocks = this.timeBlocks.filter(u => u.getId() !== timeBlock.getId());
        }
    }
}