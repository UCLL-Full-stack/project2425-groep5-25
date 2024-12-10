import { User as PrismaUser, WorkSchedule as PrismaWorkSchedule } from '@prisma/client';
import { ModelBase } from './modelBase';
import { User } from './user';

export class WorkSchedule extends ModelBase {
    private mondayHours: number;
    private tuesdayHours: number;
    private wednesdayHours: number;
    private thursdayHours: number;
    private fridayHours: number;
    private saturdayHours: number;
    private sundayHours: number;
    private user: User;

    constructor(workSchedule: {
        id?: number;
        mondayHours: number;
        tuesdayHours: number;
        wednesdayHours: number;
        thursdayHours: number;
        fridayHours: number;
        saturdayHours: number;
        sundayHours: number;
        user: User;
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
        this.user = workSchedule.user;
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

    getUser(): User {
        return this.user;
    }

    validate(workSchedule: {
        mondayHours: number;
        tuesdayHours: number;
        wednesdayHours: number;
        thursdayHours: number;
        fridayHours: number;
        saturdayHours: number;
        sundayHours: number;
        user: User;
    }) {
        if (workSchedule.mondayHours < 0)
            throw new Error('WorkSchedule validation: Monday hours must be a non-negative number');

        if (workSchedule.tuesdayHours < 0)
            throw new Error('WorkSchedule validation: Tuesday hours must be a non-negative number');

        if (workSchedule.wednesdayHours < 0)
            throw new Error(
                'WorkSchedule validation: Wednesday hours must be a non-negative number',
            );

        if (workSchedule.thursdayHours < 0)
            throw new Error(
                'WorkSchedule validation: Thursday hours must be a non-negative number',
            );

        if (workSchedule.fridayHours < 0)
            throw new Error('WorkSchedule validation: Friday hours must be a non-negative number');

        if (workSchedule.saturdayHours < 0)
            throw new Error(
                'WorkSchedule validation: Saturday hours must be a non-negative number',
            );

        if (workSchedule.sundayHours < 0)
            throw new Error('WorkSchedule validation: Sunday hours must be a non-negative number');

        if (!workSchedule.user || !workSchedule.user.getId())
            throw new Error('WorkSchedule validation: User must be valid');

        const totalHours =
            workSchedule.mondayHours +
            workSchedule.tuesdayHours +
            workSchedule.wednesdayHours +
            workSchedule.thursdayHours +
            workSchedule.fridayHours +
            workSchedule.saturdayHours +
            workSchedule.sundayHours;

        if (totalHours > 40)
            throw new Error(
                'WorkSchedule validation: Total work hours cannot exceed 40 hours per week',
            );
    }

    equals(workSchedule: WorkSchedule): boolean {
        return (
            this.mondayHours === workSchedule.getMondayHours() &&
            this.tuesdayHours === workSchedule.getTuesdayHours() &&
            this.wednesdayHours === workSchedule.getWednesdayHours() &&
            this.thursdayHours === workSchedule.getThursdayHours() &&
            this.fridayHours === workSchedule.getFridayHours() &&
            this.saturdayHours === workSchedule.getSaturdayHours() &&
            this.sundayHours === workSchedule.getSundayHours() &&
            this.user.equals(workSchedule.getUser())
        );
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
        user,
        createdDate,
        updatedDate,
    }: PrismaWorkSchedule & { user: PrismaUser }): WorkSchedule {
        return new WorkSchedule({
            id,
            mondayHours,
            tuesdayHours,
            wednesdayHours,
            thursdayHours,
            fridayHours,
            saturdayHours,
            sundayHours,
            user: User.from(user),
            createdDate: createdDate || undefined,
            updatedDate: updatedDate || undefined,
        });
    }
}
