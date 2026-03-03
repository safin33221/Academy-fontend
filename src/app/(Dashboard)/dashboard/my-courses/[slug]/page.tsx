import MyCourseClassesView from "@/components/module/student/myCourses/MyCourseClassesView";
import { getSingleBatch } from "@/services/Batch/getSingleBatch";
import { getStudentClasses } from "@/services/batchClass/getStudentClasses";
import { getMyBatchClassAttendance } from "@/services/student/getMyBatchClassAttendance";


export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const res = await getStudentClasses(slug);
    const myClass = Array.isArray(res?.data) ? res.data : [];
    const resBatch = await getSingleBatch(slug)
    const resAttendance = await getMyBatchClassAttendance(slug)
    const myAttendance = resAttendance?.data

    const batch = resBatch.data
    console.log({ myAttendance });


    return (
        <MyCourseClassesView classes={myClass} batch={batch} myAttendance={myAttendance} />
    );
}
