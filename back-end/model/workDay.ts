import { Workday as PrismaWorkday} from '@prisma/client';
import { ModelBase } from './modelBase';
import { TimeBlock } from './timeBlock';

export class WorkDay extends ModelBase {
    private expectedHours: number;
    private achievedHours?: number;
    private date: Date;
    
    constructor(workDay: {
        id?: number;
        expectedHours: number;
        achievedHours?: number;
        date: Date;
        createdDate?: Date;
        updatedDate?: Date;
    }) {
        super({
            id: workDay.id,
            createdDate: workDay.createdDate,
            updatedDate: workDay.updatedDate,
        });
        this.validate(workDay);

        this.expectedHours = workDay.expectedHours;
        this.achievedHours = workDay.achievedHours;
        this.date = workDay.date;
    }

    getId(): number | undefined {
        return this.id;
    }

    getExpectedHours(): number {
        return this.expectedHours;
    }

    getAchievedHours(): number | undefined {
        return this.achievedHours;
    }

    getDate(): Date {
        return this.date;
    }

    validate(workDay: { expectedHours: number; date: Date; }) {
        if (workDay.expectedHours < 0)
            throw new Error('Expected hours must be a non-negative number');
        if (!workDay.date) throw new Error('Valid date is required');
    }

    equals(workDay: WorkDay): boolean {
        return (
            this.expectedHours === workDay.getExpectedHours() &&
            this.achievedHours === workDay.getAchievedHours() &&
            this.date.getTime() === workDay.getDate().getTime()            
        );
    }

    static from({
        id,
        expectedHours,
        achievedHours,
        date,
        createdDate,
        updatedDate,
    }: PrismaWorkday) {
        return new WorkDay({
            id,
            expectedHours,
            achievedHours: achievedHours ?? undefined,
            date,
            createdDate: createdDate || undefined,
            updatedDate: updatedDate || undefined,
        });
    }
}
