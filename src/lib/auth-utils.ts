import { IUserRole } from "@/types/user/user";

export const getDefaultDashboard = (role: IUserRole): string => {
    switch (role) {

        case "ADMIN":
            return "/admin/dashboard"
        case "INSTRUCTOR":
            return "/instructor/dashboard"
        case "STUDENT":
            return "/dashboard"
        case "SUPER_ADMIN":
            return "/admin/dashboard"
        case "USER":
            return "/dashboard"
        default:
            return "/login"
    }
}