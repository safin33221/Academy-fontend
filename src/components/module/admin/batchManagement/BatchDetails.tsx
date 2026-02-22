"use client";

import { IBatch } from "@/types/batch/batch.interface";
import {
    Calendar,
    Users,
    Clock,
    BookOpen,
    Star,
    BadgeCheck,
} from "lucide-react";
import Image from "next/image";

export default function BatchDetails({ batch }: { batch: IBatch }) {
    if (!batch) return null
    const { course } = batch;

    const enrollmentPercent =
        (batch.enrolledCount / batch.maxStudents) * 100;

    const statusColor = {
        UPCOMING: "bg-blue-100 text-blue-600",
        ONGOING: "bg-green-100 text-green-600",
        COMPLETED: "bg-gray-200 text-gray-600",
        CANCELLED: "bg-red-100 text-red-600",
    };

    const finalPrice =
        course.discountPrice ?? course.price;

    return (
        <div className="min-h-screen bg-background pt-16">
            <div className="container mx-auto px-4 md:px-6 py-12 space-y-16">

                {/* ================= HERO ================= */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">

                        <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor[batch.status]}`}
                        >
                            {batch.status}
                        </span>

                        <h1 className="text-4xl font-bold leading-tight">
                            {batch.name}
                        </h1>

                        <p className="text-muted-foreground">
                            {course.shortDescription}
                        </p>

                        {/* Meta */}
                        <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Start Date:{" "}
                                {new Date(batch.startDate).toLocaleDateString()}
                            </div>

                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {batch.enrolledCount}/{batch.maxStudents} Students
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Duration: {course.duration} Hours
                            </div>

                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                {course.totalClasses} Classes
                            </div>
                        </div>

                        {/* Enrollment Progress */}
                        <div className="space-y-2">
                            <div className="text-sm font-medium">
                                Enrollment Progress
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full"
                                    style={{ width: `${enrollmentPercent}%` }}
                                />
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {Math.round(enrollmentPercent)}% filled
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-semibold">
                                ৳ {finalPrice}
                            </span>

                            {course.discountPrice && (
                                <span className="line-through text-muted-foreground">
                                    ৳ {course.price}
                                </span>
                            )}

                            {course.isPremium && (
                                <span className="flex items-center gap-1 text-yellow-600 text-sm">
                                    <BadgeCheck className="h-4 w-4" />
                                    Premium
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Thumbnail */}
                    <div className="rounded-2xl overflow-hidden border shadow-sm">
                        <Image
                            height={100}
                            width={300}
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full object-cover"
                        />
                    </div>
                </div>

                {/* ================= COURSE DETAILS ================= */}
                <div className="space-y-12">

                    {/* Description */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">
                            Course Description
                        </h2>
                        <p className="text-muted-foreground leading-relaxed max-w-4xl">
                            {course.fullDescription}
                        </p>
                    </section>



                    {/* Reviews Summary */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">
                            Reviews Summary
                        </h2>

                        <div className="flex items-center gap-3 text-yellow-500">
                            <Star className="h-5 w-5 fill-current" />
                            <span className="text-lg font-semibold">
                                {course.rating}
                            </span>
                            <span className="text-muted-foreground text-sm">
                                ({course.reviewCount} reviews)
                            </span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
