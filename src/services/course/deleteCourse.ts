"use server"
import { serverFetch } from "@/lib/serverFetch";

export const courseSoftDelete = async (id: string) => {
    try {
        const res = await serverFetch.patch(`/course/soft-delete/${id}`);
        return await res.json();
    } catch (error) {
        console.error("Soft delete user error:", error);
        throw error;
    }
};