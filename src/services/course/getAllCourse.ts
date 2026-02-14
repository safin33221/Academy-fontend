import { serverFetch } from "@/lib/serverFetch";

export const getAllCourse = async (queryString?: string) => {
    try {

        const res = await serverFetch.get(
            `/course?${queryString ?? ""}`);

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Get me error:", error);
        throw error;
    }
};