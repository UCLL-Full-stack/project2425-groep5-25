export abstract class ModelBase {
    protected id?: number;
    protected createdDate?: Date;
    protected updatedDate?: Date;

    constructor(base?: { id?: number; createdDate?: Date; updatedDate?: Date }) {
        this.id = base?.id;
        this.createdDate = base?.createdDate || new Date();
        this.updatedDate = base?.updatedDate || new Date();
    }
    
    getId(): number | undefined {
        return this.id;
    }

    getCreatedDate(): Date | undefined {
        return this.createdDate;
    }

    getUpdatedDate(): Date | undefined {
        return this.updatedDate;
    }

    setId(id: number): void {
        this.id = id;
    }

    setCreatedDate(date: Date): void {
        this.createdDate = date;
    }

    setUpdatedDate(date: Date): void {
        this.updatedDate = date;
    }
}
