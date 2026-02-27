/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";

interface CreateBatchClassResponse {
    success: boolean;
    message: string;
    formData?: any;
}

export const createBatchClass = async (
    _prevState: unknown,
    formData: FormData
): Promise<CreateBatchClassResponse> => {
    let payload: any = {};

    try {
        // ================= BASIC FIELDS =================
        payload = {
            batchId: String(formData.get("batchId") || "").trim(),
            title: String(formData.get("title") || "").trim(),
            description: String(formData.get("description") || "").trim(),
            startTime: String(formData.get("startTime") || ""),
            duration: Number(formData.get("duration") || 0),
            classStatus: String(formData.get("classStatus") || "LIVE"),
        };

        // ================= VALIDATION =================
        if (
            !payload.batchId ||
            !payload.title ||
            !payload.startTime ||
            !Number.isFinite(payload.duration) ||
            payload.duration <= 0
        ) {
            return {
                success: false,
                message: "All required fields must be provided correctly",
                formData: payload,
            };
        }

        if (new Date(payload.startTime) < new Date()) {
            return {
                success: false,
                message: "Start time cannot be in the past",
                formData: payload,
            };
        }
        console.log({ payload });


        // ================= API CALL =================
        const res = await serverFetch.post("/batch-class", {
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result?.message || "Failed to create class",
                formData: payload,
            };
        }

        return {
            success: true,
            message: "Class created successfully",
        };
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        console.error("createBatchClass error:", error);

        return {
            success: false,
            message: error?.message || "Something went wrong",
            formData: payload,
        };
    }
};