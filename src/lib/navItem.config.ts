import { INavSection } from "@/types/dashboard/NavItem";
import { IUserRole } from "@/types/user/user";
import { getDefaultDashboard } from "./auth-utils";

export const getCommonNavItems = (role: IUserRole): INavSection[] => {
    const defaultDashboard = getDefaultDashboard(role)
    return [
        {
            title: "Dashboard",
            items: [
                {
                    title: "My Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    role: ["ADMIN", "INSTRUCTOR", "STUDENT", "SUPER_ADMIN", "USER"]
                },
                {
                    title: "My Profile",
                    href: "/my-profile",
                    icon: "User",
                    role: ["ADMIN", "INSTRUCTOR", "STUDENT", "SUPER_ADMIN", "USER"]
                },

            ]
        }
    ]
}


export const getNavItemByRole = (role: IUserRole) => {
    const commonNavItem = getCommonNavItems(role)

    switch (role) {
        case "ADMIN":
            return [...commonNavItem]
        case "INSTRUCTOR":
            return [...commonNavItem]
        case "STUDENT":
            return [...commonNavItem]
        case "SUPER_ADMIN":
            return [...commonNavItem]
        default:
            return commonNavItem
    }
}