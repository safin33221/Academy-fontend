import { CourseCard } from "@/components/module/admin/course/CourseCard";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { IBatch } from "@/types/batch/batch.interface";
import { getPublicBatches } from "@/services/Batch/getPublicBatches";

export default async function CoursesPage() {
    const res = await getPublicBatches();
    const batches: IBatch[] = res.data || [];
    return (
        <section className="relative py-24 bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
            <div className="container px-4 md:px-6 mx-auto space-y-14">

                <Breadcrumb />

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-3 max-w-xl">
                        <Badge variant="secondary" className="text-xs">
                            {batches.length}+ Courses Available
                        </Badge>

                        <h1 className="text-4xl font-bold tracking-tight">
                            Explore Our Popular Courses
                        </h1>

                        <p className="text-muted-foreground">
                            Level up your skills with industry-ready training designed by experts.
                        </p>
                    </div>

                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search courses..."
                            className="pl-9 h-11"
                        />
                    </div>
                </div>

                {/* Course Grid */}
                {batches.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                        {batches.map((batch) => (
                            <div
                                key={batch.id}
                                className="group transition-all duration-300 hover:-translate-y-1"
                            >
                                <CourseCard batch={batch} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 space-y-4">
                        <h3 className="text-xl font-semibold">No Courses Found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search or check back later.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}