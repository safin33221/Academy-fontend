"use server"
import { serverFetch } from "@/lib/serverFetch";

export const getSingleBatch = async (id: string) => {
    try {

        const res = await serverFetch.get(
            `/batch/${id}`);
        if (!res.ok) {
            return { data: null };
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Get me error:", error);
        return { data: null };
    }
};
