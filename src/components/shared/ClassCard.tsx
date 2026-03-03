/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    CalendarDays,
    Clock3,
    PlayCircle,
    Video, CheckCircle2,
    XCircle,
    Loader2,
    ExternalLink,
    Calendar,
    UserCheck,
    UserX,
    Clock,
    Eye
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn, normalizeDeliveryType, resolveLifecycleStatus } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDateTime, formatDurationSmart, formatRemainingTime, } from "@/lib/formatters";
import { ClassLifecycleStatus, StudentClass } from "@/types/class/myClasses.interface";

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

// Attendance Status Config
const ATTENDANCE_STATUS_CONFIG = {
    PRESENT: {
        label: "Present",
        badgeClass: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 border-green-200 dark:border-green-800",
        icon: UserCheck
    },
    ABSENT: {
        label: "Absent",
        badgeClass: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800",
        icon: UserX
    },
    LATE: {
        label: "Late",
        badgeClass: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
        icon: Clock
    },
    LEFT_EARLY: {
        label: "Left Early",
        badgeClass: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800",
        icon: Clock
    }
};

export const ClassCard = ({
    classItem,
    nowMilliseconds,
    showAttendance = false,
    attendanceData
}: {
    classItem: StudentClass;
    nowMilliseconds: number;
    showAttendance?: boolean;
    attendanceData?: any;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const lifecycleStatus = resolveLifecycleStatus(classItem, nowMilliseconds);
    const deliveryType = normalizeDeliveryType(classItem.classStatus);
    const startMilliseconds = new Date(classItem.startTime).getTime();
    const statusConfig = LIFECYCLE_STATUS_CONFIG[lifecycleStatus];
    const StatusIcon = statusConfig.icon;

    const timeRemaining = startMilliseconds - nowMilliseconds;
    const timeRemainingFormatted = formatRemainingTime(timeRemaining);

    // Attendance related - নতুন ডাটা স্ট্রাকচার অনুযায়ী
    const hasAttendance = showAttendance && attendanceData && lifecycleStatus === "ENDED";

    const getAttendanceConfig = () => {
        if (!attendanceData?.attendanceStatus) return null;
        return ATTENDANCE_STATUS_CONFIG[attendanceData.attendanceStatus as keyof typeof ATTENDANCE_STATUS_CONFIG] || null;
    };

    const attendanceConfig = getAttendanceConfig();
    const AttendanceIcon = attendanceConfig?.icon || UserCheck;

    // Format join/leave time
    const formatJoinTime = (timestamp: string) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

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
                hasAttendance && attendanceData?.attendanceStatus === "ABSENT" && "border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/20"
            )}
        >
            {/* Header with Status Badges */}
            <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {/* Lifecycle Status Badge */}
                        <Badge className={cn("border", statusConfig.badgeClass)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                        </Badge>

                        {/* Delivery Type Badge */}
                        <Badge variant="outline" className="text-xs">
                            {deliveryType}
                        </Badge>

                        {/* Attendance Badge - Show only for ended classes */}
                        {hasAttendance && attendanceConfig && (
                            <Badge className={cn("border", attendanceConfig.badgeClass)}>
                                <AttendanceIcon className="h-3 w-3 mr-1" />
                                {attendanceConfig.label}
                            </Badge>
                        )}
                    </div>

                    <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {attendanceData?.title || classItem.title}
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

            {/* Metadata - Class Info + Attendance Details */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{formatDateTime(attendanceData?.startTime || classItem.startTime)}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    <span>{attendanceData?.durationMinutes || classItem.duration} minutes</span>
                </div>

                {/* Zoom Meeting ID (if available) */}
                {attendanceData?.zoomMeetingId && (
                    <div className="flex items-center gap-1 text-blue-600">
                        <Eye className="h-3.5 w-3.5" />
                        <span>Meeting ID: {attendanceData.zoomMeetingId}</span>
                    </div>
                )}

                {/* Attendance Time Details */}
                {hasAttendance && attendanceData && (
                    <>
                        {attendanceData.firstJoinTime && (
                            <div className="flex items-center gap-1 text-green-600">
                                <UserCheck className="h-3.5 w-3.5" />
                                <span>Joined: {formatJoinTime(attendanceData.firstJoinTime)}</span>
                            </div>
                        )}
                        {attendanceData.lastLeaveTime && (
                            <div className="flex items-center gap-1 text-orange-600">
                                <Clock className="h-3.5 w-3.5" />
                                <span>Left: {formatJoinTime(attendanceData.lastLeaveTime)}</span>
                            </div>
                        )}
                        {attendanceData.totalDurationSeconds && (
                            <div className="flex items-center gap-1 font-medium">
                                <Clock className="h-3.5 w-3.5" />
                                <span className={cn(
                                    attendanceData.totalDurationSeconds >= 2700 ? "text-green-600" :
                                        attendanceData.totalDurationSeconds >= 1800 ? "text-emerald-600" :
                                            attendanceData.totalDurationSeconds >= 900 ? "text-yellow-600" :
                                                attendanceData.totalDurationSeconds >= 300 ? "text-orange-600" :
                                                    "text-red-600"
                                )}>
                                    Duration: {formatDurationSmart(attendanceData.totalDurationSeconds)}
                                </span>
                            </div>
                        )}
                        {attendanceData.sessionCount && attendanceData.sessionCount > 1 && (
                            <div className="flex items-center gap-1 text-purple-600">
                                <span>📊</span>
                                <span>{attendanceData.sessionCount} sessions</span>
                            </div>
                        )}
                    </>
                )}
            </div>

            <Separator className="my-4" />

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    {getActionButton()}

                    {attendanceData?.zoomJoinUrl && lifecycleStatus === "ENDED" && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button size="sm" variant="ghost" asChild>
                                        <Link
                                            href={attendanceData.zoomJoinUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Open meeting link</p>
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