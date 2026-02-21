import BatchManagementHeader from "@/components/module/admin/batchManagement/BatchManagementHeader";
import BatchTable from "@/components/module/admin/batchManagement/BatchTable";
import { getAllBatch } from "@/services/Batch/getAllBatch";

export default async function page() {
    const res = await getAllBatch()
    const batch = res.data
    return (
        <div>
            <BatchManagementHeader />
            <BatchTable batches={batch} />
        </div>
    );
};
