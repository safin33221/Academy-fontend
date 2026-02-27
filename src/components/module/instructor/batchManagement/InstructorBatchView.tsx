"use client";

import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { IBatch } from "@/types/batch/batch.interface";
import { CalendarDays, Clock3, Layers, Users } from "lucide-react";
import Image from "next/image";

interface InstructorBatchViewProps {
    batch: IBatch | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const statusClassMap: Record<IBatch["status"], string> = {
    UPCOMING: "bg-blue-100 text-blue-700",
    ONGOING: "bg-emerald-100 text-emerald-700",
    COMPLETED: "bg-gray-200 text-gray-700",
    CANCELLED: "bg-red-100 text-red-700",
};

const formatDate = (date: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
};

export default function InstructorBatchView({
    batch,
    open,
    onOpenChange,
}: InstructorBatchViewProps) {
    if (!batch) return null;

    const enrolledPercent =
        batch.maxStudents > 0
            ? Math.min((batch.enrolledCount / batch.maxStudents) * 100, 100)
            : 0;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between gap-3 pr-8">
                        <span className="line-clamp-1">{batch.name}</span>
                        <Badge className={statusClassMap[batch.status]}>{batch.status}</Badge>
                    </DialogTitle>
                    <DialogDescription>
                        Batch details and enrollment status.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Course</p>
                            <p className="text-base font-medium">{batch.course?.title || "N/A"}</p>
                            <p className="text-sm text-muted-foreground line-clamp-4">
                                {batch.course?.shortDescription || "No course description available."}
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-lg border">
                            <Image
                                src={batch.thumbnail || batch.course?.thumbnail || "/images/placeholder.png"}
                                alt={batch.name}
                                width={560}
                                height={260}
                                className="h-48 w-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border p-3 text-sm">
                            <p className="inline-flex items-center gap-2 text-muted-foreground">
                                <Layers size={14} />
                                Batch Slug
                            </p>
                            <p className="mt-1 font-medium">{batch.slug}</p>
                        </div>
                        <div className="rounded-lg border p-3 text-sm">
                            <p className="inline-flex items-center gap-2 text-muted-foreground">
                                <Users size={14} />
                                Students
                            </p>
                            <p className="mt-1 font-medium">
                                {batch.enrolledCount}/{batch.maxStudents}
                            </p>
                        </div>
                        <div className="rounded-lg border p-3 text-sm">
                            <p className="inline-flex items-center gap-2 text-muted-foreground">
                                <CalendarDays size={14} />
                                Start Date
                            </p>
                            <p className="mt-1 font-medium">{formatDate(batch.startDate)}</p>
                        </div>
                        <div className="rounded-lg border p-3 text-sm">
                            <p className="inline-flex items-center gap-2 text-muted-foreground">
                                <Clock3 size={14} />
                                End Date
                            </p>
                            <p className="mt-1 font-medium">{formatDate(batch.endDate)}</p>
                        </div>
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                            <p className="font-medium">Enrollment Progress</p>
                            <p className="text-muted-foreground">{Math.round(enrolledPercent)}%</p>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                            <div
                                className="h-2 rounded-full bg-primary"
                                style={{ width: `${enrolledPercent}%` }}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
