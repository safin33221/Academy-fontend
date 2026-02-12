export type IUserRole =
    | "SUPER_ADMIN"
    | "ADMIN"
    | "INSTRUCTOR"
    | "STUDENT"
    | "USER";

export interface IUser {
    id: string;
    name: string;
    email: string;
    role: IUserRole;
    phone: string;
    createdAt: string;   // ISO date string
    updatedAt: string;   // ISO date string
}