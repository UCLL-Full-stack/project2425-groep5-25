import { User as PrismaUser, WorkSchedule as PrismaWorkSchedule, Project as PrismaProject, Workday as PrismaWorkday } from '@prisma/client';
import { Role } from '../types';
import { ModelBase } from './modelBase';
import { Project } from './project';
import { WorkDay } from './workDay';
import { WorkSchedule } from './workSchedule';

export class User extends ModelBase {
    private userName: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private passWord: string;
    private role: Role;
    private projects: Project[];
    private workDays?: WorkDay[];
    private workSchedule: WorkSchedule;

    constructor(user: {
        id?: number;
        userName: string;
        firstName: string;
        lastName: string;
        email: string;
        passWord: string;
        role: Role;
        projects: Project[];
        workDays?: WorkDay[];
        workSchedule: WorkSchedule;
        createdDate?: Date;
        updatedDate?: Date;
    }) {
        super({ id: user.id, createdDate: user.createdDate, updatedDate: user.updatedDate });
        this.validate(user);

        this.userName = user.userName;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.passWord = user.passWord;
        this.role = user.role;
        this.projects = user.projects;
        this.workDays = user.workDays ?? [];
        this.workSchedule = user.workSchedule;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUserName(): string {
        return this.userName;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPassWord(): string {
        return this.passWord;
    }

    getRole(): Role {
        return this.role;
    }

    getProjects(): Project[] {
        return this.projects;
    }

    getWorkDays(): WorkDay[] {
        return this.workDays || [];
    }

    getWorkSchedule(): WorkSchedule {
        return this.workSchedule;
    }

    validate(user: {
        userName: string;
        firstName: string;
        lastName: string;
        email: string;
        passWord: string;
        role: Role;
        projects: Project[];
    }) {
        if (!user.userName?.trim()) throw new Error('Username is required');
        if (!user.firstName?.trim()) throw new Error('First name is required');
        if (!user.lastName?.trim()) throw new Error('Last name is required');
        if (!user.email?.trim()) throw new Error('Email is required');
        if (!user.passWord?.trim()) throw new Error('Password is required');
        if (!user.role) throw new Error('Role is required');
        if (!user.projects || user.projects.length === 0)
            throw new Error('At least one project is required');
    }

    equals(user: User): boolean {
        return (
            this.userName === user.getUserName() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail() &&
            this.passWord === user.getPassWord() &&
            this.role === user.getRole() &&
            this.projects.length === user.getProjects().length &&
            this.projects.every((project, index) => project.equals(user.getProjects()[index])) &&
            this.workDays?.length === user.getWorkDays().length &&
            this.workDays?.every((workDay, index) => workDay.equals(user.getWorkDays()[index])) &&
            this.workSchedule === user.getWorkSchedule()
        );
    }

    static from({
        id,
        userName,
        firstName,
        lastName,
        email,
        passWord,
        role,
        workSchedule,
        projects,
        workDays,
        createdDate,
        updatedDate
    }: PrismaUser & {
        workSchedule: PrismaWorkSchedule;
        projects: PrismaProject[];
        workDays: PrismaWorkday[];
    }) {
        return new User({
            id,
            userName,
            firstName,
            lastName,
            email,
            passWord,
            role: role as Role,
            workSchedule: WorkSchedule.from(workSchedule),
            projects: projects.map((project) => Project.from(project)),
            workDays: workDays.map((workDay) => WorkDay.from(workDay)),
            createdDate: createdDate || undefined,
            updatedDate: updatedDate || undefined,
        });
    }
}
