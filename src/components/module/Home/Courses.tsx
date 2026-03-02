
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CourseCard } from "../admin/course/CourseCard";
import Link from "next/link";
import { getAllBatch } from "@/services/Batch/getAllBatch";
import { IBatch } from "@/types/batch/batch.interface";
import { getPublicBatches } from "@/services/Batch/getPublicBatches";

export default async function Courses() {
    const batches = await getPublicBatches()
    const popularCourses: IBatch[] = Array.isArray(batches?.data) ? batches.data : []
    return (
        <section id="courses" className="py-20 bg-slate-50 dark:bg-slate-950">
            <div className="container px-4 md:px-6 mx-auto space-y-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Popular Courses
                        </h2>
                        <p className="text-muted-foreground">
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

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
