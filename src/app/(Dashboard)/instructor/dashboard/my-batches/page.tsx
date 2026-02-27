"use server";

import InstructorBatchTable from "@/components/module/instructor/batchManagement/InstructorBatchTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { getInstructorBatch } from "@/services/instructor/instructorBatch";
import { IBatch } from "@/types/batch/batch.interface";

export default async function Page() {
    const res = await getInstructorBatch();
    const instructorBatches: IBatch[] = res?.data ?? [];


    return (
        <div className="space-y-5">

            <ManagementPageHeader
                title="My Batches"
                description="Manage assigned batches and track enrolled students."
            />

            <InstructorBatchTable batches={instructorBatches} />
        </div>
    );
}
