"use server"
import { serverFetch } from "@/lib/serverFetch";

export const getMyCourses = async () => {
    try {
        const res = await serverFetch.get("/course/my-courses");
        const result = await res.json();
        return result;

    } catch (error) {
        console.error("Get me error:", error);
        throw error;
    }
};