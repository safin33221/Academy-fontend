"use server"
import { serverFetch } from "@/lib/serverFetch";

export const myPayment = async () => {
    try {

        const res = await serverFetch.get(
            `/payment/my-payment-history`);

        const result = await res.json();

        return result;
    } catch (error) {
        console.error("Get me error:", error);
        throw error;
    }
};