import { NextResponse, type NextRequest } from 'next/server';
import { IUserRole } from './types/user/user';
import jwt, { JwtPayload } from 'jsonwebtoken';
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
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: '/about/:path*',
}