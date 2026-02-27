"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/formatters";
import { formatRemainingTime } from "@/lib/formatRemainingTime";

export type ClassDeliveryType = "LIVE" | "RECORDED";
export type ClassLifecycleStatus = "UPCOMING" | "ONGOING" | "ENDED";

export interface InstructorClass {
    id: string;
    title: string;
    description?: string | null;
    startTime: string;
    duration: number;
    classStatus?: string | null;
    status?: string | null;
    zoomStartUrl?: string | null;
    zoomJoinUrl?: string | null;
    recordingUrl?: string | null;
}

const lifecycleStatusClassMap: Record<ClassLifecycleStatus, string> = {
    UPCOMING: "bg-blue-100 text-blue-700",
    ONGOING: "bg-emerald-100 text-emerald-700",
    ENDED: "bg-gray-200 text-gray-700",
};

export const normalizeDeliveryType = (
    rawType?: string | null
): ClassDeliveryType => {
    return rawType === "RECORDED" ? "RECORDED" : "LIVE";
};

export const resolveLifecycleStatus = (
    classItem: InstructorClass,
    nowMilliseconds: number
): ClassLifecycleStatus => {
    const startMilliseconds = new Date(classItem.startTime).getTime();

    if (!Number.isFinite(startMilliseconds)) {
        const backendStatus = (classItem.status || "").toUpperCase();
        if (backendStatus === "ONGOING") return "ONGOING";
        if (
            backendStatus === "ENDED" ||
            backendStatus === "END" ||
            backendStatus === "COMPLETED"
        ) {
            return "ENDED";
        }
        return "UPCOMING";
    }

    const durationMinutes =
        Number.isFinite(classItem.duration) && classItem.duration > 0
            ? classItem.duration
            : 60;

    const endMilliseconds = startMilliseconds + durationMinutes * 60 * 1000;

    if (nowMilliseconds < startMilliseconds) return "UPCOMING";
    if (nowMilliseconds >= startMilliseconds && nowMilliseconds < endMilliseconds) {
        return "ONGOING";
    }
    return "ENDED";
};

interface ClassCardProps {
    classItem: InstructorClass;
    nowMilliseconds: number;
}

export default function ClassCard({ classItem, nowMilliseconds }: ClassCardProps) {
    const lifecycle = resolveLifecycleStatus(classItem, nowMilliseconds);
    const delivery = normalizeDeliveryType(classItem.classStatus);
    const startMs = new Date(classItem.startTime).getTime();

    return (
        <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start gap-3">
                <div>
                    <h3 className="font-semibold">{classItem.title}</h3>
                    <p className="text-sm text-muted-foreground">
                        {formatDateTime(classItem.startTime)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {delivery} - {classItem.duration} mins
                    </p>
                </div>

                <div className="flex flex-col">
                    <div className="flex gap-2">
                        <Badge className={lifecycleStatusClassMap[lifecycle]}>{lifecycle}</Badge>
                        <Badge variant="secondary">{delivery}</Badge>
                    </div>
                    <div className="mt-4 flex gap-2">
                        {lifecycle === "ONGOING" && classItem.zoomStartUrl ? (
                            <Button size="sm" asChild>
                                <a href={classItem.zoomStartUrl} target="_blank" rel="noreferrer">
                                    Start Class
                                </a>
                            </Button>
                        ) : (
                            <Button size="sm" disabled>
                                {lifecycle === "UPCOMING"
                                    ? `Starts in ${formatRemainingTime(startMs - nowMilliseconds)}`
                                    : lifecycle === "ONGOING"
                                        ? "Start Link Missing"
                                        : "Class Ended"}
                            </Button>
                        )}

                        {classItem.recordingUrl && lifecycle === "ENDED" && (
                            <Button size="sm" variant="outline" asChild>
                                <a href={classItem.recordingUrl} target="_blank" rel="noreferrer">
                                    View Recording
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>


        </div>
    );
}
