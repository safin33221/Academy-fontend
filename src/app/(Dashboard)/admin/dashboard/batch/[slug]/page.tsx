import BatchDetails from "@/components/module/admin/batchManagement/BatchDetails"
import { getSingleBatch } from "@/services/Batch/getSingleBatch"
import { IBatch } from "@/types/batch/batch.interface"



export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const res = await getSingleBatch(slug)
    const batch: IBatch = res?.data || {}
    return (
        <div>
            <BatchDetails batch={batch} />
        </div>
    )
}
