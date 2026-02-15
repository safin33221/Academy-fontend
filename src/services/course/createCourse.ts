/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";

interface CreateCourseResponse {
    success: boolean;
    message: string;
}

export const createCourse = async (
    _prevState: unknown,
    formData: FormData
): Promise<CreateCourseResponse> => {
    try {
        const payload = {
            title: String(formData.get("title") || "").trim(),
            slug: String(formData.get("slug") || "").trim(),
            description: String(formData.get("description") || "").trim(),
            thumbnail: String(formData.get("thumbnail") || "").trim(),

            type: String(formData.get("type") || ""),
            access: String(formData.get("access") || ""),
            level: String(formData.get("level") || ""),
            status: String(formData.get("status") || ""),

            price: Number(formData.get("price") || 0),
            discountPrice: Number(formData.get("discountPrice") || 0),
            estimatedDurationHours: Number(
                formData.get("estimatedDurationHours") || 0
            ),

            certificateEnabled:
                String(formData.get("certificateEnabled")) === "on",

            metaTitle: String(formData.get("metaTitle") || "").trim(),
            metaDescription: String(formData.get("metaDescription") || "").trim(),
        };

        // Basic validation
        if (!payload.title || !payload.slug) {
            return {
                success: false,
                message: "Title and Slug are required",
            };
        }

        console.log("Create course payload:", payload);

        const res = await serverFetch.post("/course", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result?.message || "Failed to create course",
            };
        }

        return {
            success: true,
            message: "Course created successfully",
        };
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        console.error("createCourse error:", error);

        return {
            success: false,
            message: "Something went wrong",
        };
    }
};