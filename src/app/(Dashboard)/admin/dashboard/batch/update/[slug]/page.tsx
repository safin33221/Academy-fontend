import UpdateBatchForm from "@/components/module/admin/batchManagement/UpdateBatchForm";
import { queryStringFormatter } from "@/lib/formatters";
import { getSingleBatch } from "@/services/Batch/getSingleBatch";
import { getAllCourse } from "@/services/course/getAllCourse";
import { getAllUsers } from "@/services/user/getAllUser";
import { IBatch } from "@/types/batch/batch.interface";
import { ICourse } from "@/types/course/course.interface";
import { IUser, IUserRole } from "@/types/user/user";
import { notFound } from "next/navigation";


export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    // ✅ Get Batch
    const resBatch = await getSingleBatch(slug);
    const batch: IBatch | undefined = resBatch?.data

    if (!batch) {
        notFound();
    }

    // ✅ Get Courses
    const resCourse = await getAllCourse();
    const courses: ICourse[] = Array.isArray(resCourse?.data) ? resCourse.data : [];

    // ✅ Get Only Instructors
    const finalParams = {
        role: IUserRole.INSTRUCTOR,
    };

    const queryString = queryStringFormatter(finalParams);
    const resUsers = await getAllUsers(queryString);
    const instructors: IUser[] = Array.isArray(resUsers?.data) ? resUsers.data : [];

    return (
        <div>
            <UpdateBatchForm
                batch={batch}
                courses={courses}
                instructors={instructors}
            />
        </div>
    );
}
