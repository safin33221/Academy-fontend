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
        const image = formData.get("image") as File | null;

        // ================= BASIC FIELDS =================
        const payload: any = {
            title: String(formData.get("title") || "").trim(),
            slug: String(formData.get("slug") || "").trim(),
            shortDescription: String(
                formData.get("shortDescription") || ""
            ).trim(),
            fullDescription: String(
                formData.get("fullDescription") || ""
            ).trim(),

            level: String(formData.get("level") || ""),
            category: String(formData.get("category") || ""),

            price: Number(formData.get("price") || 0),
            discountPrice: formData.get("discountPrice")
                ? Number(formData.get("discountPrice"))
                : null,

            duration: Number(formData.get("duration") || 0),
            totalClasses: Number(formData.get("totalClasses") || 0),

            isPremium: String(formData.get("isPremium")) === "true",
            isFeatured: String(formData.get("isFeatured")) === "true",
        };

        // ================= VALIDATION =================
        if (!payload.title || !payload.slug) {
            return {
                success: false,
                message: "Title and Slug are required",
            };
        }

        // ================= CURRICULUM PARSE =================
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

        // ================= LEARNINGS PARSE =================
        const learnings: any[] = [];
        let lIndex = 0;

        while (formData.get(`learnings[${lIndex}]`)) {
            learnings.push({
                content: String(formData.get(`learnings[${lIndex}]`)),
            });
            lIndex++;
        }

        // ================= FAQ PARSE =================
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

        // ================= BUILD MULTIPART =================
        const apiFormData = new FormData();

        // append primitive fields
        Object.entries(payload).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (
                    typeof value === "object" &&
                    !Array.isArray(value)
                ) {
                    apiFormData.append(key, JSON.stringify(value));
                } else if (Array.isArray(value)) {
                    apiFormData.append(key, JSON.stringify(value));
                } else {
                    apiFormData.append(key, String(value));
                }
            }
        });

        // append image
        if (image && image.size > 0) {
            apiFormData.append("file", image);
        }

        // ================= API CALL =================
        const res = await serverFetch.post("/course", {
            body: apiFormData, // 🔥 multipart
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message:
                    result?.message || "Failed to create course",
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