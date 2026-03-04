"use client";

import { ClassCard } from "@/components/shared/ClassCard";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, resolveLifecycleStatus } from "@/lib/utils";
import { IBatch } from "@/types/batch/batch.interface";
import { ClassLifecycleStatus, StudentClass } from "@/types/class/myClasses.interface";
import {
    Award,
    BookOpen,
    Calendar,
    Clock,
    PlayCircle,
    Target, UserCheck,
    Users
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "LEFT_EARLY";

interface AttendanceClassRow {
    classId: string;
    title: string;
    startTime: string;
    durationMinutes: number;
    classStatus: ClassLifecycleStatus;
    zoomMeetingId?: string | null;
    zoomJoinUrl?: string | null;
    attendanceStatus: AttendanceStatus;
    sessionCount: number;
    firstJoinTime?: string | null;
    lastLeaveTime?: string | null;
    totalDurationSeconds: number;
    totalDurationMinutes: number;
}

interface AttendanceSummary {
    totalClasses: number;
    attendedClasses: number;
    absentClasses: number;
    attendanceRate: number;
    totalDurationSeconds: number;
    totalDurationMinutes: number;
    upcomingClasses: number;
    ongoingClasses: number;
    endedClasses: number;
}

interface MyBatchAttendanceData {
    batch?: {
        id: string;
        name: string;
        slug: string;
    };
    student?: {
        id: string;
        name: string;
        email: string;
    };
    summary?: AttendanceSummary;
    classes?: AttendanceClassRow[];
}

export interface MyCourseClassesViewProps {
    classes: StudentClass[];
    batch: IBatch;
    myAttendance?: MyBatchAttendanceData | null;
}

export default function MyCourseClassesView({
    classes,
    batch,
    myAttendance,
}: MyCourseClassesViewProps) {
    const [nowMilliseconds, setNowMilliseconds] = useState<number>(() => Date.now());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        const interval = setInterval(() => setNowMilliseconds(Date.now()), 1000);
        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    const attendanceClasses = useMemo<AttendanceClassRow[]>(
        () => (Array.isArray(myAttendance?.classes) ? myAttendance.classes : []),
        [myAttendance]
    );

    const classList = useMemo<StudentClass[]>(() => {
        if (Array.isArray(classes) && classes.length > 0) {
            return classes.map((classItem) => ({
                ...classItem,
                title: classItem.title || "Untitled Class",
                duration:
                    Number.isFinite(classItem.duration) && classItem.duration > 0
                        ? classItem.duration
                        : 60,
            }));
        }

        if (!attendanceClasses.length) return [];

        return attendanceClasses.map((item) => ({
            id: item.classId,
            title: item.title || "Untitled Class",
            description: null,
            startTime: item.startTime,
            duration:
                Number.isFinite(item.durationMinutes) && item.durationMinutes > 0
                    ? item.durationMinutes
                    : 60,
            status: item.classStatus,
            zoomJoinUrl: item.zoomJoinUrl || null,
        }));
    }, [classes, attendanceClasses]);

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

            return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
        });
    }, [classList, nowMilliseconds]);

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


    const nextClass = useMemo(() => {
        return orderedClasses.find(
            (c) => resolveLifecycleStatus(c, nowMilliseconds) === "UPCOMING"
        );
    }, [orderedClasses, nowMilliseconds]);

    const ongoingClass = useMemo(() => {
        return orderedClasses.find(
            (c) => resolveLifecycleStatus(c, nowMilliseconds) === "ONGOING"
        );
    }, [orderedClasses, nowMilliseconds]);

    const attendanceSummary = useMemo<AttendanceSummary>(() => {
        const fallback: AttendanceSummary = {
            totalClasses: classList.length,
            attendedClasses: attendanceClasses.filter((c) => c.attendanceStatus === "PRESENT")
                .length,
            absentClasses: attendanceClasses.filter((c) => c.attendanceStatus === "ABSENT")
                .length,
            attendanceRate:
                classList.length > 0
                    ? Number(
                        (
                            (attendanceClasses.filter(
                                (c) => c.attendanceStatus === "PRESENT"
                            ).length /
                                classList.length) *
                            100
                        ).toFixed(2)
                    )
                    : 0,
            totalDurationSeconds: attendanceClasses.reduce(
                (sum, c) => sum + (c.totalDurationSeconds || 0),
                0
            ),
            totalDurationMinutes: Number(
                (
                    attendanceClasses.reduce(
                        (sum, c) => sum + (c.totalDurationSeconds || 0),
                        0
                    ) / 60
                ).toFixed(2)
            ),
            upcomingClasses: classSummary.UPCOMING,
            ongoingClasses: classSummary.ONGOING,
            endedClasses: classSummary.ENDED,
        };

        return { ...fallback, ...(myAttendance?.summary || {}) };
    }, [attendanceClasses, classList.length, classSummary, myAttendance?.summary]);

    const getClassAttendance = (classId: string) => {
        return attendanceClasses.find((att) => att.classId === classId);
    };

    const attendanceStats = useMemo(() => {
        const totalPresent = attendanceClasses.filter(
            (c) => c.attendanceStatus === "PRESENT"
        ).length;
        const totalAbsent = attendanceClasses.filter(
            (c) => c.attendanceStatus === "ABSENT"
        ).length;
        const totalLate = attendanceClasses.filter((c) => c.attendanceStatus === "LATE")
            .length;
        const totalLeftEarly = attendanceClasses.filter(
            (c) => c.attendanceStatus === "LEFT_EARLY"
        ).length;

        const totalDuration = attendanceClasses.reduce(
            (sum, c) => sum + (c.totalDurationSeconds || 0),
            0
        );
        const averageDuration =
            attendanceClasses.length > 0 ? totalDuration / attendanceClasses.length : 0;

        const totalSessions = attendanceClasses.reduce(
            (sum, c) => sum + (c.sessionCount || 0),
            0
        );

        return {
            totalPresent,
            totalAbsent,
            totalLate,
            totalLeftEarly,
            averageDuration,
            totalSessions,
        };
    }, [attendanceClasses]);

    const batchName = myAttendance?.batch?.name || batch?.name || "Course Batch";

    return (
        <div className=" mx-auto  md:p-6 space-y-6">
            <div className="sticky top-0 bg-indigo-300-300 bg-white   ">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold">
                            {batch?.course?.title || "Course Content"}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {batchName}
                            </span>
                            {batch?.instructors?.length > 0 && (
                                <>
                                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                                    <span>Instructor: {batch.instructors[0]?.name}</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 max-md:hidden">
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Attendance Rate</p>
                            <p className="text-2xl font-bold text-green-600">
                                {attendanceSummary.attendanceRate}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {attendanceSummary.attendedClasses} / {attendanceSummary.totalClasses} classes
                            </p>
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
                                    className="stroke-green-500 fill-none transition-all duration-1000 ease-out"
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 45}`}
                                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - attendanceSummary.attendanceRate / 100)}`}
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 mt-5 gap-2 mb-5">
                    <StatCard
                        size="sm"
                        icon={<BookOpen />}
                        title="Total"
                        value={attendanceSummary.totalClasses || classList.length}
                        loading={isLoading}
                    />
                    <StatCard
                        size="sm"
                        icon={<UserCheck />}
                        title="Present"
                        value={attendanceSummary.attendedClasses}
                        description={`${attendanceSummary.attendanceRate}%`}
                        trend={attendanceSummary.attendanceRate}
                        loading={isLoading}
                    />
                    <StatCard
                        size="sm"
                        icon={<Clock />}
                        title="Avg"
                        value={`${Math.round(attendanceStats.averageDuration / 60)}m`}
                        description="per class"
                        loading={isLoading}
                    />
                    <StatCard
                        size="sm"
                        icon={<Target />}
                        title="Sessions"
                        value={attendanceStats.totalSessions}
                        description="joins"
                        loading={isLoading}
                    />
                    <StatCard
                        size="sm"
                        icon={<Award />}
                        title="Left"
                        value={attendanceSummary.upcomingClasses + attendanceSummary.ongoingClasses}
                        description="to go"
                        loading={isLoading}
                    />
                </div>



                {(nextClass || ongoingClass) && (
                    <div
                        className={cn(
                            "rounded-xl p-4 border bg-linear-to-r",
                            ongoingClass
                                ? "from-emerald-50 to-emerald-100/50 pb-5 dark:from-emerald-950 dark:to-emerald-900/50 border-emerald-200 dark:border-emerald-800"
                                : "from-blue-50 to-blue-100/50 dark:from-blue-950 dark:to-blue-900/50 border-blue-200 dark:border-blue-800"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={cn(
                                    "p-2 rounded-full",
                                    ongoingClass
                                        ? "bg-emerald-200 dark:bg-emerald-800"
                                        : "bg-blue-200 dark:bg-blue-800"
                                )}
                            >
                                {ongoingClass ? (
                                    <PlayCircle className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                                ) : (
                                    <Calendar className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">
                                    {ongoingClass ? "Live Now" : "Next Up"}
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



                <div className="pt-10">

                    <Separator />
                </div>
            </div>

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
                            showAttendance
                            attendanceData={getClassAttendance(classItem.id)}
                        />
                    ))}
                </div>
            )}


        </div>
    );
}
