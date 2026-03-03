"use server"
import { serverFetch } from "@/lib/serverFetch";

export const getAdminDashboardData = async () => {
    try {

        const res = await serverFetch.get(
            `/dashboard/overview`);

        if (!res.ok) {
            return null;
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Admin dashboard fetch error:", error);
        return null;
    }
};
