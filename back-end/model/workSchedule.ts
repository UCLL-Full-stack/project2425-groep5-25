import { User } from "./user";

export class WorkSchedule {
    private id?: number;
    private user: User;
    private mondayHours: number;
    private tuesdayHours: number;
    private wednesdayHours: number;
    private thursdayHours: number;
    private fridayHours: number;
    private saturdayHours: number;
    private sundayHours: number;

    constructor(workSchedule: {
        id?: number;
        user: User;
        mondayHours: number;
        tuesdayHours: number;
        wednesdayHours: number;
        thursdayHours: number;
        fridayHours: number;
        saturdayHours: number;
        sundayHours: number;
    }) {
        this.validate(workSchedule);

        this.id = workSchedule.id;
        this.user = workSchedule.user;
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

    getUser(): User {
        return this.user;
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

    setUser(user: User): void {
        this.user = user;
    }
    
    setMondayHours(mondayHours: number): void {
        this.mondayHours = mondayHours;
    }
    
    setTuesdayHours(tuesdayHours: number): void {
        this.tuesdayHours = tuesdayHours;
    }
    
    setWednesdayHours(wednesdayHours: number): void {
        this.wednesdayHours = wednesdayHours;
    }
    
    setThursdayHours(thursdayHours: number): void {
        this.thursdayHours = thursdayHours;
    }
    
    setFridayHours(fridayHours: number): void {
        this.fridayHours = fridayHours;
    }
    
    setSaturdayHours(saturdayHours: number): void {
        this.saturdayHours = saturdayHours;
    }
    
    setSundayHours(sundayHours: number): void {
        this.sundayHours = sundayHours;
    }    

    validate(workSchedule: {
        user: User;
        mondayHours: number;
        tuesdayHours: number;
        wednesdayHours: number;
        thursdayHours: number;
        fridayHours: number;
        saturdayHours: number;
        sundayHours: number;
    }) {
        if (!workSchedule.user) throw new Error('User is required');        
        if (workSchedule.mondayHours < 0) throw new Error('Monday hours must be a non-negative number');
        if (workSchedule.tuesdayHours < 0) throw new Error('Tuesday hours must be a non-negative number');
        if (workSchedule.wednesdayHours < 0) throw new Error('Wednesday hours must be a non-negative number');
        if (workSchedule.thursdayHours < 0) throw new Error('Thursday hours must be a non-negative number');
        if (workSchedule.fridayHours < 0) throw new Error('Friday hours must be a non-negative number');
        if (workSchedule.saturdayHours < 0) throw new Error('Saturday hours must be a non-negative number');
        if (workSchedule.sundayHours < 0) throw new Error('Sunday hours must be a non-negative number');
    }

    equals(workSchedule: WorkSchedule): boolean {
        return (
            this.user.equals(workSchedule.getUser()) &&
            this.mondayHours === workSchedule.getMondayHours() &&
            this.tuesdayHours === workSchedule.getTuesdayHours() &&
            this.wednesdayHours === workSchedule.getWednesdayHours() &&
            this.thursdayHours === workSchedule.getThursdayHours() &&
            this.fridayHours === workSchedule.getFridayHours() &&
            this.saturdayHours === workSchedule.getSaturdayHours() &&
            this.sundayHours === workSchedule.getSundayHours()
        );
    }
}