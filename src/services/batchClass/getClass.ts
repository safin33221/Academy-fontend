/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";


export const getInstructorClasses = async (batchSlug: string) => {
    try {


        const res = await serverFetch.get(
            `/batch-class/instructor/${batchSlug}`);

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data?.message || "Failed to fetch classes",
            };
        }

        return {
            success: true,
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
};