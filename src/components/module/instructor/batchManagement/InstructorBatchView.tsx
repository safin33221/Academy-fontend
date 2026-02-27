"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IBatch } from "@/types/batch/batch.interface";
import { BookOpen, CalendarDays, Plus, Users } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import InstructorCreateClassDialog, {
    CreateClassPayload,
} from "./InstructorCreateClassDialog";

type Student = {
    id?: string;
    name?: string;
    email?: string;
};

type BatchClass = {
    id: string;
    title: string;
    description?: string;
    startTime: string;
    duration: number;
    classType: "LIVE" | "RECORDED";
};

type BatchWithOptionalFields = IBatch & {
    classes?: Array<Partial<BatchClass> & { id?: string; date?: string }>;
};
type Enrollment = { user?: Student } | Student;

interface InstructorBatchViewProps {
    batch: IBatch | null;
}

const statusClassMap: Record<IBatch["status"], string> = {
    UPCOMING: "bg-blue-100 text-blue-700",
    ONGOING: "bg-emerald-100 text-emerald-700",
    COMPLETED: "bg-gray-200 text-gray-700",
    CANCELLED: "bg-red-100 text-red-700",
};

const formatDate = (value: string) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const mapClassFromBatch = (item: Partial<BatchClass> & { id?: string; date?: string }) => ({
    id: item.id ?? String(Date.now()),
    title: item.title ?? "Untitled Class",
    description: item.description ?? "",
    startTime: item.startTime ?? item.date ?? "",
    duration: item.duration ?? 60,
    classType: (item.classType as "LIVE" | "RECORDED") ?? "LIVE",
});

export default function InstructorBatchView({ batch }: InstructorBatchViewProps) {
    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    const classesFromBatch = useMemo(() => {
        if (!batch) return [];
        const rawClasses = (batch as BatchWithOptionalFields).classes ?? [];
        return rawClasses.map(mapClassFromBatch);
    }, [batch]);

    const [classes, setClasses] = useState<BatchClass[]>(classesFromBatch);

    const students = useMemo(() => {
        if (!batch || !Array.isArray(batch.enrollments)) return [];

        return batch.enrollments
            .map((enrollment: Enrollment) => {
                if (typeof enrollment === "object" && enrollment !== null && "user" in enrollment) {
                    return enrollment.user ?? null;
                }
                return enrollment as Student;
            })
            .filter(
                (student): student is Student =>
                    Boolean(student && (student.name || student.email))
            );
    }, [batch]);

    if (!batch) {
        return (
            <div className="rounded-lg border p-6 text-sm text-muted-foreground">
                No batch found.
            </div>
        );
    }

    const handleCreateClass = (payload: CreateClassPayload) => {
        const newClass: BatchClass = {
            id:
                typeof crypto !== "undefined" && "randomUUID" in crypto
                    ? crypto.randomUUID()
                    : String(Date.now()),
            ...payload,
        };

        setClasses((prev) => [newClass, ...prev]);
        toast.success("Class created in UI.");
    };

    return (
        <div className="mx-auto max-w-7xl space-y-8 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold">{batch.name}</h1>
                    <p className="text-sm text-muted-foreground">
                        {batch.course?.title || "N/A"}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Badge className={statusClassMap[batch.status]}>{batch.status}</Badge>
                    <Button size="sm" onClick={() => setOpenCreateDialog(true)}>
                        <Plus size={16} className="mr-2" />
                        Create Class
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <StatCard
                    icon={<Users size={18} />}
                    title="Students"
                    value={`${batch.enrolledCount}/${batch.maxStudents}`}
                />

                <StatCard
                    icon={<BookOpen size={18} />}
                    title="Total Classes"
                    value={classes.length}
                />

                <StatCard
                    icon={<CalendarDays size={18} />}
                    title="Duration"
                    value={`${new Date(batch.startDate).toLocaleDateString()} - ${new Date(
                        batch.endDate
                    ).toLocaleDateString()}`}
                />
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Classes</h2>

                {classes.length > 0 ? (
                    <div className="space-y-3">
                        {classes.map((cls) => (
                            <div
                                key={cls.id}
                                className="flex items-center justify-between rounded-lg border p-4"
                            >
                                <div>
                                    <p className="font-medium">{cls.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(cls.startTime)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {cls.classType} - {cls.duration} mins
                                    </p>
                                </div>

                                <Badge variant="secondary">{cls.classType}</Badge>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">No classes created yet.</p>
                )}
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Enrolled Students</h2>

                {students.length > 0 ? (
                    <div className="rounded-lg border">
                        {students.map((student: Student, index: number) => (
                            <div
                                key={student.id ?? `${student.email}-${index}`}
                                className="flex items-center justify-between border-b p-4 last:border-0"
                            >
                                <div>
                                    <p className="font-medium">{student.name || "N/A"}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {student.email || "N/A"}
                                    </p>
                                </div>

                                <Badge variant="secondary">Active</Badge>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">No students enrolled.</p>
                )}
            </div>

            <InstructorCreateClassDialog
                open={openCreateDialog}
                onOpenChange={setOpenCreateDialog}
                batchName={batch.name}
                onSubmit={handleCreateClass}
            />
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
        <div className="flex items-center gap-4 rounded-lg border p-5">
            <div className="rounded-md bg-muted p-3">{icon}</div>
            <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-lg font-semibold">{value}</p>
            </div>
        </div>
    );
}

