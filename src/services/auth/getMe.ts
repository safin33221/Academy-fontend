import { serverFetch } from "@/lib/serverFetch";

export const getMe = async () => {
    try {
        const res = await serverFetch.get("/users/get-me");
        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Get me error:", error);
        throw error;
    }
};