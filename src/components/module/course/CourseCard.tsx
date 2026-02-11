"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Course } from "../../../../public/data/courses";

interface CourseCardProps {
    course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    return (
        <Card className="group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-background transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {course.thumbnail ? (
                    <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <BookOpen className="h-8 w-8 opacity-30" />
                    </div>
                )}

                {/* Category */}
                <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-xs">
                        {course.category}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <CardContent className="p-4">
                <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                </h3>
            </CardContent>

            {/* Footer */}
            <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
                <span className="text-lg font-bold text-primary">
                    ${course.discountPrice ?? course.price}
                </span>

                <Link href={`/course/${course.slug}`}>
                    <Button size="sm" variant="outline">
                        View
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
