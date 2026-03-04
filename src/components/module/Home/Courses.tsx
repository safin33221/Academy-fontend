
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CourseCard } from "../admin/course/CourseCard";
import Link from "next/link";
import { IBatch } from "@/types/batch/batch.interface";
import { getPublicBatches } from "@/services/Batch/getPublicBatches";

export default async function Courses() {
    const batches = await getPublicBatches()
    const popularCourses: IBatch[] = Array.isArray(batches?.data) ? batches.data : []
    return (
        <section id="courses" className="bg-slate-50 py-14 sm:py-16 md:py-20 dark:bg-slate-950">
            <div className="container mx-auto space-y-8 px-4 sm:space-y-10 sm:px-6 md:space-y-12 lg:px-8">
                <div className="flex flex-col items-start justify-between gap-4 sm:gap-5 md:flex-row md:items-center">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Popular Courses
                        </h2>
                        <p className="text-sm text-muted-foreground sm:text-base">
                            Explore our highest-rated courses chosen by students like you.
                        </p>
                    </div>
                    <Link href={`/course`}>
                        <Button
                            variant="ghost"
                        >

                            View All Courses{' '}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                    {popularCourses.map((course: IBatch) =>
                        <div key={course.id} className="h-full">
                            <CourseCard
                                batch={course}
                            />

                        </div>
                    )}
                </div>
            </div>
        </section>

    );
};
