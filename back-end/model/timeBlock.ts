import {
    Project as ProjectPrisma,
    TimeBlock as TimeBlockPrisma,
    Workday as WorkDayPrisma,
} from '@prisma/client';
import { ModelBase } from './modelBase';
import { Project } from './project';
import { WorkDay } from './workDay';

export class TimeBlock extends ModelBase {
    private startTime: Date;
    private endTime?: Date;
    private project: Project;
    private workDay: WorkDay;

    constructor(timeBlock: {
        id?: number;
        startTime: Date;
        endTime?: Date;
        project: Project;
        workDay: WorkDay;
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
        this.workDay = timeBlock.workDay;
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

    getWorkDay(): WorkDay {
        return this.workDay;
    }

    validate(timeBlock: { startTime: Date; project: Project; workDay: WorkDay }) {
        if (!timeBlock.startTime) throw new Error('Start time is required');
        if (!timeBlock.project) throw new Error('Project is required');
        if (!timeBlock.workDay) throw new Error('WorkDay is required');
    }

    equals(timeBlock: TimeBlock): boolean {
        return (
            this.startTime.getTime() === timeBlock.getStartTime().getTime() &&
            this.project.equals(timeBlock.getProject()) &&
            this.workDay.equals(timeBlock.getWorkDay())
        );
    }

    static from({
        id,
        startTime,
        endTime,
        project,
        workDay,
        createdDate,
        updatedDate,
    }: TimeBlockPrisma & { project: ProjectPrisma; workDay: WorkDayPrisma }) {
        return new TimeBlock({
            id,
            startTime,
            endTime: endTime ?? undefined,
            project: Project.from(project),
            workDay: WorkDay.from(workDay),
            createdDate: createdDate || undefined,
            updatedDate: updatedDate || undefined,
        });
    }
}
