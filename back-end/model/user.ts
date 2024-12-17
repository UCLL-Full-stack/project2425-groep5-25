import { User as PrismaUser } from '@prisma/client';
import { Role } from '../types';
import { ModelBase } from './modelBase';

export class User extends ModelBase {
    private userName: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private passWord: string;
    private role: Role;

    constructor(user: {
        id?: number;
        userName: string;
        firstName: string;
        lastName: string;
        email: string;
        passWord: string;
        role: Role;
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

    validate(user: {
        userName: string;
        firstName: string;
        lastName: string;
        email: string;
        passWord: string;
        role: Role;
    }) {
        if (!user.userName?.trim()) throw new Error('User validation: Username is required');
        if (user.userName?.trim().length < 6)
            throw new Error('User validation: Username must be at least 6 characters long');
        if (user.userName?.trim().length > 15)
            throw new Error('User validation: Username cannot be longer than 15 characters');
        if (!/^[a-zA-Z0-9_]+$/.test(user.userName))
            throw new Error(
                'User validation: Username can only contain letters, numbers, and underscores',
            );

        if (!user.firstName?.trim()) throw new Error('User validation: First name is required');
        if (user.firstName.trim().length < 2)
            throw new Error('User validation: First name needs to be at least 2 letters');
        if (user.firstName?.trim().length > 20)
            throw new Error('User validation: First name cannot be longer than 20 characters');
        if (user.firstName[0] !== user.firstName[0].toUpperCase())
            throw new Error('User validation: First name needs to start with a capital letter');
        if (!/^[\p{L}]+$/u.test(user.firstName))
            throw new Error(
                'User validation: First name can only contain letters (including accented characters)',
            );

        if (!user.lastName?.trim()) throw new Error('User validation: Last name is required');
        if (user.lastName.trim().length < 2)
            throw new Error('User validation: Last name needs to be at least 2 letters');
        if (user.lastName?.trim().length > 20)
            throw new Error('User validation: Last name cannot be longer than 20 characters');
        if (user.lastName[0] !== user.lastName[0].toUpperCase())
            throw new Error('User validation: Last name needs to start with a capital letter');
        if (!/^[\p{L}]+$/u.test(user.lastName))
            throw new Error(
                'User validation: Last name can only contain letters (including accented characters)',
            );

        if (!user.email?.trim()) throw new Error('User validation: Email is required');
        if (!user.email.includes('@'))
            throw new Error('User validation: Email must contain "@" symbol');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email))
            throw new Error('User validation: Email format is invalid');

        if (!user.passWord?.trim()) throw new Error('User validation: Password is required');
        if (user.passWord?.trim().length < 6)
            throw new Error('User validation: Password must be at least 6 characters long');
        if (!/[A-Z]/.test(user.passWord))
            throw new Error('User validation: Password must contain at least one uppercase letter');
        if (!/[a-z]/.test(user.passWord))
            throw new Error('User validation: Password must contain at least one lowercase letter');
        if (!/[0-9]/.test(user.passWord))
            throw new Error('User validation: Password must contain at least one number');
        if (!/[@$!%*?&#]/.test(user.passWord))
            throw new Error(
                'User validation: Password must contain at least one special character (@, $, !, %, *, ?, & or #)',
            );

        if (!user.role) throw new Error('User validation: Role is required');
    }

    equals(user: User): boolean {
        return (
            this.userName === user.getUserName() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail() &&
            this.passWord === user.getPassWord() &&
            this.role === user.getRole()
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
        createdDate,
        updatedDate,
    }: PrismaUser): User {
        return new User({
            id,
            userName,
            firstName,
            lastName,
            email,
            passWord,
            role: role as Role,
            createdDate: createdDate || undefined,
            updatedDate: updatedDate || undefined,
        });
    }
}
