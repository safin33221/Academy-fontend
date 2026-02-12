import { redirect } from "next/navigation"
import { deleteCookies } from "./tokenHandler"

export const logout = async () => {
    await deleteCookies("accessToken")
    await deleteCookies("refreshToken")
    redirect("/")
} 