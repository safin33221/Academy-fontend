/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    PlayCircle,
    Video,
    Calendar,
    Info,
    X,
    CalendarDays,
    Clock,
    UserCheck,
    Eye, CheckCircle2,
    UserX,
    type LucideIcon
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn, normalizeDeliveryType, resolveLifecycleStatus } from "@/lib/utils";
import { formatDateTime, formatDurationSmart } from "@/lib/formatters";
import { ClassLifecycleStatus, StudentClass } from "@/types/class/myClasses.interface";
import { formatRemainingTime } from "@/lib/formatRemainingTime";

// ==================== Popup Component ====================
const DetailsPopup = ({ isOpen, onClose, attendanceData, classItem }: any) => {
    if (!isOpen) return null;

    const formatJoinTime = (timestamp: string) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                onClick={onClose}
            />

            {/* Popup */}
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-2xl z-50 p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Class Details</h3>
                    <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-4">
                    {/* Date & Time */}
                    <div className="flex items-start gap-3">
                        <CalendarDays className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                            <p className="text-sm font-medium">Date & Time</p>
                            <p className="text-sm text-muted-foreground">
                                {formatDateTime(attendanceData?.startTime || classItem.startTime)}
                            </p>
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-start gap-3">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                            <p className="text-sm font-medium">Duration</p>
                            <p className="text-sm text-muted-foreground">
                                {attendanceData?.durationMinutes || classItem.duration} minutes
                            </p>
                        </div>
                    </div>

                    {/* Zoom Meeting ID */}
                    {attendanceData?.zoomMeetingId && (
                        <div className="flex items-start gap-3">
                            <Eye className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-sm font-medium">Meeting ID</p>
                                <p className="text-sm text-muted-foreground">
                                    {attendanceData.zoomMeetingId}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Attendance Details */}
                    {attendanceData && (
                        <>
                            <div className="border-t my-2" />

                            {/* Join Time */}
                            {attendanceData.firstJoinTime && (
                                <div className="flex items-start gap-3">
                                    <UserCheck className="h-4 w-4 text-green-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Joined</p>
                                        <p className="text-sm text-muted-foreground">
                                            {formatJoinTime(attendanceData.firstJoinTime)}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Leave Time */}
                            {attendanceData.lastLeaveTime && (
                                <div className="flex items-start gap-3">
                                    <Clock className="h-4 w-4 text-orange-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Left</p>
                                        <p className="text-sm text-muted-foreground">
                                            {formatJoinTime(attendanceData.lastLeaveTime)}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Total Duration */}
                            {attendanceData.totalDurationSeconds && (
                                <div className="flex items-start gap-3">
                                    <Clock className="h-4 w-4 text-purple-600 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Time in Class</p>
                                        <p className="text-sm text-muted-foreground">
                                            {formatDurationSmart(attendanceData.totalDurationSeconds)}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Sessions */}
                            {attendanceData.sessionCount && attendanceData.sessionCount > 1 && (
                                <div className="flex items-start gap-3">
                                    <span className="text-lg">📊</span>
                                    <div>
                                        <p className="text-sm font-medium">Sessions</p>
                                        <p className="text-sm text-muted-foreground">
                                            {attendanceData.sessionCount} sessions
                                        </p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}


                </div>
            </div>
        </>
    );
};

// ==================== Constants ====================
const LIFECYCLE_STATUS_CONFIG: Record<ClassLifecycleStatus, {
    label: string;
    badgeClass: string;
    icon: React.ElementType;
}> = {
    UPCOMING: {
        label: "Upcoming",
        badgeClass: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800",
        icon: Calendar,
    },
    ONGOING: {
        label: "Live Now",
        badgeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 animate-pulse",
        icon: PlayCircle,
    },
    ENDED: {
        label: "Ended",
        badgeClass: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
        icon: CheckCircle2,
    },
};

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

type AttendanceStatus = keyof typeof ATTENDANCE_STATUS_CONFIG;

interface AttendanceConfig {
    label: string;
    badgeClass: string;
    icon: LucideIcon;
}

// ==================== Main Component ====================
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
    const [showDetails, setShowDetails] = useState(false);

    const lifecycleStatus = resolveLifecycleStatus(classItem, nowMilliseconds);
    const deliveryType = normalizeDeliveryType(classItem.classStatus);
    const statusConfig = LIFECYCLE_STATUS_CONFIG[lifecycleStatus];
    const StatusIcon = statusConfig.icon;

    const hasAttendance = showAttendance && attendanceData && lifecycleStatus === "ENDED";

    const getAttendanceConfig = (): AttendanceConfig | null => {
        const status = attendanceData?.attendanceStatus as AttendanceStatus | undefined;
        if (!status) return null;
        return ATTENDANCE_STATUS_CONFIG[status] ?? null;
    };

    const attendanceConfig = getAttendanceConfig();
    const AttendanceIcon: LucideIcon = attendanceConfig?.icon ?? UserCheck;

    const getActionButton = () => {
        // Recording available
        if (deliveryType === "RECORDED" && classItem.recordingUrl) {
            return (
                <Button size="sm" asChild className="gap-2 bg-primary hover:bg-primary/90">
                    <Link href={classItem.recordingUrl} target="_blank">
                        <PlayCircle className="h-4 w-4" />
                        Watch Recording
                    </Link>
                </Button>
            );
        }

        // Live class
        if (lifecycleStatus === "ONGOING" && classItem.zoomJoinUrl) {
            return (
                <Button size="sm" asChild className="gap-2 bg-emerald-600 hover:bg-emerald-700 animate-pulse">
                    <Link href={classItem.zoomJoinUrl} target="_blank">
                        <Video className="h-4 w-4" />
                        Join Live
                    </Link>
                </Button>
            );
        }

        // Upcoming class
        if (lifecycleStatus === "UPCOMING") {
            const timeRemaining = new Date(classItem.startTime).getTime() - nowMilliseconds;
            return (
                <Button size="sm" disabled variant="outline" className="gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Starts in {formatRemainingTime(timeRemaining)}
                </Button>
            );
        }

        // Ended class with recording
        if (classItem.recordingUrl) {
            return (
                <Button size="sm" variant="outline" asChild className="gap-2">
                    <Link href={classItem.recordingUrl} target="_blank">
                        <PlayCircle className="h-4 w-4" />
                        Watch Recording
                    </Link>
                </Button>
            );
        }

        return null;
    };

    return (
        <>
            <div
                className={cn(
                    "border rounded-xl p-4 bg-card hover:shadow-md transition-all duration-300",
                    lifecycleStatus === "ONGOING" && "border-emerald-200 dark:border-emerald-800",
                    lifecycleStatus === "UPCOMING" && "border-blue-200 dark:border-blue-800",
                    hasAttendance && attendanceData?.attendanceStatus === "ABSENT" && "border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/20"
                )}
            >
                {/* Top Row - Badges and Info Button */}
                <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Status Badge */}
                        <Badge className={cn("border text-xs", statusConfig.badgeClass)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {lifecycleStatus === "ONGOING" ? "LIVE" : statusConfig.label}
                        </Badge>

                        {/* Delivery Type Badge */}
                        <Badge variant="outline" className="text-xs">
                            {deliveryType}
                        </Badge>

                        {/* Attendance Badge */}
                        {hasAttendance && attendanceConfig && (
                            <Badge className={cn("border text-xs", attendanceConfig.badgeClass)}>
                                <AttendanceIcon className="h-3 w-3 mr-1" />
                                {attendanceConfig.label}
                            </Badge>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowDetails(true)}
                            className="h-8 w-8 p-0 rounded-full"
                        >
                            <Info className="h-4 w-4" />
                        </Button>
                    </div>


                </div>

                {/* Title & Description */}
                <div className="flex  justify-between gap-4">
                    <div className="space-y-2 mb-4">
                        <h3 className="font-semibold text-base leading-tight">
                            {attendanceData?.title || classItem.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {classItem.description || "No description provided."}
                        </p>
                    </div>
                    {/* Info Button */}

                    {/* Action Button */}
                    <div className="flex justify-start">
                        {getActionButton()}
                    </div>
                </div>


            </div >

            {/* Details Popup */}
            < DetailsPopup
                isOpen={showDetails}
                onClose={() => setShowDetails(false)}
                attendanceData={attendanceData}
                classItem={classItem}
            />
        </>
    );
};
