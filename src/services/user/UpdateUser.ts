/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidatePath } from "next/cache";

interface UpdateUserState {
    success: boolean;
    message: string;
}

export async function updateUserAction(
    _prevState: UpdateUserState | null,
    formData: FormData
): Promise<UpdateUserState> {
    try {
        const id = String(formData.get("id") || "");

        if (!id) {
            return { success: false, message: "User ID missing" };
        }

        const payload = new FormData();

        payload.append("name", String(formData.get("name") || ""));
        payload.append("phone", String(formData.get("phone") || ""));

        const file = formData.get("file") as File | null;

        // MUST match multer .single("file")
        if (file && file.size > 0) {
            payload.append("file", file);
        }
        console.log({ payload });

        const res = await serverFetch.patch(`/users/${id}`, {
            body: payload,
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result?.message || "Update failed",
            };
        }
        // 🔥 Real-time refresh
        revalidatePath("/profile"); // change to your route
        return {
            success: true,
            message: "Profile updated successfully",
        };
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            message: "Something went wrong",
        };
    }
}