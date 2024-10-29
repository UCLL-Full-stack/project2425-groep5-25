export class TimeBlock {
    private id?: number;
    private startTime: Date;
    private endTime?: Date;

    constructor(timeBlock: { id?: number; startTime: Date; endTime?: Date }) {
        this.id = timeBlock.id;
        this.startTime = timeBlock.startTime;
        this.endTime = timeBlock.endTime;
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

    equals(timeBlock: TimeBlock): boolean {
        return (
            this.startTime === timeBlock.getStartTime() && this.endTime === timeBlock.getEndTime()
        );
    }
}
