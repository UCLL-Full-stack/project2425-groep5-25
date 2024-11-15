import { ModelBase } from './modelBase';
import { WorkSchedule as PrismaWorkSchedule } from '@prisma/client';

export class WorkSchedule extends ModelBase {
    private mondayHours: number;
    private tuesdayHours: number;
    private wednesdayHours: number;
    private thursdayHours: number;
    private fridayHours: number;
    private saturdayHours: number;
    private sundayHours: number;

    constructor(workSchedule: {
        id?: number;
        mondayHours: number;
        tuesdayHours: number;
        wednesdayHours: number;
        thursdayHours: number;
        fridayHours: number;
        saturdayHours: number;
        sundayHours: number;
        createdDate?: Date;
        updatedDate?: Date;
    }) {
        super({
            id: workSchedule.id,
            createdDate: workSchedule.createdDate,
            updatedDate: workSchedule.updatedDate,
        });
        this.validate(workSchedule);

        this.mondayHours = workSchedule.mondayHours;
        this.tuesdayHours = workSchedule.tuesdayHours;
        this.wednesdayHours = workSchedule.wednesdayHours;
        this.thursdayHours = workSchedule.thursdayHours;
        this.fridayHours = workSchedule.fridayHours;
        this.saturdayHours = workSchedule.saturdayHours;
        this.sundayHours = workSchedule.sundayHours;
    }

    getId(): number | undefined {
        return this.id;
    }

    getMondayHours(): number {
        return this.mondayHours;
    }

    getTuesdayHours(): number {
        return this.tuesdayHours;
    }

    getWednesdayHours(): number {
        return this.wednesdayHours;
    }

    getThursdayHours(): number {
        return this.thursdayHours;
    }

    getFridayHours(): number {
        return this.fridayHours;
    }

    getSaturdayHours(): number {
        return this.saturdayHours;
    }

    getSundayHours(): number {
        return this.sundayHours;
    }

    validate(workSchedule: {
        mondayHours: number;
        tuesdayHours: number;
        wednesdayHours: number;
        thursdayHours: number;
        fridayHours: number;
        saturdayHours: number;
        sundayHours: number;
    }) {
        if (workSchedule.mondayHours < 0)
            throw new Error('Monday hours must be a non-negative number');
        if (workSchedule.tuesdayHours < 0)
            throw new Error('Tuesday hours must be a non-negative number');
        if (workSchedule.wednesdayHours < 0)
            throw new Error('Wednesday hours must be a non-negative number');
        if (workSchedule.thursdayHours < 0)
            throw new Error('Thursday hours must be a non-negative number');
        if (workSchedule.fridayHours < 0)
            throw new Error('Friday hours must be a non-negative number');
        if (workSchedule.saturdayHours < 0)
            throw new Error('Saturday hours must be a non-negative number');
        if (workSchedule.sundayHours < 0)
            throw new Error('Sunday hours must be a non-negative number');
    }

    equals(workSchedule: WorkSchedule): boolean {
        return (
            this.mondayHours === workSchedule.getMondayHours() &&
            this.tuesdayHours === workSchedule.getTuesdayHours() &&
            this.wednesdayHours === workSchedule.getWednesdayHours() &&
            this.thursdayHours === workSchedule.getThursdayHours() &&
            this.fridayHours === workSchedule.getFridayHours() &&
            this.saturdayHours === workSchedule.getSaturdayHours() &&
            this.sundayHours === workSchedule.getSundayHours()
        );
    }

    getExpectedHoursForDate(date: Date): number {
        const dayOfWeek = date.getDay();

        switch (dayOfWeek) {
            case 0: // Sunday
                return this.sundayHours;
            case 1: // Monday
                return this.mondayHours;
            case 2: // Tuesday
                return this.tuesdayHours;
            case 3: // Wednesday
                return this.wednesdayHours;
            case 4: // Thursday
                return this.thursdayHours;
            case 5: // Friday
                return this.fridayHours;
            case 6: // Saturday
                return this.saturdayHours;
            default:
                throw new Error('Invalid day of the week');
        }
    }

    static from({
        id,
        mondayHours,
        tuesdayHours,
        wednesdayHours,
        thursdayHours,
        fridayHours,
        saturdayHours,
        sundayHours,
        createdDate,
        updatedDate,
    }: PrismaWorkSchedule) {
        return new WorkSchedule({
            id,
            mondayHours,
            tuesdayHours,
            wednesdayHours,
            thursdayHours,
            fridayHours,
            saturdayHours,
            sundayHours,
            createdDate: createdDate,
            updatedDate: updatedDate
        });
    }
}
