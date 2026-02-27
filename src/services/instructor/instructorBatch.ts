"use server"
import { serverFetch } from "@/lib/serverFetch";

export const getInstructorBatch = async () => {
    try {

        const res = await serverFetch.get(
            `/batch/instructors-batches`);

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Get instructors-batches error:", error);
        throw error;
    }
};
