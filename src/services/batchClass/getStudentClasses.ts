/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";


export const getStudentClasses = async (batchSlug?: string) => {
    try {


        const res = await serverFetch.get(
            `/batch-class/student/${batchSlug}`);

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result?.message || "Failed to fetch classes",
            };
        }

        return result
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};