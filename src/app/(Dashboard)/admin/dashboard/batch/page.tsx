import BatchManagementHeader from "@/components/module/admin/batchManagement/BatchManagementHeader";
import BatchTable from "@/components/module/admin/batchManagement/BatchTable";
import { IBatch } from "@/types/batch/batch.interface";

export default function page() {
    const batch: IBatch[] = []
    return (
        <div>
            <BatchManagementHeader />
            <BatchTable batches={batch} />
        </div>
    );
};
