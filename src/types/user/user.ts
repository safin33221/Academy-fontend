export enum IUserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    INSTRUCTOR = "INSTRUCTOR",
    STUDENT = "STUDENT",
    USER = "USER",
}


export interface IUser {
    id: string;

    // Identity
    name: string;
    email: string;
    phone: string;
    password: string;

    // Authorization
    role: IUserRole;

    // Account Status
    isVerified: boolean;
    isActive: boolean;
    isDeleted: boolean;
    isBlocked: boolean;
    isPremium: boolean;

    // Audit
    lastLoginAt: string | null; // ISO string
    createdAt: string;          // ISO string
    updatedAt: string;          // ISO string
}