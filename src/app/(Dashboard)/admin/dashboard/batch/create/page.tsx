import BatchCreateForm from "@/components/module/admin/batchManagement/CreateBatchFrom";
import { getAllCourse } from "@/services/course/getAllCourse";
import { ICourse } from "@/types/course/course.interface";

export default async function page() {
    const res = await getAllCourse()
    const courses: ICourse[] = res?.data
    return (
        <div>
            <BatchCreateForm courses={courses} />
        </div>
    );
};
