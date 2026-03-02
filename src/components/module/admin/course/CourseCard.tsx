"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, Star, ArrowRight } from "lucide-react";
import { IBatch } from "@/types/batch/batch.interface";
import { cn } from "@/lib/utils";

// Progress bar component
function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
            <div
                className="h-full bg-primary transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
            />
        </div>
    );
}

interface CourseCardProps {
    batch: IBatch
    variant?: "default" | "compact" | "featured";
    showProgress?: boolean;
    progress?: number;
    className?: string;
}

export function CourseCard({
    batch,
    variant = "default",
    showProgress = false,
    progress = 0,
    className
}: CourseCardProps) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    if (!batch) return null;


    const course = batch?.course

    if (!course?.title) return null;

    const imageSrc = !imageError ? batch.thumbnail : null;
    const courseSlug = ("slug" in batch && batch.slug) || course.slug;
    const batchName = "name" in batch ? batch.name : undefined;
    const price = course.discountPrice ?? course.price;

    // Format price
    const formattedPrice = typeof price === "number"
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BTD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price)
        : "Free";

    // Determine if it's a batch or course
    const isBatch = "startDate" in batch;
    const startDate = isBatch ? new Date((batch as IBatch).startDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }) : null;

    // Variant styles
    const variantStyles = {
        default: "flex-col",
        compact: "flex-row items-center gap-3 p-2",
        featured: "flex-col md:flex-row md:items-center gap-4"
    };

    return (
        <Card
            className={cn(
                "group relative overflow-hidden rounded-xl border border-border/50 bg-background transition-all duration-500 hover:shadow-xl",
                variantStyles[variant],
                className
            )}
        >
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Thumbnail Section */}
            <div className={cn(
                "relative overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900",
                variant === "compact" ? "w-20 h-20 rounded-lg" : "aspect-video w-full"
            )}>
                {imageSrc ? (
                    <>
                        {!isImageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
                                <BookOpen className="h-8 w-8 text-muted-foreground/30" />
                            </div>
                        )}
                        <Image
                            src={imageSrc}
                            alt={course.title}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className={cn(
                                "object-cover transition-all duration-700 ease-out group-hover:scale-110",
                                isImageLoaded ? "opacity-100" : "opacity-0"
                            )}
                            onLoad={() => setIsImageLoaded(true)}
                            onError={() => setImageError(true)}
                        />
                    </>
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground bg-linear-to-br from-primary/5 to-primary/10">
                        <BookOpen className="h-8 w-8 opacity-40" />
                        <span className="text-xs font-medium opacity-40">No Image</span>
                    </div>
                )}

                {/* Category Badge */}
                {course.category && variant !== "compact" && (
                    <div className="absolute top-3 left-3">
                        <Badge
                            variant="secondary"
                            className="text-[10px] sm:text-xs px-2.5 py-1 font-medium backdrop-blur-sm bg-background/80 hover:bg-background/90 shadow-sm"
                        >
                            {course.category}
                        </Badge>
                    </div>
                )}

                {/* Batch Status Badge (if applicable) */}
                {isBatch && (batch as IBatch).status && (
                    <div className="absolute top-3 right-3">
                        <Badge
                            variant={
                                (batch as IBatch).status === "ONGOING" ? "default" :
                                    (batch as IBatch).status === "UPCOMING" ? "secondary" : "outline"
                            }
                            className="text-[10px] sm:text-xs px-2.5 py-1 font-medium backdrop-blur-sm shadow-sm"
                        >
                            {(batch as IBatch).status}
                        </Badge>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className={cn(
                "flex-1",
                variant === "compact" ? "p-2" : "p-4 md:p-5"
            )}>
                {/* Title */}
                <h3 className={cn(
                    "font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300",
                    variant === "compact" ? "text-sm" : "text-base md:text-lg"
                )}>
                    {course.title}
                    {batchName && variant !== "compact" && (
                        <span className="block text-sm font-normal text-muted-foreground mt-0.5">
                            {batchName}
                        </span>
                    )}
                </h3>

                {/* Course Metadata */}
                {variant !== "compact" && (
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
                        {course.duration && (
                            <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{course.duration}</span>
                            </div>
                        )}
                        {batch.enrolledCount !== undefined && (
                            <div className="flex items-center gap-1">
                                <Users className="h-3.5 w-3.5" />
                                <span>{batch.enrolledCount} + enrolled</span>
                            </div>
                        )}
                        {course.rating && (
                            <div className="flex items-center gap-1 text-amber-500">
                                <Star className="h-3.5 w-3.5 fill-current" />
                                <span>{course.rating.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Start Date for Batches */}
                {isBatch && startDate && variant !== "compact" && (
                    <p className="text-xs text-muted-foreground mt-2">
                        Starts {startDate}
                    </p>
                )}

                {/* Progress Bar */}
                {showProgress && variant !== "compact" && <ProgressBar progress={progress} />}
            </div>

            {/* Footer Section */}
            <div className={cn(
                "flex items-center justify-between",
                variant === "compact" ? "p-2" : "p-4 md:p-5 pt-0 md:pt-0"
            )}>
                {/* Price */}
                <div className="flex flex-col">
                    {course.discountPrice && (
                        <span className="text-xs line-through text-muted-foreground">
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0
                            }).format(course.price || 0)}
                        </span>
                    )}
                    <span className={cn(
                        "font-bold text-primary",
                        variant === "compact" ? "text-sm" : "text-lg"
                    )}>
                        {formattedPrice}
                    </span>
                </div>

                {/* Action Button */}
                <Link href={courseSlug ? `/course/${courseSlug}` : "#"}
                    className={cn(variant === "compact" && "shrink-0")}>
                    <Button
                        size={variant === "compact" ? "sm" : "default"}
                        variant="outline"
                        className={cn(
                            "group/btn relative overflow-hidden transition-all duration-300",
                            "hover:border-primary hover:text-primary",
                            variant !== "compact" && "gap-2"
                        )}
                    >
                        <span>Details</span>
                        {variant !== "compact" && (
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        )}
                    </Button>
                </Link>
            </div>

            {/* Featured Badge */}
            {variant === "featured" && (
                <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold shadow-lg">
                        Featured
                    </Badge>
                </div>
            )}
        </Card>
    );
}