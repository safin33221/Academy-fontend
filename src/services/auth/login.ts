/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/serverFetch";
import { parse } from 'cookie';
import { setCookie } from "./tokenHandler";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { redirect } from "next/navigation";
export const login = async (
    _prevState: unknown,
    formData: FormData
): Promise<{
    success: boolean;
    message: string;
    data?: any;
    redirectTo?: string;
}> => {

    try {

        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        const payload = {
            email: String(formData.get("email") || "").trim(),
            password: String(formData.get("password") || ""),
        };

        // Basic validation
        if (!payload.email || !payload.password) {
            return {
                success: false,
                message: "All required fields must be filled",
            };
        }



        // // TODO: Save to DB or call API here
        const res = await serverFetch.post('/auth/login', {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        const result = await res.json();



        if (!res.ok) {
            return {
                success: false,
                message: result?.message || "failed to login account",
            };
        }

        // receive token from backend
        const setCookieHeaders = res.headers.getSetCookie();
        // console.log({ setCookieHeaders });



        if (setCookieHeaders && setCookieHeaders.length > 1) {
            setCookieHeaders.forEach((cookie: string) => {

                const parseCookie = parse(cookie)
                if (parseCookie['accessToken']) {
                    accessTokenObject = parseCookie
                }
                if (parseCookie['refreshToken']) {
                    refreshTokenObject = parseCookie
                }
            })
        } else {
            throw new Error("No Set-Cookie header found");
        }
        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        const isProd = process.env.NODE_ENV === "production";
        await setCookie("accessToken", accessTokenObject.accessToken, {
            httpOnly: true,
            secure: isProd,               // ❗ FIX
            sameSite: isProd ? "none" : "lax", // ❗ FIX
            path: "/",
            maxAge: Number(accessTokenObject["Max-Age"]) || 3600,
        });

        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            path: "/",
            maxAge: Number(accessTokenObject["Max-Age"]) || 7776000,
        });


        const decodedToken: JwtPayload | string = jwt.decode(accessTokenObject.accessToken) as JwtPayload;

        if (!decodedToken || typeof decodedToken === "string") {
            throw new Error("Invalid token format");
        }

        redirect('/')









    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error("register error:", error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }

}