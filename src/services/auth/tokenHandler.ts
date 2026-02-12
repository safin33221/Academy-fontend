"use server"
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

export const setCookie = async (key: string, value: string, options: Partial<ResponseCookie>) => {
    const cookiesStore = await cookies()
    cookiesStore.set(key, value, options)
}
export const getCookies = async (key: string) => {
    const cookiesStore = await cookies()
    return cookiesStore.get(key)?.value || null

}
export const deleteCookies = async (key: string) => {
    const cookiesStore = await cookies()
    cookiesStore.delete(key)

}