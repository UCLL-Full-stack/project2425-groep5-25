import { ModelBase } from "./modelBase";
import { Project } from "./project";
import { WorkDay } from "./workDay";

export class TimeBlock extends ModelBase {
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
        createdDate?: Date;
        updatedDate?: Date;
    }) {
        super({ id: timeBlock.id, createdDate: timeBlock.createdDate, updatedDate: timeBlock.updatedDate });
        this.validate(timeBlock);

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

    setId(id: number): void {
        this.id = id;
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
