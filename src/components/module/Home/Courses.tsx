import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { courses } from "../../../../public/data/courses";
import { CourseCard } from "../course/CourseCard";
import Link from "next/link";

export default function Courses() {
    const popularCourses = courses
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

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {popularCourses.map((course) =>
                        <div key={course.id} className="h-full">
                            <CourseCard
                                course={course}
                            />

                        </div>
                    )}
                </div>
            </div>
        </section>

    );
};
