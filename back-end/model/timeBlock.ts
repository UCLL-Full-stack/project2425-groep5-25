import {
    Project as PrismaProject,
    TimeBlock as PrismaTimeBlock,
    User as PrismaUser,
} from '@prisma/client';
import { ModelBase } from './modelBase';
import { Project } from './project';

export class TimeBlock extends ModelBase {
    private startTime: Date;
    private endTime?: Date;
    private project: Project;

    constructor(timeBlock: {
        id?: number;
        startTime: Date;
        endTime?: Date;
        project: Project;
        createdDate?: Date;
        updatedDate?: Date;
    }) {
        super({
            id: timeBlock.id,
            createdDate: timeBlock.createdDate,
            updatedDate: timeBlock.updatedDate,
        });
        this.validate(timeBlock);

        this.startTime = timeBlock.startTime;
        this.endTime = timeBlock.endTime;
        this.project = timeBlock.project;
    }

    getId(): number | undefined {
        return this.id;
    }

    getStartTime(): Date {
        return this.startTime;
    }

    getEndTime(): Date | undefined {
        return this.endTime;
    }

    getProject(): Project {
        return this.project;
    }

    validate(timeBlock: { startTime: Date; endTime?: Date; project: Project }) {
        if (!timeBlock.startTime) throw new Error('TimeBlock validation: Start time is required');
        if (!timeBlock.project) throw new Error('TimeBlock validation: Project is required');

        if (timeBlock.endTime !== undefined) {
            if (timeBlock.startTime > timeBlock.endTime) {
                throw new Error('TimeBlock validation: Start date cannot be after end date');
            }
        }
    }

    equals(timeBlock: TimeBlock): boolean {
        return (
            this.startTime === timeBlock.getStartTime() &&
            this.endTime === timeBlock.getEndTime() &&
            this.project.equals(timeBlock.getProject())
        );
    }

    static from({
        id,
        startTime,
        endTime,
        project,
        createdDate,
        updatedDate,
    }: PrismaTimeBlock & { project: PrismaProject & { users: PrismaUser[] } }): TimeBlock {
        return new TimeBlock({
            id,
            startTime,
            endTime: endTime ?? undefined,
            project: Project.from(project),
            createdDate: createdDate || undefined,
            updatedDate: updatedDate || undefined,
        });
    }
}
