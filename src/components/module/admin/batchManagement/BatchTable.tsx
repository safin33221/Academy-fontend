"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

import ManagementTable from "@/components/shared/ManagementTable";
import { BatchColumn } from "./BatchColumn";
import { IBatch } from "@/types/batch/batch.interface";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { batchSoftDelete } from "@/services/Batch/batchSoftDelete";


interface BatchTableProps {
    batches: IBatch[];
}

export default function BatchTable({ batches }: BatchTableProps) {
    const [deleting, setDeleting] = useState<IBatch | null>(null);
    const [isDeletingDialog, setIsDeletingDialog] = useState(false);
    const [, startTransition] = useTransition();
    const router = useRouter();

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    /* ================= View ================= */
    const handleView = (batch: IBatch) => {
        router.push(`/admin/dashboard/batch/${batch.slug}`);
    };

    /* ================= Update ================= */
    const handleUpdate = (batch: IBatch) => {
        router.push(`/admin/dashboard/batch/update/${batch.slug}`);
    };

    /* ================= Delete ================= */
    const handleDelete = (batch: IBatch) => {
        setDeleting(batch);
    };

    const confirmDelete = async () => {
        if (!deleting) return;

        setIsDeletingDialog(true);

        const result = await batchSoftDelete(deleting.id);

        setIsDeletingDialog(false);

        if (result.success) {
            toast.success(result.message || "Batch deleted successfully");
            setDeleting(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete batch");
        }
    };

    return (
        <>
            <div className="overflow-x-auto rounded-lg border">
                <ManagementTable<IBatch>
                    data={batches}
                    columns={BatchColumn}
                    getRowKey={(batch) => batch.id}
                    onView={handleView}
                    onEdit={handleUpdate}
                    onDelete={handleDelete}
                />
            </div>

            <DeleteConfirmationDialog
                open={!!deleting}
                onOpenChange={(open) => !open && setDeleting(null)}
                onConfirm={confirmDelete}
                title="Delete Batch"
                description={
                    <>
                        Are you sure you want to delete{" "}
                        <span className="text-red-500 font-medium">
                            {deleting?.course?.title}
                        </span>{" "}
                        <span className="text-red-500 font-medium">
                            - {deleting?.name}?
                        </span>{" "}
                        This action cannot be undone.
                    </>

                }
                isDeleting={isDeletingDialog}
            />
        </>
    );
}