import { serverFetch } from "@/lib/serverFetch";

export const getMe = async () => {
    try {
        const res = await serverFetch.get("/users/get-me");
        if (!res.ok) {
            return null;
        }
        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Get me error:", error);
        return null;
    }
};
