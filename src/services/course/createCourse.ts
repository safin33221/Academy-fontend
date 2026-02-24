/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";

interface CreateCourseResponse {
    success: boolean;
    message: string;
    formData?: any;
}

export const createCourse = async (
    _prevState: unknown,
    formData: FormData
): Promise<CreateCourseResponse> => {

    // ✅ Move payload outside try
    const payload: any = {};

    try {
        const image = formData.get("image") as File | null;

        // ================= BASIC FIELDS =================
        payload.title = String(formData.get("title") || "").trim();
        payload.slug = String(formData.get("slug") || "").trim();
        payload.shortDescription = String(
            formData.get("shortDescription") || ""
        ).trim();
        payload.fullDescription = String(
            formData.get("fullDescription") || ""
        ).trim();

        payload.level = String(formData.get("level") || "");
        payload.category = String(formData.get("category") || "");

        payload.price = Number(formData.get("price") || 0);
        payload.discountPrice = formData.get("discountPrice")
            ? Number(formData.get("discountPrice"))
            : null;

        payload.duration = Number(formData.get("duration") || 0);
        payload.totalClasses = Number(formData.get("totalClasses") || 0);

        payload.isPremium =
            String(formData.get("isPremium")) === "true";
        payload.isFeatured =
            String(formData.get("isFeatured")) === "true";

        // ================= VALIDATION =================
        if (!payload.title || !payload.slug) {
            return {
                success: false,
                message: "Title and Slug are required",
                formData: payload, // ✅ return values
            };
        }

        // ================= CURRICULUM =================
        const curriculum: any[] = [];
        let cIndex = 0;

        while (formData.get(`curriculum[${cIndex}][title]`)) {
            curriculum.push({
                title: String(
                    formData.get(`curriculum[${cIndex}][title]`)
                ),
                content: String(
                    formData.get(`curriculum[${cIndex}][content]`)
                ),
                order: cIndex + 1,
            });
            cIndex++;
        }

        // ================= LEARNINGS =================
        const learnings: any[] = [];
        let lIndex = 0;

        while (formData.get(`learnings[${lIndex}]`)) {
            learnings.push({
                content: String(formData.get(`learnings[${lIndex}]`)),
            });
            lIndex++;
        }

        // ================= FAQ =================
        const faqs: any[] = [];
        let fIndex = 0;

        while (formData.get(`faqs[${fIndex}][question]`)) {
            faqs.push({
                question: String(
                    formData.get(`faqs[${fIndex}][question]`)
                ),
                answer: String(
                    formData.get(`faqs[${fIndex}][answer]`)
                ),
            });
            fIndex++;
        }

        payload.curriculum = curriculum;
        payload.learnings = learnings;
        payload.faqs = faqs;

        // ================= MULTIPART =================
        const apiFormData = new FormData();

        Object.entries(payload).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                apiFormData.append(
                    key,
                    Array.isArray(value) || typeof value === "object"
                        ? JSON.stringify(value)
                        : String(value)
                );
            }
        });

        if (image && image.size > 0) {
            apiFormData.append("file", image);
        }

        // ================= API CALL =================
        const res = await serverFetch.post("/course", {
            body: apiFormData,
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message:
                    result?.message || "Failed to create course",
                formData: payload, // ✅ preserve values
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
            formData: payload, // ✅ now safe
        };
    }
};