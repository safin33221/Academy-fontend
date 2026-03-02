import { serverFetch } from "@/lib/serverFetch";

export const getPublicBatches = async () => {
    try {

        const res = await serverFetch.get(
            `/batch/public`);


        const result = await res.json();

        return result;
    } catch (error) {
        console.error("Get me error:", error);
        return { data: [] };
    }
};
