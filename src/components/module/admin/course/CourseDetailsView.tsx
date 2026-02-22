"use client";

import Image from "next/image";
import InfoRow from "@/components/shared/InfoRow";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";

import {
    BookOpen,
    Calendar,
    DollarSign,
    Layers,
    ListChecks,
    HelpCircle,
} from "lucide-react";

import { ICourse } from "@/types/course/course.interface";

interface Props {
    course: ICourse | null;
}

const CourseDetailsView = ({ course }: Props) => {
    if (!course) {
        return (
            <div className="py-20 text-center text-muted-foreground">
                Course not found
            </div>
        );
    }

    const isFree = course.price === 0;

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 space-y-8">
            {/* ================= HEADER ================= */}
            <div className="flex flex-col md:flex-row gap-8 bg-muted/40 p-6 rounded-xl">
                <div className="relative w-full md:w-72 h-48 rounded-lg overflow-hidden border bg-muted">
                    <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-1">
                    <h1 className="text-3xl font-semibold">{course.title}</h1>

                    <p className="text-muted-foreground mt-3">
                        {course.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                        <Badge variant="outline">{course.level}</Badge>
                        <Badge variant="secondary">{course.category}</Badge>

                        {course.isPremium && (
                            <Badge variant="default">Premium</Badge>
                        )}

                        {course.isFeatured && (
                            <Badge variant="default">Featured</Badge>
                        )}
                    </div>
                </div>
            </div>

            <Separator />

            {/* ================= COURSE INFO ================= */}
            <section>
                <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Course Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-5 rounded-xl">
                    <InfoRow label="Course ID" value={course.id} />
                    <InfoRow label="Slug" value={course.slug} />
                    <InfoRow
                        label="Duration"
                        value={`${course.duration} Hours`}
                    />
                    <InfoRow
                        label="Total Classes"
                        value={`${course.totalClasses}`}
                    />
                </div>
            </section>

            <Separator />

            {/* ================= PRICING ================= */}
            <section>
                <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Pricing & Rating
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-5 rounded-xl">
                    <InfoRow
                        label="Price"
                        value={
                            isFree
                                ? "Free"
                                : `৳ ${course.discountPrice ?? course.price}`
                        }
                    />

                    <InfoRow
                        label="Original Price"
                        value={
                            course.discountPrice
                                ? `৳ ${course.price}`
                                : "—"
                        }
                    />

                    <InfoRow
                        label="Rating"
                        value={`${course.rating.toFixed(1)} ⭐`}
                    />

                    <InfoRow
                        label="Total Reviews"
                        value={`${course.reviewCount}`}
                    />
                </div>
            </section>

            <Separator />

            {/* ================= CURRICULUM ================= */}
            <section>
                <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    <Layers className="h-5 w-5 text-purple-600" />
                    Curriculum
                </h2>

                <div className="bg-muted/50 p-5 rounded-xl space-y-3">
                    {course.curriculum?.length ? (
                        course.curriculum
                            .sort((a, b) => a.order - b.order)
                            .map((item) => (
                                <div
                                    key={item.id}
                                    className="border rounded-lg px-4 py-3 bg-background"
                                >
                                    <p className="font-medium">
                                        {item.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {item.content}
                                    </p>
                                </div>
                            ))
                    ) : (
                        <p className="text-muted-foreground text-sm">
                            No curriculum added.
                        </p>
                    )}
                </div>
            </section>

            <Separator />

            {/* ================= LEARNINGS ================= */}
            <section>
                <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-indigo-600" />
                    What You Will Learn
                </h2>

                <ul className="bg-muted/50 p-5 rounded-xl list-disc list-inside space-y-2">
                    {course.learnings?.length ? (
                        course.learnings.map((item) => (
                            <li key={item.id}>{item.content}</li>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-sm">
                            No learning outcomes added.
                        </p>
                    )}
                </ul>
            </section>

            <Separator />

            {/* ================= REQUIREMENTS ================= */}
            <section>
                <h2 className="font-semibold text-xl mb-4">
                    Requirements
                </h2>

                <ul className="bg-muted/50 p-5 rounded-xl list-disc list-inside space-y-2">
                    {course.requirements?.length ? (
                        course.requirements.map((item) => (
                            <li key={item.id}>{item.content}</li>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-sm">
                            No requirements added.
                        </p>
                    )}
                </ul>
            </section>

            <Separator />

            {/* ================= FAQ ================= */}
            <section>
                <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-orange-600" />
                    FAQs
                </h2>

                <div className="bg-muted/50 p-5 rounded-xl space-y-4">
                    {course.faqs?.length ? (
                        course.faqs.map((faq) => (
                            <div key={faq.id}>
                                <p className="font-medium">
                                    {faq.question}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {faq.answer}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-sm">
                            No FAQs added.
                        </p>
                    )}
                </div>
            </section>

            <Separator />

            {/* ================= SYSTEM INFO ================= */}
            <section>
                <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    System Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-5 rounded-xl">
                    <InfoRow
                        label="Created At"
                        value={formatDateTime(course.createdAt)}
                    />
                    <InfoRow
                        label="Updated At"
                        value={formatDateTime(course.updatedAt)}
                    />
                </div>
            </section>
        </div>
    );
};

export default CourseDetailsView;