"use server"
import { serverFetch } from "@/lib/serverFetch";

export const toggleUserBlockStatus = async (id: string) => {
    try {
        const res = await serverFetch.patch(`/users/toggle-user-block-status/${id}`);
        console.log({ id });
        return await res.json();
    } catch (error) {
        console.error("Soft delete user error:", error);
        throw error;
    }
};