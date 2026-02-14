import { serverFetch } from "@/lib/serverFetch";

export const createCourse = async () => {
    try {

        const res = await serverFetch.post(
            `/course}`);

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Get me error:", error);
        throw error;
    }
};