import { serverFetch } from "@/lib/serverFetch";

export const getAllBatch = async () => {
    try {

        const res = await serverFetch.get(
            `/batch`);
        if (!res.ok) {
            return { data: [] };
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Get me error:", error);
        return { data: [] };
    }
};
