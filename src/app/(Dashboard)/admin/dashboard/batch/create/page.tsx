import BatchCreateForm from "@/components/module/admin/batchManagement/CreateBatchFrom";
import { ICourse } from "@/types/course/course.interface";

export default function page() {
    const courses: ICourse[] = []
    return (
        <div>
            <BatchCreateForm courses={courses} />
        </div>
    );
};
