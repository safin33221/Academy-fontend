export function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function formatDateTime(date: string | Date): string {
    return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}


export function queryStringFormatter(searchParamsObj: { [key: string]: string | string[] | undefined }): string {
    let queryString = "";
    // {searchTerm: "John", speciality: "Cardiology"}
    // after entries: [ ["searchTerm", "John"], ["speciality", "Cardiology"] ]
    const queryArray = Object.entries(searchParamsObj).map(([key, value]) => {
        if (Array.isArray(value)) {
            // { speciality: ["Cardiology", "Neurology"] } 
            // ["Cardiology", "Neurology"]
            // ?speciality=Cardiology&speciality=Neurology
            return value.map((v) => `${key}=${encodeURIComponent(v)}`).join("&");
        }
        else if (value !== undefined) {
            return `${key}=${encodeURIComponent(value)}`;
        }
        return "";
    });
    queryString = queryArray.filter((q) => q !== "").join("&"); // searchTerm=John&speciality=Cardiology&speciality=Neurology
    return queryString;
}


export const formatRemainingTime = (milliseconds: number): string => {
    if (milliseconds <= 0) return "Starting soon";

    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // মিনিট ও সেকেন্ড সবসময় দেখাবে
    if (minutes > 0) {
        return `${minutes}min ${seconds}sec`;
    }

    // ১ মিনিটের কম হলে শুধু সেকেন্ড
    return `${seconds}sec`;
};


// lib/formatters.ts - এডভান্সড ভার্সন

/**
 * Dynamic duration formatter - duration এর উপর ভিত্তি করে smart format
 * @param seconds - total seconds
 * @returns smart formatted string
 */
export const formatDurationSmart = (seconds: number): string => {
    if (!seconds || seconds <= 0) return "0s";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // 1 ঘন্টার বেশি হলে ঘন্টা+মিনিট
    if (hours > 0) {
        if (minutes > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${hours}h`;
    }

    // 1 মিনিটের বেশি হলে মিনিট+সেকেন্ড
    if (minutes > 0) {
        if (secs > 0) {
            return `${minutes}m ${secs}s`;
        }
        return `${minutes}m`;
    }

    // 1 মিনিটের কম হলে শুধু সেকেন্ড
    return `${secs}s`;
};

/**
 * Color-coded duration (UI helper)
 */
export const getDurationColor = (seconds: number): string => {
    if (!seconds || seconds <= 0) return "text-gray-500";

    const minutes = Math.floor(seconds / 60);

    if (minutes >= 45) return "text-green-600"; // 45+ মিনিট - পুরো ক্লাস
    if (minutes >= 30) return "text-emerald-600"; // 30-44 মিনিট - ভালো
    if (minutes >= 15) return "text-yellow-600"; // 15-29 মিনিট - মাঝারি
    if (minutes >= 5) return "text-orange-600"; // 5-14 মিনিট - কম
    return "text-red-600"; // 5 মিনিটের কম - খুব কম
};

/**
 * Duration with icon and color
 */
export const getDurationDisplay = (seconds: number): { text: string; color: string; icon: string } => {
    const text = formatDurationSmart(seconds);
    const color = getDurationColor(seconds);

    let icon = "🕒";
    const minutes = Math.floor(seconds / 60);

    if (minutes >= 45) icon = "🎯"; // পুরো ক্লাস
    else if (minutes >= 30) icon = "👍"; // ভালো
    else if (minutes >= 15) icon = "👌"; // মাঝারি
    else if (minutes >= 5) icon = "⚠️"; // কম
    else icon = "❌"; // খুব কম

    return { text, color, icon };
};