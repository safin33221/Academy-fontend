import { Metadata } from "next";
import CourseDetailsPageClient from "./CourseDetailsPageClient";
import { getMe } from "@/services/auth/getMe";
import { getSingleBatch } from "@/services/Batch/getSingleBatch";
import { IBatch } from "@/types/batch/batch.interface";

export async function generateMetadata(
    props: {
        params: Promise<{ slug: string }>;
    }
): Promise<Metadata> {

    const { slug } = await props.params;

    console.log("Slug in metadata:", slug);

    if (!slug) {
        return { title: "Course" };
    }

    const res = await getSingleBatch(slug);
    const batch: IBatch | undefined = res?.data;

    if (!batch) {
        return { title: "Course Not Found" };
    }

    const course = batch.course;

    return {
        title: `${course.title} (${batch.name})`,
        description: course.shortDescription,
    };
}

export default async function Page(
    props: {
        params: Promise<{ slug: string }>;
    }
) {
    const { slug } = await props.params;

    console.log("Slug in page:", slug);

    const res = await getSingleBatch(slug);
    const batch: IBatch = res.data;

    const resUser = await getMe();
    const user = resUser?.data;

    return <CourseDetailsPageClient batch={batch} user={user} />;
}