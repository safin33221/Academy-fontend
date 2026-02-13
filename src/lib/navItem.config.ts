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
                    role: [
                        IUserRole.ADMIN,
                        IUserRole.INSTRUCTOR,
                        IUserRole.STUDENT,
                        IUserRole.SUPER_ADMIN,
                        IUserRole.USER,
                    ],
                },
                {
                    title: "My Profile",
                    href: "/my-profile",
                    icon: "User",
                    role: [
                        IUserRole.ADMIN,
                        IUserRole.INSTRUCTOR,
                        IUserRole.STUDENT,
                        IUserRole.SUPER_ADMIN,
                        IUserRole.USER,
                    ],
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
                role: [IUserRole.SUPER_ADMIN],
            },
            {
                title: "All Users",
                href: "/dashboard/super-admin/users",
                icon: "Users",
                role: [IUserRole.SUPER_ADMIN],
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
                role: [IUserRole.ADMIN, IUserRole.SUPER_ADMIN],
            },
            {
                title: "Instructors",
                href: "/admin/dashboard/instructors",
                icon: "GraduationCap",
                role: [IUserRole.ADMIN, IUserRole.SUPER_ADMIN],
            },
            {
                title: "Students",
                href: "/admin/dashboard/students",
                icon: "UserCheck",
                role: [IUserRole.ADMIN, IUserRole.SUPER_ADMIN],
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
                role: [IUserRole.ADMIN, IUserRole.SUPER_ADMIN],
            },
            {
                title: "Categories",
                href: "/admin/dashboard/categories",
                icon: "Layers",
                role: [IUserRole.ADMIN, IUserRole.SUPER_ADMIN],
            },
            {
                title: "Batch",
                href: "/admin/dashboard/batch",
                icon: "Layers",
                role: [IUserRole.ADMIN, IUserRole.SUPER_ADMIN],
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
                role: [IUserRole.INSTRUCTOR],
            },
            {
                title: "Create Course",
                href: "/dashboard/instructor/courses/create",
                icon: "PlusCircle",
                role: [IUserRole.INSTRUCTOR],
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
                role: [IUserRole.STUDENT],
            },
            {
                title: "Payments",
                href: "/dashboard/student/payments",
                icon: "CreditCard",
                role: [IUserRole.STUDENT],
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
        case IUserRole.SUPER_ADMIN:
            return [...commonNavItems, ...superAdminNavItems];

        case IUserRole.ADMIN:
            return [...commonNavItems, ...adminNavItems];

        case IUserRole.INSTRUCTOR:
            return [...commonNavItems, ...instructorNavItems];

        case IUserRole.STUDENT:
            return [...commonNavItems, ...studentNavItems];

        default:
            return commonNavItems;
    }
};
