import { DateCell } from "@/components/shared/cell/DateCell";
import { columns } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { IBatch } from "@/types/batch/batch.interface";
import { CalendarDays, Layers, Users } from "lucide-react";

export const InstructorBatchColumn: columns<IBatch>[] = [
    {
        header: "Batch",
        accessor: (batch) => (
            <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                    {batch.name}
                </span>
                <span className="text-xs text-muted-foreground">{batch.slug}</span>
            </div>
        ),
    },
    {
        header: "Course",
        accessor: (batch) => (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                <Layers size={12} />
                {batch.course?.title || "N/A"}
            </span>
        ),
    },
    {
        header: "Schedule",
        accessor: (batch) => (
            <div className="space-y-1 text-xs text-muted-foreground">
                <div className="inline-flex items-center gap-1">
                    <CalendarDays size={12} />
                    <span>Start:</span>
                    <DateCell date={batch.startDate} />
                </div>
                <div className="inline-flex items-center gap-1">
                    <CalendarDays size={12} />
                    <span>End:</span>
                    <DateCell date={batch.endDate} />
                </div>
            </div>
        ),
    },
    {
        header: "Students",
        accessor: (batch) => {
            const maxStudents = batch.maxStudents || 0;
            const enrolledCount = batch.enrolledCount || 0;
            const remainingSeats = Math.max(maxStudents - enrolledCount, 0);

            return (
                <div className="flex flex-col text-xs">
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Users size={12} />
                        {enrolledCount}/{maxStudents}
                    </span>
                    <span className={remainingSeats > 0 ? "text-emerald-600" : "text-red-500"}>
                        {remainingSeats > 0 ? `${remainingSeats} seats left` : "Full"}
                    </span>
                </div>
            );
        },
    },
    {
        header: "Status",
        accessor: (batch) => (
            <Badge
                variant="secondary"
                className={`uppercase ${batch.status === "UPCOMING"
                    ? "bg-blue-100 text-blue-700"
                    : batch.status === "ONGOING"
                        ? "bg-emerald-100 text-emerald-700"
                        : batch.status === "COMPLETED"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-red-100 text-red-700"
                    }`}
            >
                {batch.status}
            </Badge>
        ),
    },
];
