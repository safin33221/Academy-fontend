import CourseUpdateForm from "@/components/module/admin/course/CourseUpdateForm";
import { getSingleCourse } from "@/services/course/getSingleCourse";

export default async function page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const res = await getSingleCourse(slug)
    const course = res.data
    return (
        <div>
            <CourseUpdateForm course={course} />
        </div>
    );
};
