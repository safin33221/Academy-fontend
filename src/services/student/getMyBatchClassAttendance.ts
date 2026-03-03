/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getMyBatchClassAttendance = async (batchId: string) => {
    try {
        if (!batchId) {
            return { success: false, message: "Class ID is required" };
        }

        const res = await serverFetch.get(
            `/attendance/batches/${batchId}/my-attendance`
        );
        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data?.message || "Failed to fetch class attendance",
            };
        }

        return { success: true, data: data?.data };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong",
        };
    }
};


