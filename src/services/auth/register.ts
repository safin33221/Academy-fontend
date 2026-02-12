/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

interface RegisterResponse {
    success: boolean;
    message: string;
}

export const register = async (
    _prevState: unknown,
    formData: FormData
): Promise<RegisterResponse> => {
    try {
        const payload = {
            name: String(formData.get("name") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            phone: String(formData.get("phone") || "").trim(),
            password: String(formData.get("password") || ""),
        };

        // Basic validation
        if (!payload.name || !payload.email || !payload.password) {
            return {
                success: false,
                message: "All required fields must be filled",
            };
        }

        console.log("Register payload:", payload);

        // TODO: Save to DB or call API here

        return {
            success: true,
            message: "Registration successful",
        };

    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error("Login error:", error);
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};
