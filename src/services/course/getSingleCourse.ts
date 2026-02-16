"use server"
import { serverFetch } from "@/lib/serverFetch";

export const getSingleCourse = async (slug?: string) => {
    try {

        const res = await serverFetch.get(
            `/course/${slug}`);

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Get me error:", error);
        throw error;
    }
};