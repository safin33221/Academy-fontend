import { Metadata } from "next";
import CourseDetailsPageClient from "./CourseDetailsPageClient";
import { getMe } from "@/services/auth/getMe";
import { getSingleBatch } from "@/services/Batch/getSingleBatch";
import { IBatch } from "@/types/batch/batch.interface";
import { notFound } from "next/navigation";

export async function generateMetadata(
    props: {
        params: Promise<{ slug: string }>;
    }
): Promise<Metadata> {

    const { slug } = await props.params;

    if (!slug) {
        return {
            title: "Course | Nexaali Academy",
            description:
                "Explore professional tech courses at Nexaali Academy and build industry-ready skills.",
        };
    }

    const res = await getSingleBatch(slug);
    const batch: IBatch | undefined = res?.data;

    if (!batch) {
        return {
            title: "Course Not Found | Nexaali Academy",
            description: "The requested course could not be found.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const course = batch.course;

    const title = `${course.title} - (${batch.name}) | Nexaali Academy`;
    const description =
        course.shortDescription ||
        `Learn ${course.title} with structured batch learning at Nexaali Academy. Industry-ready skills, real projects, and expert mentorship.`;

    const url = `https://nexaali.academy/courses/${slug}`;

    return {
        title,
        description,

        keywords: [
            course.title,
            `${course.title} course`,
            `${course.title} training`,
            `${course.title} online course`,
            "programming course",
            "web development training",
            "tech courses",
            "Nexaali Academy",
        ],

        alternates: {
            canonical: url,
        },

        openGraph: {
            title,
            description,
            url,
            siteName: "Nexaali Academy",
            type: "website",
            images: [
                {
                    url: course.thumbnail || "/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: course.title,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [course.thumbnail || "/og-image.png"],
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

export default async function Page(
    props: {
        params: Promise<{ slug: string }>;
    }
) {

    const { slug } = await props.params;

    const res = await getSingleBatch(slug);
    const batch: IBatch | undefined = res?.data;

    if (!batch) {
        notFound();
    }

    const resUser = await getMe();
    const user = resUser?.data;

    return <CourseDetailsPageClient batch={batch} user={user} />;
}