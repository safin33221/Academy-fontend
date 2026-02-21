import { serverFetch } from "@/lib/serverFetch";

export const getAllBatch = async () => {
    try {

        const res = await serverFetch.get(
            `/batch`);

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Get me error:", error);
        throw error;
    }
};