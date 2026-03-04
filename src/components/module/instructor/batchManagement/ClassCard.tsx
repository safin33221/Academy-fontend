"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/formatters";
import { formatRemainingTime } from "@/lib/formatRemainingTime";
import { CalendarDays, Clock3, ExternalLink, PlayCircle } from "lucide-react";

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

const lifecycleAccentClassMap: Record<ClassLifecycleStatus, string> = {
    UPCOMING: "bg-blue-500",
    ONGOING: "bg-emerald-500",
    ENDED: "bg-slate-400",
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
    const durationMinutes =
        Number.isFinite(classItem.duration) && classItem.duration > 0
            ? classItem.duration
            : 60;
    const statusLabel =
        lifecycle === "UPCOMING"
            ? `Starts in ${formatRemainingTime(startMs - nowMilliseconds)}`
            : lifecycle === "ONGOING"
                ? "Start Link Missing"
                : "Class Ended";
    const canStart = lifecycle === "ONGOING" && Boolean(classItem.zoomStartUrl);
    const canViewRecording = lifecycle === "ENDED" && Boolean(classItem.recordingUrl);
    const secondaryActionLabel =
        lifecycle === "UPCOMING" ? "Upcoming class" : lifecycle === "ONGOING" ? "Live class" : "Ended class";

    return (
        <div className="relative overflow-hidden rounded-xl border bg-card p-4 shadow-sm transition hover:shadow-md sm:p-5">
            <span
                className={`absolute inset-y-0 left-0 w-1.5 ${lifecycleAccentClassMap[lifecycle]}`}
                aria-hidden
            />

            <div className="space-y-4 pl-2 sm:pl-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 space-y-2">
                        <h3 className="line-clamp-2 text-base font-semibold leading-tight sm:text-lg">
                            {classItem.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground sm:text-sm">
                            <span className="inline-flex items-center gap-1.5">
                                <CalendarDays className="h-3.5 w-3.5" />
                                {formatDateTime(classItem.startTime)}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Clock3 className="h-3.5 w-3.5" />
                                {durationMinutes} mins
                            </span>
                            <span>{delivery}</span>
                        </div>
                    </div>

                    <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:justify-end">
                        <Badge className={lifecycleStatusClassMap[lifecycle]}>{lifecycle}</Badge>
                        <Badge variant="secondary">{delivery}</Badge>
                    </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted-foreground sm:text-sm">
                        {secondaryActionLabel}
                    </p>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-end">
                        {canStart ? (
                            <Button size="sm" className="w-full sm:w-auto" asChild>
                                <a href={classItem.zoomStartUrl!} target="_blank" rel="noreferrer">
                                    <PlayCircle className="mr-1.5 h-4 w-4" />
                                    Start Class
                                </a>
                            </Button>
                        ) : (
                            <Button
                                size="sm"
                                disabled
                                className="h-auto w-full whitespace-normal px-3 py-2 text-left sm:w-auto sm:text-center"
                            >
                                {statusLabel}
                            </Button>
                        )}

                        {canViewRecording && (
                            <Button size="sm" variant="outline" className="w-full sm:w-auto" asChild>
                                <a href={classItem.recordingUrl!} target="_blank" rel="noreferrer">
                                    <ExternalLink className="mr-1.5 h-4 w-4" />
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
