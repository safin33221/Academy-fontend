import BatchDetails from "@/components/module/admin/batchManagement/BatchDetails"
import { getSingleBatch } from "@/services/Batch/getSingleBatch"



export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const res = await getSingleBatch(slug)
    const batch = res.data
    console.log({ batch });
    return (
        <div>
            <BatchDetails batch={batch} />
        </div>
    )
}