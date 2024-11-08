import { Role } from '../types';
import { ModelBase } from './modelBase';
import { Project } from './project';
import { WorkDay } from './workDay';
import { WorkSchedule } from './workSchedule';

export class User extends ModelBase {
    private username: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private role: Role;
    private projects: Project[];
    private workDays?: WorkDay[];
    private workSchedule: WorkSchedule;

    constructor(user: {
        id?: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
        projects: Project[];
        workDays?: WorkDay[];
        workSchedule: WorkSchedule;
        createdDate?: Date;
        updatedDate?: Date;
    }) {
        super({ id: user.id, createdDate: user.createdDate, updatedDate: user.updatedDate });
        this.validate(user);

        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.projects = user.projects;
        this.workDays = user.workDays ?? [];
        this.workSchedule = user.workSchedule;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
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

    getPassword(): string {
        return this.password;
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

    setId(id: number): void {
        this.id = id;
    }

    setUsername(username: string): void {
        this.username = username;
    }
    
    setFirstName(firstName: string): void {
        this.firstName = firstName;
    }
    
    setLastName(lastName: string): void {
        this.lastName = lastName;
    }
    
    setEmail(email: string): void {
        this.email = email;
    }
    
    setPassword(password: string): void {
        this.password = password;
    }
    
    setRole(role: Role): void {
        this.role = role;
    }
    
    setProjects(projects: Project[]): void {
        this.projects = projects;
    }
    
    setWorkDays(workDays: WorkDay[]): void {
        this.workDays = workDays;
    }
    
    setWorkSchedule(workSchedule: WorkSchedule): void {
        this.workSchedule = workSchedule;
    }

    validate(user: {
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
        projects: Project[];
    }) {
        if (!user.username?.trim()) throw new Error('Username is required');
        if (!user.firstName?.trim()) throw new Error('First name is required');
        if (!user.lastName?.trim()) throw new Error('Last name is required');
        if (!user.email?.trim()) throw new Error('Email is required');
        if (!user.password?.trim()) throw new Error('Password is required');
        if (!user.role) throw new Error('Role is required');
        if (!user.projects || user.projects.length === 0) throw new Error('At least one project is required');
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole() &&
            this.projects.length === user.getProjects().length &&
            this.projects.every((project, index) => project.equals(user.getProjects()[index])) &&
            this.workDays?.length === user.getWorkDays().length &&
            this.workDays?.every((workDay, index) => workDay.equals(user.getWorkDays()[index])) &&
            this.workSchedule === user.getWorkSchedule()
        );
    }

    addProject(project: Project): void {
        if (!this.projects.find(p => p.getId() === project.getId())) {
            this.projects.push(project);
        }
    }

    removeProject(project: Project): void {
        this.projects = this.projects.filter(p => p.getId() !== project.getId());
    }

    addWorkDay(workDay: WorkDay): void {
        if (!this.workDays) {
            this.workDays = [];
        }

        if (!this.workDays.find(wd => wd.getId() === workDay.getId())) {
            this.workDays.push(workDay);
        }
    }

    removeWorkDay(workDay: WorkDay): void {
        if (this.workDays) {
            this.workDays = this.workDays.filter(wd => wd.getId() !== workDay.getId());
        }
    }
}
