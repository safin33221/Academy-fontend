import InstructorBatchView from "@/components/module/instructor/batchManagement/InstructorBatchView"
import { getSingleBatch } from "@/services/Batch/getSingleBatch"
import { IBatch } from "@/types/batch/batch.interface"




export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const res = await getSingleBatch(slug)
    const batch: IBatch | null = res?.data ?? null
    return (
        <div>
            <InstructorBatchView batch={batch} />
        </div>
    )
}
