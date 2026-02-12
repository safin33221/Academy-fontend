import { INavSection } from "@/types/dashboard/NavItem";
import { IUserRole } from "@/types/user/user";
import { getDefaultDashboard } from "./auth-utils";

/**
 * Common Navigation (All Roles)
 */
export const getCommonNavItems = (role: IUserRole): INavSection[] => {
    const defaultDashboard = getDefaultDashboard(role);

    return [
        {
            title: "Dashboard",
            items: [
                {
                    title: "My Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    role: ["ADMIN", "INSTRUCTOR", "STUDENT", "SUPER_ADMIN", "USER"],
                },
                {
                    title: "My Profile",
                    href: "/my-profile",
                    icon: "User",
                    role: ["ADMIN", "INSTRUCTOR", "STUDENT", "SUPER_ADMIN", "USER"],
                },
            ],
        },
    ];
};

/**
 * Super Admin Navigation
 */
export const superAdminNavItems: INavSection[] = [
    {
        title: "System Management",
        items: [
            {
                title: "Manage Admins",
                href: "/dashboard/super-admin/admins",
                icon: "Shield",
                role: ["SUPER_ADMIN"],
            },
            {
                title: "All Users",
                href: "/dashboard/super-admin/users",
                icon: "Users",
                role: ["SUPER_ADMIN"],
            },
        ],
    },
];

/**
 * Admin Navigation
 */
export const adminNavItems: INavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "All Users",
                href: "/admin/dashboard/users",
                icon: "Users",
                role: ["ADMIN", "SUPER_ADMIN"],
            },
            {
                title: "Instructors",
                href: "/admin/dashboard/instructors",
                icon: "GraduationCap",
                role: ["ADMIN", "SUPER_ADMIN"],
            },
            {
                title: "Students",
                href: "/admin/dashboard/students",
                icon: "UserCheck",
                role: ["ADMIN", "SUPER_ADMIN"],
            },
        ],
    },
    {
        title: "Course Management",
        items: [
            {
                title: "All Courses",
                href: "/admin/dashboard/courses",
                icon: "BookOpen",
                role: ["ADMIN", "SUPER_ADMIN"],
            },
            {
                title: "Categories",
                href: "/admin/dashboard/categories",
                icon: "Layers",
                role: ["ADMIN", "SUPER_ADMIN"],
            },
            {
                title: "Batch",
                href: "/admin/dashboard/batch",
                icon: "Layers",
                role: ["ADMIN", "SUPER_ADMIN"],
            },
        ],
    },
];

/**
 * Instructor Navigation
 */
export const instructorNavItems: INavSection[] = [
    {
        title: "Course Management",
        items: [
            {
                title: "My Courses",
                href: "/dashboard/instructor/courses",
                icon: "BookOpen",
                role: ["INSTRUCTOR"],
            },
            {
                title: "Create Course",
                href: "/dashboard/instructor/courses/create",
                icon: "PlusCircle",
                role: ["INSTRUCTOR"],
            },
        ],
    },
];

/**
 * Student Navigation
 */
export const studentNavItems: INavSection[] = [
    {
        title: "Learning",
        items: [
            {
                title: "My Courses",
                href: "/dashboard/student/courses",
                icon: "BookOpen",
                role: ["STUDENT"],
            },
            {
                title: "Payments",
                href: "/dashboard/student/payments",
                icon: "CreditCard",
                role: ["STUDENT"],
            },
        ],
    },
];

/**
 * Role-based Nav Generator
 */
export const getNavItemByRole = (role: IUserRole): INavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "SUPER_ADMIN":
            return [...commonNavItems, ...superAdminNavItems];

        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];

        case "INSTRUCTOR":
            return [...commonNavItems, ...instructorNavItems];

        case "STUDENT":
            return [...commonNavItems, ...studentNavItems];

        default:
            return commonNavItems;
    }
};