import { Project as ProjectPrisma, TimeBlock as TimeBlockPrisma } from '@prisma/client';
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

    validate(timeBlock: { startTime: Date; project: Project }) {
        if (!timeBlock.startTime) throw new Error('Start time is required');
        if (!timeBlock.project) throw new Error('Project is required');
    }

    equals(timeBlock: TimeBlock): boolean {
        return (
            this.startTime.getTime() === timeBlock.getStartTime().getTime() &&
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
    }: TimeBlockPrisma & { project: ProjectPrisma }) {
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
