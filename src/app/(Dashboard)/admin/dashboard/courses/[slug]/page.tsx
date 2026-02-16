import CourseDetailsView from "@/components/module/admin/course/CourseDetailsView";
import { getSingleCourse } from "@/services/course/getSingleCourse"

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const res = await getSingleCourse(slug)

    return (
        <div>
            <CourseDetailsView course={res?.data} />
        </div>
    )
}