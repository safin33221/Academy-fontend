"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

import ManagementTable from "@/components/shared/ManagementTable";
import { BatchColumn } from "./BatchColumn"; // adjust path
import { IBatch } from "@/types/batch/batch.interface";


interface BatchTableProps {
    batches: IBatch[];
}

export default function BatchTable({ batches }: BatchTableProps) {


    /* ================= View ================= */
    const handleView = (batch: IBatch) => {
        // If you want redirect instead of dialog:
        redirect(`/admin/dashboard/batch/${batch.slug}`);

    };

    return (
        <>
            <div className="overflow-x-auto rounded-lg border">
                <ManagementTable<IBatch>
                    data={batches}
                    columns={BatchColumn}
                    getRowKey={(batch) => batch.id}
                    onView={handleView}
                />
            </div>

            {/* Optional Dialog View */}
            {/* <BatchViewDetailDialog
                open={Boolean(viewingBatch)}
                onClose={() => setViewingBatch(null)}
                batch={viewingBatch}
            /> */}
        </>
    );
}
