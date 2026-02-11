
import {
    BookOpen,
    Clock,
    Award,
    BarChart,
    Share2,
    PlayCircle,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Course } from "../../../public/data/courses";


interface CoursePreviewCardProps {
    course: Course;
    onEnroll: () => void;
}

export function CoursePreviewCard({
    course,
    onEnroll,
}: CoursePreviewCardProps) {
    const discount =
        course.discountPrice &&
        Math.round(
            ((course.price - course.discountPrice) / course.price) * 100
        );

    return (
        <div className="lg:sticky lg:top-24">
            <Card className="overflow-hidden rounded-3xl border shadow-xl bg-background">

                {/* Thumbnail */}
                <div className="relative aspect-video group cursor-pointer">
                    {course.thumbnail ? (
                        <Image

                            src={course.thumbnail}

                            alt={course.title}
                            height={100}
                            width={100}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-muted">
                            <BookOpen className="h-12 w-12 text-muted-foreground/40" />
                        </div>
                    )}

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                        <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                            <PlayCircle className="h-7 w-7 text-primary ml-1" />
                        </div>
                    </div>
                </div>

                <CardContent className="p-8 space-y-8">

                    {/* Price Section */}
                    <div className="flex items-center gap-3">
                        <span className="text-4xl font-bold text-primary">
                            ${course.discountPrice ?? course.price}
                        </span>

                        {course.discountPrice && (
                            <>
                                <span className="text-lg text-muted-foreground line-through">
                                    ${course.price}
                                </span>
                                <Badge variant="destructive">
                                    {discount}% OFF
                                </Badge>
                            </>
                        )}
                    </div>

                    {/* Enroll Button */}
                    <Button
                        onClick={onEnroll}
                        className="w-full h-12 text-base font-semibold"
                    >
                        Enroll Now
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                        30-Day Money-Back Guarantee
                    </p>

                    {/* Course Info */}
                    <div className="space-y-4 pt-4 border-t">
                        <h4 className="text-sm font-semibold">
                            This course includes:
                        </h4>

                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-3">
                                <Clock className="h-4 w-4 text-foreground" />
                                {course.duration} hours on-demand video
                            </li>

                            <li className="flex items-center gap-3">
                                <BookOpen className="h-4 w-4 text-foreground" />
                                {course.totalClasses} lessons
                            </li>

                            <li className="flex items-center gap-3">
                                <BarChart className="h-4 w-4 text-foreground" />
                                {course.level} Level
                            </li>

                            <li className="flex items-center gap-3">
                                <Award className="h-4 w-4 text-foreground" />
                                Certificate of completion
                            </li>
                        </ul>
                    </div>

                    {/* Share */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-muted-foreground"
                    >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Course
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
