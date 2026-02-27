import InstructorBatchView from "@/components/module/instructor/batchManagement/InstructorBatchView"
import { getSingleBatch } from "@/services/Batch/getSingleBatch"
import { getInstructorClasses } from "@/services/batchClass/getClass"
import { IBatch } from "@/types/batch/batch.interface"




export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const resBatch = await getSingleBatch(slug)
    const batch: IBatch | null = resBatch?.data

    const resClasses = batch ? await getInstructorClasses(batch.id!) : null
    const classes = resClasses?.data ?? []

    return (
        <div>
            <InstructorBatchView batch={batch} classes={classes} />
        </div>
    )
}
