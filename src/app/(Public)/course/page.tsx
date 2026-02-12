import { courses } from "../../../../public/data/courses";
import { CourseCard } from "@/components/module/course/CourseCard";
import Breadcrumb from "@/components/shared/Breadcrumb";


export default function page() {
    const allCourses = courses
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950 pt-28">
            <div className="container px-4 md:px-6 mx-auto space-y-12">
                <Breadcrumb />
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Popular Courses
                        </h2>
                        <p className="text-muted-foreground">
                            Explore our highest-rated courses chosen by students like you.
                        </p>
                    </div>

                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {allCourses.map((course) =>
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
