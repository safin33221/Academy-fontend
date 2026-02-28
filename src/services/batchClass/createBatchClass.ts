/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";

interface CreateBatchClassResponse {
    success: boolean;
    message: string;
    formData?: any;
}

const parseLocalDateTimeWithOffset = (
    value: string,
    timezoneOffsetMinutes: number
): Date | null => {
    const match = value.match(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/
    );

    if (!match) return null;

    const [, year, month, day, hour, minute, second = "0"] = match;
    const utcMilliseconds =
        Date.UTC(
            Number(year),
            Number(month) - 1,
            Number(day),
            Number(hour),
            Number(minute),
            Number(second)
        ) +
        timezoneOffsetMinutes * 60 * 1000;

    const parsedDate = new Date(utcMilliseconds);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

const normalizeStartTime = (
    value: string,
    timezoneOffsetMinutes: number
): string => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return "";

    const timezoneAwarePattern = /([zZ]|[+-]\d{2}:\d{2})$/;
    if (timezoneAwarePattern.test(trimmedValue)) {
        const parsedDate = new Date(trimmedValue);
        return Number.isNaN(parsedDate.getTime())
            ? ""
            : parsedDate.toISOString();
    }

    const parsedLocalDate = parseLocalDateTimeWithOffset(
        trimmedValue,
        timezoneOffsetMinutes
    );
    if (parsedLocalDate) {
        return parsedLocalDate.toISOString();
    }

    const fallbackParsedDate = new Date(trimmedValue);
    return Number.isNaN(fallbackParsedDate.getTime())
        ? ""
        : fallbackParsedDate.toISOString();
};

export const createBatchClass = async (
    _prevState: unknown,
    formData: FormData
): Promise<CreateBatchClassResponse> => {
    let payload: any = {};

    try {
        const rawStartTime = String(
            formData.get("startTime") || formData.get("startTimeLocal") || ""
        );
        const parsedTimezoneOffset = Number(
            formData.get("timezoneOffsetMinutes")
        );
        const timezoneOffsetMinutes = Number.isFinite(parsedTimezoneOffset)
            ? parsedTimezoneOffset
            : 0;

        // ================= BASIC FIELDS =================
        payload = {
            batchId: String(formData.get("batchId") || "").trim(),
            title: String(formData.get("title") || "").trim(),
            description: String(formData.get("description") || "").trim(),
            startTime: normalizeStartTime(
                rawStartTime,
                timezoneOffsetMinutes
            ),
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

        const startDate = new Date(payload.startTime);

        if (Number.isNaN(startDate.getTime())) {
            return {
                success: false,
                message: "Invalid start date/time selected",
                formData: payload,
            };
        }

        if (startDate < new Date()) {
            return {
                success: false,
                message: "Start time cannot be in the past",
                formData: payload,
            };
        }

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
