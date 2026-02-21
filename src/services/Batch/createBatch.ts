/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/serverFetch"
import { revalidatePath } from "next/cache"

export const createBatch = async (
    _prevState: any,
    formData: FormData
) => {
    const payload = {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        courseId: formData.get("courseId") as string,
        enrollmentStart: formData.get("enrollmentStart") as string,
        enrollmentEnd: formData.get("enrollmentEnd") as string,
        startDate: formData.get("startDate") as string,
        endDate: formData.get("endDate") as string,
        maxStudents: Number(formData.get("maxStudents")),
        price: formData.get("price")
            ? Number(formData.get("price"))
            : null,
        isActive: formData.get("isActive") === "true",
        status: formData.get("status") as string,
    }

    try {
        // Basic validation
        if (
            !payload.name ||
            !payload.slug ||
            !payload.courseId ||
            !payload.startDate ||
            !payload.enrollmentStart ||
            !payload.enrollmentEnd ||
            !Number.isFinite(payload.maxStudents) ||
            payload.maxStudents <= 0
        ) {
            return {
                success: false,
                message: "All required fields must be provided correctly",
                formData: payload, // 🔥 IMPORTANT
            }
        }

        const res = await serverFetch.post("/batch", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        const response = await res.json()

        if (!res.ok || !response?.success) {
            return {
                success: false,
                message: response?.message || "Failed to create batch",
                formData: payload, // 🔥 KEEP DATA
            }
        }

        revalidatePath("/admin/dashboard/batch")

        // 🔥 Redirect on success


        return {
            success: true,
            message: "Batch created successfully",
            formData: null, // 🔥 clear form on success
        }

    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong",
            formData: payload, // 🔥 KEEP DATA ON ERROR
        }
    }
}