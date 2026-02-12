import { IUserRole } from "../user/user";

export interface INavItems {
    title: string,
    href: string;
    icon: string;
    badge?: string | number
    description?: string;
    role: IUserRole[]
}

export interface INavSection {
    title: string;
    items: INavItems[]
}