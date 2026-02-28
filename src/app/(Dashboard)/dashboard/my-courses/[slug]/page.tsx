import MyCourseClassesView from "@/components/module/student/myCourses/MyCourseClassesView";
import { getStudentClasses } from "@/services/batchClass/getStudentClasses";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const res = await getStudentClasses(slug);
    const myClass = Array.isArray(res?.data) ? res.data : [];

    return (
        <MyCourseClassesView classes={myClass} batchSlug={slug} />
    );
}
