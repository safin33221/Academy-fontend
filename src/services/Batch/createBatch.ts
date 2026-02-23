/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";

interface CreateBatchResponse {
    success: boolean;
    message: string;
    formData?: any;
}

export const createBatch = async (
    _prevState: unknown,
    formData: FormData
): Promise<CreateBatchResponse> => {
    let payload: any = {}; // ✅ define outside try

    try {
        const image = formData.get("image") as File | null;

        // ================= BASIC FIELDS =================
        payload = {
            name: String(formData.get("name") || "").trim(),
            courseId: String(formData.get("courseId") || "").trim(),

            enrollmentStart: String(
                formData.get("enrollmentStart") || ""
            ),
            enrollmentEnd: String(
                formData.get("enrollmentEnd") || ""
            ),

            startDate: String(formData.get("startDate") || ""),
            endDate: String(formData.get("endDate") || ""),

            maxStudents: Number(formData.get("maxStudents") || 0),

            price: formData.get("price")
                ? Number(formData.get("price"))
                : null,

            isActive: String(formData.get("isActive")) === "true",

            status: String(formData.get("status") || "UPCOMING"),
        };

        // ================= VALIDATION =================
        if (
            !payload.name ||
            !payload.courseId ||
            !payload.startDate ||
            !payload.enrollmentStart ||
            !Number.isFinite(payload.maxStudents) ||
            payload.maxStudents <= 0
        ) {
            return {
                success: false,
                message: "All required fields must be provided correctly",
                formData: payload,
            };
        }

        if (
            payload.enrollmentEnd &&
            new Date(payload.enrollmentEnd) <
            new Date(payload.enrollmentStart)
        ) {
            return {
                success: false,
                message:
                    "Enrollment end date must be after enrollment start date",
                formData: payload,
            };
        }

        // ================= BUILD MULTIPART =================
        const apiFormData = new FormData();

        Object.entries(payload).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                apiFormData.append(key, String(value));
            }
        });

        if (image && image.size > 0) {
            apiFormData.append("file", image);
        }
        console.log({ apiFormData, image });
        // ================= API CALL =================
        const res = await serverFetch.post("/batch", {
            body: apiFormData,
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message:
                    result?.message || "Failed to create batch",
                formData: payload,
            };
        }

        return {
            success: true,
            message: "Batch created successfully",
        };
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        console.error("createBatch error:", error);

        return {
            success: false,
            message: error?.message || "Something went wrong",
            formData: payload, // ✅ now safe
        };
    }
};