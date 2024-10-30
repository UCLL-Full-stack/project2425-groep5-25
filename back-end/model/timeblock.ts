import { Project } from "./project";
import { WorkDay } from "./workDay";

export class TimeBlock {
    private id?: number;
    private startTime: Date;
    private endTime?: Date;
    private project: Project;
    private workday: WorkDay;

    constructor(timeBlock: {
        id?: number;
        startTime: Date;
        endTime?: Date;
        project: Project;
        workday: WorkDay;
    }) {
        this.validate(timeBlock);

        this.id = timeBlock.id;
        this.startTime = timeBlock.startTime;
        this.endTime = timeBlock.endTime;
        this.project = timeBlock.project;
        this.workday = timeBlock.workday;
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
        return this.workday;
    }

    setStartTime(startTime: Date): void {
        this.startTime = startTime;
    }
    
    setEndTime(endTime: Date | undefined): void {
        this.endTime = endTime;
    }
    
    setProject(project: Project): void {
        this.project = project;
    }
    
    setWorkDay(workDay: WorkDay): void {
        this.workday = workDay;
    }    

    validate(timeBlock: {
        startTime: Date;
        project: Project;
        workday: WorkDay;
    }) {
        if (!timeBlock.startTime) throw new Error('Start time is required');
        if (!timeBlock.project) throw new Error('Project is required');
        if (!timeBlock.workday) throw new Error('WorkDay is required');
    }

    equals(timeBlock: TimeBlock): boolean {
        return (
            this.startTime.getTime() === timeBlock.getStartTime().getTime() &&
            this.project.equals(timeBlock.getProject()) &&
            this.workday.equals(timeBlock.getWorkDay())
        );
    }
}
