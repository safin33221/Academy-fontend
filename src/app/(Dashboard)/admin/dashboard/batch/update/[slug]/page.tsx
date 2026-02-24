import UpdateBatchForm from "@/components/module/admin/batchManagement/UpdateBatchForm";
import { getSingleBatch } from "@/services/Batch/getSingleBatch";
import { getAllCourse } from "@/services/course/getAllCourse";
import { IBatch } from "@/types/batch/batch.interface";
import { ICourse } from "@/types/course/course.interface";

export default async function page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const resBatch = await getSingleBatch(slug)
    const resCourse = await getAllCourse()
    const batch: IBatch = resBatch?.data
    const courses: ICourse[] = resCourse?.data

    return (
        <div>
            <UpdateBatchForm batch={batch} courses={courses} />
        </div >
    );
};
