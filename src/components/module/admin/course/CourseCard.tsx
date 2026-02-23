"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { IBatch } from "@/types/batch/batch.interface";
import { ICourse } from "@/types/course/course.interface";

interface CourseCardProps {
    batch: IBatch | (Partial<ICourse> & { slug?: string; name?: string; thumbnail?: string });
}

export function CourseCard({ batch }: CourseCardProps) {
    if (!batch) return null;

    const hasNestedCourse = "course" in batch && !!(batch as IBatch).course;
    const course = hasNestedCourse
        ? (batch as IBatch).course
        : (batch as Partial<ICourse>);

    if (!course?.title) return null;

    const imageSrc = course.thumbnail || ("thumbnail" in batch ? batch.thumbnail : undefined);
    const courseSlug = ("slug" in batch && batch.slug) || course.slug;
    const batchName = "name" in batch ? batch.name : undefined;
    const price = course.discountPrice ?? course.price;

    return (
        <Card className="group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-background transition-all duration-500 hover:shadow-xl hover:-translate-y-1 gap-3 ">

            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={course.title}
                        fill
                        sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <BookOpen className="h-8 w-8 opacity-30" />
                    </div>
                )}

                {/* Category */}
                <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="text-[10px] sm:text-xs px-2 py-1">
                        {course.category}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <CardContent className=" md:p-4">
                <h3 className="font-semibold text-sm sm:text-lg md:text-base line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {course.title}
                    {batchName ? (
                        <>
                            -<br />
                            {batchName}
                        </>
                    ) : null}
                </h3>
            </CardContent>

            {/* Footer */}
            <CardFooter className=" sm:p-4 pt-0 flex items-center justify-between mt-auto">
                <span className="text-sm sm:text-base md:text-lg font-bold text-primary">
                    {typeof price === "number" ? `$${price}` : "N/A"}
                </span>

                <Link href={courseSlug ? `/course/${courseSlug}` : "/course"}>
                    <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                        Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
