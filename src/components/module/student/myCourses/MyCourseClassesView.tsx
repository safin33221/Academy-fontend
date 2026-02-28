"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IBatch } from "@/types/batch/batch.interface";
import { BookOpen, CalendarDays, Clock3, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type ClassDeliveryType = "LIVE" | "RECORDED";
type ClassLifecycleStatus = "UPCOMING" | "ONGOING" | "ENDED";

interface StudentClass {
    id: string;
    title: string;
    description?: string | null;
    startTime: string;
    duration: number;
    classStatus?: string | null;
    status?: string | null;
    zoomJoinUrl?: string | null;
    recordingUrl?: string | null;
    batch?: IBatch;
}

interface MyCourseClassesViewProps {
    classes: StudentClass[];
    batchSlug: string;
}

const lifecycleStatusClassMap: Record<ClassLifecycleStatus, string> = {
    UPCOMING: "bg-blue-100 text-blue-700",
    ONGOING: "bg-emerald-100 text-emerald-700",
    ENDED: "bg-gray-200 text-gray-700",
};

const formatDateTime = (value: string) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const formatRemainingTime = (milliseconds: number) => {
    if (milliseconds <= 0) return "Starting...";

    const totalMinutes = Math.ceil(milliseconds / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours <= 0) return `${minutes}m`;
    if (minutes <= 0) return `${hours}h`;
    return `${hours}h ${minutes}m`;
};

const normalizeDeliveryType = (
    rawType?: string | null
): ClassDeliveryType => {
    return rawType === "RECORDED" ? "RECORDED" : "LIVE";
};

const resolveLifecycleStatus = (
    classItem: StudentClass,
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

export default function MyCourseClassesView({
    classes,
    batchSlug,
}: MyCourseClassesViewProps) {
    const [nowMilliseconds, setNowMilliseconds] = useState<number>(() => Date.now());

    useEffect(() => {
        const interval = setInterval(() => setNowMilliseconds(Date.now()), 30000);
        return () => clearInterval(interval);
    }, []);

    const classList = useMemo<StudentClass[]>(() => {
        if (!Array.isArray(classes)) return [];

        return classes.map((classItem) => ({
            ...classItem,
            title: classItem.title || "Untitled Class",
            duration:
                Number.isFinite(classItem.duration) && classItem.duration > 0
                    ? classItem.duration
                    : 60,
        }));
    }, [classes]);

    const orderedClasses = useMemo(() => {
        const statusPriority: Record<ClassLifecycleStatus, number> = {
            ONGOING: 0,
            UPCOMING: 1,
            ENDED: 2,
        };

        return [...classList].sort((a, b) => {
            const aStatus = resolveLifecycleStatus(a, nowMilliseconds);
            const bStatus = resolveLifecycleStatus(b, nowMilliseconds);

            if (aStatus !== bStatus) {
                return statusPriority[aStatus] - statusPriority[bStatus];
            }

            const aStart = new Date(a.startTime).getTime();
            const bStart = new Date(b.startTime).getTime();
            return aStart - bStart;
        });
    }, [classList, nowMilliseconds]);

    const classSummary = useMemo(() => {
        return classList.reduce(
            (summary, classItem) => {
                const lifecycleStatus = resolveLifecycleStatus(
                    classItem,
                    nowMilliseconds
                );
                summary[lifecycleStatus] += 1;
                return summary;
            },
            {
                UPCOMING: 0,
                ONGOING: 0,
                ENDED: 0,
            } as Record<ClassLifecycleStatus, number>
        );
    }, [classList, nowMilliseconds]);

    const batch = orderedClasses[0]?.batch;

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        {batch?.course?.title || "Course Content"}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {batch?.name || `Batch: ${batchSlug}`}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-700">
                        Upcoming: {classSummary.UPCOMING}
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-700">
                        Ongoing: {classSummary.ONGOING}
                    </Badge>
                    <Badge className="bg-gray-200 text-gray-700">
                        Ended: {classSummary.ENDED}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={<BookOpen size={16} />}
                    title="Total Classes"
                    value={classList.length}
                />
                <StatCard
                    icon={<Clock3 size={16} />}
                    title="Ongoing"
                    value={classSummary.ONGOING}
                />
                <StatCard
                    icon={<CalendarDays size={16} />}
                    title="Upcoming"
                    value={classSummary.UPCOMING}
                />
                <StatCard
                    icon={<PlayCircle size={16} />}
                    title="Completed"
                    value={classSummary.ENDED}
                />
            </div>

            {orderedClasses.length === 0 ? (
                <div className="border rounded-xl p-8 text-center text-sm text-muted-foreground">
                    No classes available.
                </div>
            ) : (
                <div className="space-y-4">
                    {orderedClasses.map((classItem) => {
                        const lifecycleStatus = resolveLifecycleStatus(
                            classItem,
                            nowMilliseconds
                        );
                        const deliveryType = normalizeDeliveryType(
                            classItem.classStatus
                        );
                        const startMilliseconds = new Date(
                            classItem.startTime
                        ).getTime();

                        return (
                            <div key={classItem.id} className="border rounded-xl p-5">
                                <div className="flex flex-wrap justify-between items-start gap-3">
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            {classItem.title}
                                        </h2>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {classItem.description || "No description provided."}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {formatDateTime(classItem.startTime)} - {deliveryType} -{" "}
                                            {classItem.duration} mins
                                        </p>
                                    </div>

                                    <Badge className={lifecycleStatusClassMap[lifecycleStatus]}>
                                        {lifecycleStatus}
                                    </Badge>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {deliveryType === "RECORDED" ? (
                                        classItem.recordingUrl ? (
                                            <Button size="sm" asChild>
                                                <Link
                                                    href={classItem.recordingUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Watch Class
                                                </Link>
                                            </Button>
                                        ) : (
                                            <Button size="sm" disabled>
                                                Recording Pending
                                            </Button>
                                        )
                                    ) : lifecycleStatus === "ONGOING" &&
                                        classItem.zoomJoinUrl ? (
                                        <Button size="sm" asChild>
                                            <Link
                                                href={classItem.zoomJoinUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Join Class
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button size="sm" disabled>
                                            {lifecycleStatus === "UPCOMING"
                                                ? `Starts in ${formatRemainingTime(
                                                    startMilliseconds - nowMilliseconds
                                                )}`
                                                : lifecycleStatus === "ONGOING"
                                                    ? "Join Link Missing"
                                                    : "Class Ended"}
                                        </Button>
                                    )}

                                    {deliveryType === "LIVE" &&
                                        lifecycleStatus === "ENDED" &&
                                        classItem.recordingUrl && (
                                            <Button size="sm" variant="outline" asChild>
                                                <Link
                                                    href={classItem.recordingUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Watch Recording
                                                </Link>
                                            </Button>
                                        )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function StatCard({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
}) {
    return (
        <div className="rounded-xl border p-4 flex items-center gap-3 bg-white">
            <div className="p-2 rounded-lg bg-muted">{icon}</div>
            <div>
                <p className="text-xs text-muted-foreground">{title}</p>
                <p className="text-lg font-semibold">{value}</p>
            </div>
        </div>
    );
}
