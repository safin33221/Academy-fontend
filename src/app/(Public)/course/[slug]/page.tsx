import { getSingleCourse } from "@/services/course/getSingleCourse";
import CourseDetailsPageClient from "./CourseDetailsPageClient";
import { ICourse } from "@/types/course/course.interface";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const res = await getSingleCourse(slug)
    const course: ICourse = res.data
    return < CourseDetailsPageClient course={course} />;
}
