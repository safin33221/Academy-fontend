import CourseManagementHeader from "@/components/module/admin/course/CourseManagementHeader";
import CourseTable from "@/components/module/admin/course/CourseTable";
import { getAllCourse } from "@/services/course/getAllCourse";

export default async function page() {
    const result = await getAllCourse()
    console.log({ result });
    return (
        <div className="space-y-1.5">
            <CourseManagementHeader />
            <CourseTable courses={result?.data} />
        </div>
    );
};
