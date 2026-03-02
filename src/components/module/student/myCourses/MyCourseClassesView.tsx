"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IBatch } from "@/types/batch/batch.interface";
import {
    BookOpen,
    CalendarDays,
    Clock3,
    PlayCircle,
    Video,
    Users,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Loader2,
    ExternalLink,
    Calendar
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

/* ============================================================================
   TYPES
============================================================================ */

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
    batch: IBatch;
}

/* ============================================================================
   CONSTANTS & CONFIGURATION
============================================================================ */

const LIFECYCLE_STATUS_CONFIG: Record<ClassLifecycleStatus, {
    label: string;
    badgeClass: string;
    icon: React.ElementType;
    progressColor: string;
}> = {
    UPCOMING: {
        label: "Upcoming",
        badgeClass: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800",
        icon: Calendar,
        progressColor: "bg-blue-500"
    },
    ONGOING: {
        label: "Live Now",
        badgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 animate-pulse",
        icon: PlayCircle,
        progressColor: "bg-emerald-500"
    },
    ENDED: {
        label: "Ended",
        badgeClass: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
        icon: CheckCircle2,
        progressColor: "bg-gray-400"
    },
};

/* ============================================================================
   UTILITY FUNCTIONS
============================================================================ */

const formatDateTime = (value: string) => {
    if (!value) return "N/A";
    try {
        return new Date(value).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    } catch {
        return "Invalid Date";
    }
};

const formatRemainingTime = (milliseconds: number): string => {
    if (milliseconds <= 0) return "Starting soon";

    const totalMinutes = Math.ceil(milliseconds / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const days = Math.floor(hours / 24);

    if (days > 0) {
        const remainingHours = hours % 24;
        return `${days}d ${remainingHours}h`;
    }
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
};

const normalizeDeliveryType = (rawType?: string | null): ClassDeliveryType => {
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
        if (["ENDED", "END", "COMPLETED"].includes(backendStatus)) {
            return "ENDED";
        }
        return "UPCOMING";
    }

    const durationMinutes = Number.isFinite(classItem.duration) && classItem.duration > 0
        ? classItem.duration
        : 60;

    const endMilliseconds = startMilliseconds + durationMinutes * 60 * 1000;

    if (nowMilliseconds < startMilliseconds) return "UPCOMING";
    if (nowMilliseconds >= startMilliseconds && nowMilliseconds < endMilliseconds) {
        return "ONGOING";
    }
    return "ENDED";
};

const calculateOverallProgress = (
    classes: StudentClass[],
    nowMilliseconds: number
): number => {
    if (classes.length === 0) return 0;

    const completed = classes.filter(
        c => resolveLifecycleStatus(c, nowMilliseconds) === "ENDED"
    ).length;

    return Math.round((completed / classes.length) * 100);
};

/* ============================================================================
   STAT CARD COMPONENT
============================================================================ */

const StatCard = ({
    icon,
    title,
    value,
    trend,
    trendDirection = "up",
    loading = false
}: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    trend?: number;
    trendDirection?: "up" | "down";
    loading?: boolean;
}) => {
    if (loading) {
        return (
            <div className="rounded-xl border p-4 bg-card animate-pulse">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted/50 w-10 h-10" />
                    <div className="space-y-2 flex-1">
                        <div className="h-3 bg-muted rounded w-16" />
                        <div className="h-5 bg-muted rounded w-12" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border p-4 bg-card hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{title}</p>
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold">{value}</p>
                        {trend !== undefined && (
                            <Badge
                                variant="outline"
                                className={cn(
                                    "text-xs",
                                    trendDirection === "up"
                                        ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                                        : "text-red-600 border-red-200 bg-red-50"
                                )}
                            >
                                {trendDirection === "up" ? "↑" : "↓"} {trend}%
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ============================================================================
   CLASS CARD COMPONENT
============================================================================ */

const ClassCard = ({
    classItem,
    nowMilliseconds
}: {
    classItem: StudentClass;
    nowMilliseconds: number;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const lifecycleStatus = resolveLifecycleStatus(classItem, nowMilliseconds);
    const deliveryType = normalizeDeliveryType(classItem.classStatus);
    const startMilliseconds = new Date(classItem.startTime).getTime();
    const statusConfig = LIFECYCLE_STATUS_CONFIG[lifecycleStatus];
    const StatusIcon = statusConfig.icon;

    const timeRemaining = startMilliseconds - nowMilliseconds;
    const timeRemainingFormatted = formatRemainingTime(timeRemaining);

    const getActionButton = () => {
        if (deliveryType === "RECORDED") {
            if (classItem.recordingUrl) {
                return (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="sm"
                                    asChild
                                    className="gap-2 bg-primary hover:bg-primary/90 text-white"
                                >
                                    <Link
                                        href={classItem.recordingUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <PlayCircle className="h-4 w-4" />
                                        Watch Recording
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Watch recorded session</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            }
            return (
                <Button size="sm" disabled variant="outline" className="gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing Recording
                </Button>
            );
        }

        if (lifecycleStatus === "ONGOING") {
            if (classItem.zoomJoinUrl) {
                return (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="sm"
                                    asChild
                                    className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white animate-pulse"
                                >
                                    <Link
                                        href={classItem.zoomJoinUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Video className="h-4 w-4" />
                                        Join Live Class
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Join the ongoing session</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            }
            return (
                <Button size="sm" disabled variant="destructive" className="gap-2">
                    <XCircle className="h-4 w-4" />
                    Join Link Missing
                </Button>
            );
        }

        if (lifecycleStatus === "UPCOMING") {
            return (
                <Button size="sm" disabled variant="outline" className="gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Starts {timeRemainingFormatted}
                </Button>
            );
        }

        // ENDED - Show recording if available
        if (classItem.recordingUrl) {
            return (
                <Button size="sm" variant="outline" asChild className="gap-2">
                    <Link
                        href={classItem.recordingUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <PlayCircle className="h-4 w-4" />
                        Watch Recording
                    </Link>
                </Button>
            );
        }

        return (
            <Button size="sm" disabled variant="ghost" className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Class Ended
            </Button>
        );
    };

    return (
        <div
            className={cn(
                "border rounded-xl p-5 bg-card hover:shadow-md transition-all duration-300",
                lifecycleStatus === "ONGOING" && "border-emerald-200 dark:border-emerald-800 shadow-emerald-100 dark:shadow-emerald-950",
                lifecycleStatus === "UPCOMING" && "border-blue-200 dark:border-blue-800",
            )}
        >
            {/* Header */}
            <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge className={cn("border", statusConfig.badgeClass)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                            {deliveryType}
                        </Badge>
                    </div>

                    <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {classItem.title}
                    </h2>

                    <p className={cn(
                        "text-sm text-muted-foreground transition-all duration-300",
                        !isExpanded && "line-clamp-2"
                    )}>
                        {classItem.description || "No description provided."}
                    </p>

                    {classItem.description && classItem.description.length > 100 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-xs text-primary hover:underline mt-1"
                        >
                            {isExpanded ? "Show less" : "Read more"}
                        </button>
                    )}
                </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{formatDateTime(classItem.startTime)}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    <span>{classItem.duration} minutes</span>
                </div>
            </div>

            <Separator className="my-4" />

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    {getActionButton()}

                    {classItem.recordingUrl && lifecycleStatus === "ENDED" && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button size="sm" variant="ghost" asChild>
                                        <Link
                                            href={classItem.recordingUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Open recording in new tab</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>

                {lifecycleStatus === "UPCOMING" && (
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{
                                    width: `${Math.min(100, (1 - timeRemaining / (7 * 24 * 60 * 60 * 1000)) * 100)}%`
                                }}
                            />
                        </div>
                        <span className="text-xs text-muted-foreground">
                            {timeRemainingFormatted} left
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ============================================================================
   MAIN COMPONENT
============================================================================ */

export default function MyCourseClassesView({
    classes,
    batch,
}: MyCourseClassesViewProps) {
    const [nowMilliseconds, setNowMilliseconds] = useState<number>(() => Date.now());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setIsLoading(false), 500);

        const interval = setInterval(() => setNowMilliseconds(Date.now()), 30000);
        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    // Process classes
    const classList = useMemo<StudentClass[]>(() => {
        if (!Array.isArray(classes)) return [];

        return classes.map((classItem) => ({
            ...classItem,
            title: classItem.title || "Untitled Class",
            duration: Number.isFinite(classItem.duration) && classItem.duration > 0
                ? classItem.duration
                : 60,
        }));
    }, [classes]);

    // Sort classes by status and time
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

    // Calculate summary statistics
    const classSummary = useMemo(() => {
        return classList.reduce(
            (summary, classItem) => {
                const lifecycleStatus = resolveLifecycleStatus(classItem, nowMilliseconds);
                summary[lifecycleStatus] += 1;
                return summary;
            },
            { UPCOMING: 0, ONGOING: 0, ENDED: 0 }
        );
    }, [classList, nowMilliseconds]);

    const overallProgress = useMemo(
        () => calculateOverallProgress(classList, nowMilliseconds),
        [classList, nowMilliseconds]
    );

    const nextClass = useMemo(() => {
        return orderedClasses.find(
            c => resolveLifecycleStatus(c, nowMilliseconds) === "UPCOMING"
        );
    }, [orderedClasses, nowMilliseconds]);

    const ongoingClass = useMemo(() => {
        return orderedClasses.find(
            c => resolveLifecycleStatus(c, nowMilliseconds) === "ONGOING"
        );
    }, [orderedClasses, nowMilliseconds]);

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        {batch?.course?.title || "Course Content"}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {batch?.name || "Course Batch"}
                        {batch?.instructors?.length > 0 && (
                            <>
                                <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                                <span>Instructor: {batch.instructors[0]?.name}</span>
                            </>
                        )}
                    </p>
                </div>

                {/* Progress Circle */}
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Overall Progress</p>
                        <p className="text-2xl font-bold">{overallProgress}%</p>
                    </div>
                    <div className="relative h-16 w-16">
                        <svg className="h-full w-full" viewBox="0 0 100 100">
                            <circle
                                className="stroke-muted fill-none"
                                cx="50"
                                cy="50"
                                r="45"
                                strokeWidth="10"
                            />
                            <circle
                                className="stroke-primary fill-none transition-all duration-1000 ease-out"
                                cx="50"
                                cy="50"
                                r="45"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 45}`}
                                strokeDashoffset={`${2 * Math.PI * 45 * (1 - overallProgress / 100)}`}
                                transform="rotate(-90 50 50)"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard
                    icon={<BookOpen size={18} />}
                    title="Total Classes"
                    value={classList.length}
                    loading={isLoading}
                />
                <StatCard
                    icon={<PlayCircle size={18} />}
                    title="Live Now"
                    value={classSummary.ONGOING}
                    trend={classSummary.ONGOING > 0 ? 100 : 0}
                    loading={isLoading}
                />
                <StatCard
                    icon={<CalendarDays size={18} />}
                    title="Upcoming"
                    value={classSummary.UPCOMING}
                    loading={isLoading}
                />
                <StatCard
                    icon={<CheckCircle2 size={18} />}
                    title="Completed"
                    value={classSummary.ENDED}
                    trend={Math.round((classSummary.ENDED / classList.length) * 100) || 0}
                    loading={isLoading}
                />
            </div>

            {/* Next Up / Live Now Banner */}
            {(nextClass || ongoingClass) && (
                <div className={cn(
                    "rounded-xl p-4 border bg-linear-to-r",
                    ongoingClass
                        ? "from-emerald-50 to-emerald-100/50 dark:from-emerald-950 dark:to-emerald-900/50 border-emerald-200 dark:border-emerald-800"
                        : "from-blue-50 to-blue-100/50 dark:from-blue-950 dark:to-blue-900/50 border-blue-200 dark:border-blue-800"
                )}>
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "p-2 rounded-full",
                            ongoingClass ? "bg-emerald-200 dark:bg-emerald-800" : "bg-blue-200 dark:bg-blue-800"
                        )}>
                            {ongoingClass ? (
                                <PlayCircle className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                            ) : (
                                <Calendar className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">
                                {ongoingClass ? "🔴 Live Now" : "⏰ Next Up"}
                            </p>
                            <p className="text-lg font-semibold">
                                {ongoingClass?.title || nextClass?.title}
                            </p>
                        </div>
                        {ongoingClass?.zoomJoinUrl && (
                            <Button size="sm" asChild className="bg-emerald-600 hover:bg-emerald-700">
                                <Link href={ongoingClass.zoomJoinUrl} target="_blank">
                                    Join Now
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Course Progress</span>
                    <span className="font-medium">{overallProgress}% Complete</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
            </div>

            {/* Classes List */}
            {orderedClasses.length === 0 ? (
                <div className="border rounded-xl p-12 text-center">
                    <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                        <BookOpen className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Classes Available</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Classes will appear here once they are scheduled by your instructor.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orderedClasses.map((classItem) => (
                        <ClassCard
                            key={classItem.id}
                            classItem={classItem}
                            nowMilliseconds={nowMilliseconds}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}