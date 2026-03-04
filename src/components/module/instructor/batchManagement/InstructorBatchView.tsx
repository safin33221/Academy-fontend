"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/StatCard";
import { IBatch } from "@/types/batch/batch.interface";
import { IUser } from "@/types/user/user";
import { BookOpen, CalendarDays, Clock3, Plus, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import InstructorCreateClassDialog from "./InstructorCreateClassDialog";
import ClassCard, {
    ClassLifecycleStatus,
    InstructorClass,
    resolveLifecycleStatus,
} from "./ClassCard";
import { formatDateTime } from "@/lib/formatters";

type Enrollment = { user: IUser } | IUser;

interface InstructorBatchViewProps {
    batch: IBatch | null;
    classes: InstructorClass[] | null;
}

const batchStatusClassMap: Record<IBatch["status"], string> = {
    UPCOMING: "bg-blue-100 text-blue-700",
    ONGOING: "bg-emerald-100 text-emerald-700",
    COMPLETED: "bg-gray-200 text-gray-700",
    CANCELLED: "bg-red-100 text-red-700",
};

export default function InstructorBatchView({
    batch,
    classes,
}: InstructorBatchViewProps) {

    const router = useRouter();
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [nowMilliseconds, setNowMilliseconds] = useState<number>(() => Date.now());
    const [classFilter, setClassFilter] = useState<"ALL" | ClassLifecycleStatus>("ALL");

    useEffect(() => {
        const interval = setInterval(() => setNowMilliseconds(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    const students = useMemo(() => {
        if (!batch || !Array.isArray(batch.enrollments)) return [];

        return batch.enrollments
            .map((enrollment: Enrollment) =>
                "user" in enrollment ? enrollment.user ?? null : enrollment
            )
            .filter(
                (student): student is IUser =>
                    Boolean(student?.name || student?.email)
            );
    }, [batch]);

    const classList = useMemo<InstructorClass[]>(() => {
        if (!Array.isArray(classes)) return [];

        return classes.map((cls) => ({
            ...cls,
            title: cls.title || "Untitled Class",
            duration:
                Number.isFinite(cls.duration) && cls.duration > 0
                    ? cls.duration
                    : 60,
        }));
    }, [classes]);

    const classSummary = useMemo(() => {
        return classList.reduce(
            (acc, cls) => {
                const status = resolveLifecycleStatus(cls, nowMilliseconds);
                acc[status] += 1;
                return acc;
            },
            {
                UPCOMING: 0,
                ONGOING: 0,
                ENDED: 0,
            } as Record<ClassLifecycleStatus, number>
        );
    }, [classList, nowMilliseconds]);

    const filteredClassList = useMemo(() => {
        if (classFilter === "ALL") return classList;

        return classList.filter(
            (cls) => resolveLifecycleStatus(cls, nowMilliseconds) === classFilter
        );
    }, [classList, classFilter, nowMilliseconds]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isClassCreateActive = useMemo(
        () => batch?.startDate ? new Date(batch.startDate).getTime() > nowMilliseconds : false,
        [batch?.startDate, nowMilliseconds]
    );

    if (!batch) {
        return (
            <div className="p-8 text-sm text-muted-foreground">
                No batch found.
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl space-y-10 md:p-8">
            <div className="flex  justify-between items-center">
                <div>
                    <h1 className="text-xl md:3xl font-bold">{batch.name}</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        {batch.course?.title}
                    </p>
                </div>

                <div className="flex gap-3 items-center">
                    <Badge className={batchStatusClassMap[batch.status]}>
                        {batch.status}
                    </Badge>

                    <Button
                        // disabled={isClassCreateActive}
                        onClick={() => setOpenCreateDialog(true)}>
                        <Plus size={16} className="mr-2" />
                        Create Class
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <StatCard
                    icon={<Users size={18} />}
                    title="Students"
                    value={`${batch.enrolledCount}/${batch.maxStudents}`}
                />
                <StatCard
                    icon={<BookOpen size={18} />}
                    title="Total Classes"
                    value={classList.length}
                />
                <StatCard
                    icon={<Clock3 size={18} />}
                    title="Ongoing"
                    value={classSummary.ONGOING}
                />
                <StatCard
                    icon={<CalendarDays size={18} />}
                    title="Duration"
                    value={`${formatDateTime(batch.startDate)} - ${formatDateTime(batch.endDate)}`}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10">
                <div className="lg:col-span-2">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-xl font-semibold">
                            Classes ({filteredClassList.length})
                        </h2>

                        <div className="flex flex-wrap items-center gap-2">
                            {(["ALL", "ONGOING", "UPCOMING", "ENDED"] as const).map((filterKey) => {
                                const count =
                                    filterKey === "ALL"
                                        ? classList.length
                                        : classSummary[filterKey];

                                return (
                                    <button
                                        key={filterKey}
                                        type="button"
                                        onClick={() => setClassFilter(filterKey)}
                                        className={`rounded-full border px-3 py-1 text-xs font-medium transition ${classFilter === filterKey
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                                            }`}
                                    >
                                        {filterKey} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="max-h-152 overflow-y-auto space-y-3 pr-1 sm:pr-2">
                        {classList.length === 0 && (
                            <div className="border rounded-xl p-8 text-center text-sm text-muted-foreground">
                                No classes created yet.
                            </div>
                        )}

                        {classList.length > 0 && filteredClassList.length === 0 && (
                            <div className="border rounded-xl p-6 text-center text-sm text-muted-foreground">
                                No classes found for this filter.
                            </div>
                        )}

                        {filteredClassList.map((cls) => (
                            <ClassCard
                                key={cls.id}
                                classItem={cls}
                                nowMilliseconds={nowMilliseconds}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Students</h2>

                    <div className="border rounded-xl divide-y">
                        {students.length === 0 && (
                            <div className="p-6 text-sm text-muted-foreground text-center">
                                No students enrolled.
                            </div>
                        )}

                        {students.map((student, index) => (
                            <div
                                key={student.id ?? `${student.email}-${index}`}
                                className="p-4 flex justify-between"
                            >
                                <div>
                                    <p className="font-medium">{student.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {student.email}
                                    </p>
                                </div>
                                <Badge variant="secondary">Active</Badge>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <InstructorCreateClassDialog
                open={openCreateDialog}
                onOpenChange={setOpenCreateDialog}
                batch={batch}
                onSuccess={() => router.refresh()}
            />
        </div >
    );
}
