import {
    Project as PrismaProject,
    TimeBlock as PrismaTimeBlock,
    User as UserPrisma,
    Workday as PrismaWorkday,
    WorkSchedule as PrismaWorkSchedule,
} from '@prisma/client';
import { ModelBase } from './modelBase';
import { TimeBlock } from './timeBlock';
import { User } from './user';

export class WorkDay extends ModelBase {
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

    getTimeBlocks(): TimeBlock[] | undefined {
        return this.timeBlocks;
    }

    validate(workDay: { expectedHours: number; date: Date }) {
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
        user,
        timeBlocks,
        createdDate,
        updatedDate,
    }: PrismaWorkday & {
        user: UserPrisma & { workSchedule: PrismaWorkSchedule };
        timeBlocks: (PrismaTimeBlock & {
            user: UserPrisma & { workSchedule: PrismaWorkSchedule };
            project: PrismaProject;
        })[];
    }) {
        return new WorkDay({
            id,
            expectedHours,
            achievedHours: achievedHours ?? undefined,
            date,
            user: User.from(user),
            timeBlocks: timeBlocks.map((timeBlock) => TimeBlock.from(timeBlock)),
            createdDate: createdDate || undefined,
            updatedDate: updatedDate || undefined,
        });
    }
}
