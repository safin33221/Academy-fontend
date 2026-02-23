"use server"
import { serverFetch } from "@/lib/serverFetch";

export const initiatePayment = async (batchId: string) => {
    try {

        const res = await serverFetch.post("/payment/initiate", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ batchId }),
        });


        const result = await res.json();
        console.log(result);
        if (!res.ok) {
            throw new Error("Failed to initiate payment");
        }

        return result.data
    } catch (error) {
        console.error("Get me error:", error);
        throw error;
    }
};