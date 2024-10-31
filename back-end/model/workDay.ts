import { TimeBlock } from "./timeBlock";
import { User } from "./user";

export class WorkDay {
    private id?: number;
    private expectedHours: number;
    private achievedHours?: number;
    private date: Date;
    private user: User;
    private timeBlocks?: TimeBlock[];

    constructor(workDay: { 
        id?: number;
        expectedHours: number;
        achievedHours?: number;
        date: Date;
        user: User;
        timeBlocks?: TimeBlock[];
     }) {
        this.validate(workDay);

        this.id = workDay.id;
        this.expectedHours = workDay.expectedHours;
        this.achievedHours = workDay.achievedHours;
        this.date = workDay.date;
        this.user = workDay.user;
        this.timeBlocks = workDay.timeBlocks;
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

    getUser(): User {
        return this.user;
    }

    getTimeBlocks(): TimeBlock[] {
        return this.timeBlocks || [];
    }

    setExpectedHours(expectedHours: number): void {
        this.expectedHours = expectedHours;
    }
    
    setAchievedHours(achievedHours: number | undefined): void {
        this.achievedHours = achievedHours;
    }
    
    setDate(date: Date): void {
        this.date = date;
    }
    
    setUser(user: User): void {
        this.user = user;
    }
    
    setTimeBlocks(timeBlocks: TimeBlock[]): void {
        this.timeBlocks = timeBlocks;
    }    

    validate(workDay: {
        expectedHours: number;
        date: Date;
        user: User;
    }) {
        if (workDay.expectedHours < 0) throw new Error('Expected hours must be a non-negative number');
        if (!workDay.user) throw new Error('User is required');
        if (!workDay.date) throw new Error('Valid date is required');
    }

    equals(workDay: WorkDay): boolean {
        return (
            this.expectedHours === workDay.getExpectedHours() &&
            this.achievedHours === workDay.getAchievedHours() &&
            this.date.getTime() === workDay.getDate().getTime() &&
            this.user.equals(workDay.getUser()) &&
            this.timeBlocks?.length === workDay.getTimeBlocks().length &&
            this.timeBlocks?.every((tb, index) => tb.equals(workDay.getTimeBlocks()[index]))
        );
    }

    addTimeBlock(timeBlock: TimeBlock): void {
        if (!this.timeBlocks) {
            this.timeBlocks = [];
        }
        this.timeBlocks.push(timeBlock);
    }

    removeTimeBlock(timeBlockId: number): void {
        if (this.timeBlocks) {
            this.timeBlocks = this.timeBlocks.filter(tb => tb.getId() !== timeBlockId);
        }
    }
}
