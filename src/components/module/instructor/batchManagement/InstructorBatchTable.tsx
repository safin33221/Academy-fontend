"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IBatch, BatchStatus } from "@/types/batch/batch.interface";
import { useMemo, useState } from "react";
import { InstructorBatchColumn } from "./InstructorBatchColumn";
import { useRouter } from "next/navigation";

interface InstructorBatchTableProps {
    batches: IBatch[];
}

type BatchStatusFilter = BatchStatus | "ALL";

const statusOrder: BatchStatusFilter[] = [
    "ALL",
    "ONGOING",
    "UPCOMING",
    "COMPLETED",
    "CANCELLED",
];

export default function InstructorBatchTable({ batches }: InstructorBatchTableProps) {
    const [statusFilter, setStatusFilter] = useState<BatchStatusFilter>("ALL");
    const router = useRouter();

    const countsByStatus = useMemo(() => {
        const counts: Record<BatchStatusFilter, number> = {
            ALL: batches.length,
            ONGOING: 0,
            UPCOMING: 0,
            COMPLETED: 0,
            CANCELLED: 0,
        };

        for (const batch of batches) {
            counts[batch.status] += 1;
        }

        return counts;
    }, [batches]);

    const filteredBatches = useMemo(() => {
        if (statusFilter === "ALL") return batches;
        return batches.filter((batch) => batch.status === statusFilter);
    }, [batches, statusFilter]);

    const handleView = (batch: IBatch) => {
        router.push(`/instructor/dashboard/my-batches/${batch.slug}`);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                {statusOrder.map((status) => {
                    const isActive = statusFilter === status;
                    return (
                        <Button
                            key={status}
                            size="sm"
                            variant={isActive ? "default" : "outline"}
                            onClick={() => setStatusFilter(status)}
                            className="rounded-full"
                        >
                            {status}
                            <Badge
                                variant={isActive ? "secondary" : "outline"}
                                className="ml-2"
                            >
                                {countsByStatus[status]}
                            </Badge>
                        </Button>
                    );
                })}
            </div>

            <div className="overflow-x-auto rounded-lg border">
                <ManagementTable<IBatch>
                    data={filteredBatches}
                    columns={InstructorBatchColumn}
                    getRowKey={(batch) => batch.id}
                    onView={handleView}
                    EmptyMessage="No batch found for this filter."
                />
            </div>

        </div>
    );
}
