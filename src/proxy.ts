import { NextResponse, type NextRequest } from 'next/server';
import { IUserRole } from './types/user/user';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getDefaultDashboard, getRouteOwner, isAuthRoute } from './lib/auth-utils';
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;


    // read toke from cookies
    const accessToken = request.cookies.get("accessToken")?.value;

    let userRole: IUserRole | null = null

    if (accessToken) {
        try {
            const decoded = jwt.verify(
                accessToken,
                process.env.NEXT_ACCESS_SECRET as string
            ) as JwtPayload;

            userRole = decoded.role as IUserRole
        } catch {
            const response = NextResponse.redirect(
                new URL("/login", request.url)
            )
            response.cookies.delete("accessToken")
            response.cookies.delete("refreshToken")
            return response

        }
    }

    const routeOwner = getRouteOwner(pathname)
    const isAuth = isAuthRoute(pathname)

    if (accessToken && isAuth) {
        return NextResponse.redirect(
            new URL(getDefaultDashboard(userRole!), request.url)
        );
    }

    if (routeOwner === null) {
        return NextResponse.next();
    }

    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (routeOwner === "COMMON") {
        return NextResponse.next();
    }

    if (
        routeOwner === "ADMIN" ||
        routeOwner === "STUDENT" ||
        routeOwner === "INSTRUCTOR" ||
        routeOwner === "SUPER_ADMIN"
    ) {
        if (userRole !== routeOwner) {
            return NextResponse.redirect(
                new URL(getDefaultDashboard(userRole!), request.url)
            );
        }
    }

    return NextResponse.next();
}



export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
    ],
};