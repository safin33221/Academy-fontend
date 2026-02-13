import { serverFetch } from "@/lib/serverFetch";

export const getAllUsers = async (queryString?: string) => {
    try {

        const res = await serverFetch.get(
            `/users?${queryString ?? ""}`);

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Get me error:", error);
        throw error;
    }
};