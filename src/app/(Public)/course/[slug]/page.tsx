import { getSingleCourse } from "@/services/course/getSingleCourse";
import CourseDetailsPageClient from "./CourseDetailsPageClient";
import { ICourse } from "@/types/course/course.interface";
import { getMe } from "@/services/auth/getMe";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const res = await getSingleCourse(slug)
    const course: ICourse = res.data
    const resUser = await getMe()
    const user = resUser?.data
    return < CourseDetailsPageClient course={course} user={user} />;
}
