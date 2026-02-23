import { getSingleCourse } from "@/services/course/getSingleCourse";
import CourseDetailsPageClient from "./CourseDetailsPageClient";
import { ICourse } from "@/types/course/course.interface";
import { getMe } from "@/services/auth/getMe";
import { getSingleBatch } from "@/services/Batch/getSingleBatch";
import { IBatch } from "@/types/batch/batch.interface";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const res = await getSingleBatch(slug)
    const batch: IBatch = res.data
    const resUser = await getMe()
    const user = resUser?.data
    return < CourseDetailsPageClient batch={batch} user={user} />;
}
