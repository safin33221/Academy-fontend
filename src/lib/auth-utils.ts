import { IUserRole } from "@/types/user/user";

//config

export type RouteConfig = {
    exact: string[];
    patterns: RegExp[]
}

export const authRoutes: string[] = [
    "/login",
    "/register",
    "/forgot-password",
];


export const commonProtectedRoutes: RouteConfig = {
    exact: [
        "/my-profile",
        "/settings",
        "/change-password",
        "/reset-password",
    ],
    patterns: [],
};


export const adminProtectedRoutes: RouteConfig = {
    exact: [],
    patterns: [/^\/admin(\/.*)?$/],
};
export const instructorProtectedRoutes: RouteConfig = {
    exact: [],
    patterns: [/^\/instructor(\/.*)?$/],
};
export const studentProtectedRoutes: RouteConfig = {
    exact: [],
    patterns: [/^\/dashboard(\/.*)?$/],
};


export const isAuthRoute = (pathname: string): boolean => {
    return authRoutes.includes(pathname);
};
//get Route Owner

const isRouteMatches = (
    pathname: string,
    routes: RouteConfig
) => {

    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern) => pattern.test(pathname))
}

export const getRouteOwner =
    (pathName: string):
        "ADMIN" | "STUDENT" | "INSTRUCTOR" | "COMMON" | "SUPER_ADMIN" | "USER" | null => {
        if (isRouteMatches(pathName, adminProtectedRoutes)) return "ADMIN"
        if (isRouteMatches(pathName, studentProtectedRoutes)) return "STUDENT"
        if (isRouteMatches(pathName, instructorProtectedRoutes)) return "INSTRUCTOR"
        if (isRouteMatches(pathName, commonProtectedRoutes)) return "COMMON"

        return null
    }







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
            return "/course"
        default:
            return "/login"
    }
}