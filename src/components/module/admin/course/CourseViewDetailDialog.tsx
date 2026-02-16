"use client";

import Image from "next/image";
import InfoRow from "@/components/shared/InfoRow";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";

import {
    BookOpen,
    Calendar,
    DollarSign,
    Layers, ListChecks,
    HelpCircle
} from "lucide-react";

import { ICourse } from "@/types/course/course.interface";

interface Props {
    open: boolean;
    onClose: () => void;
    course: ICourse | null;
}

const CourseViewDetailDialog = ({ open, onClose, course }: Props) => {
    if (!course) return null;

    const isFree = course.price === 0;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Course Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row gap-6 p-6 bg-muted/40 rounded-lg">
                        <div className="relative w-full md:w-64 h-40 rounded-lg overflow-hidden border bg-muted">
                            <Image
                                src="/placeholder.png"
                                alt={course.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold">{course.title}</h2>

                            <p className="text-muted-foreground mt-2">
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

                    {/* Basic Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                            Course Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
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
                    </div>

                    <Separator />

                    {/* Pricing & Rating */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            Pricing & Rating
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
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
                    </div>

                    <Separator />

                    {/* Curriculum */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Layers className="h-5 w-5 text-purple-600" />
                            Curriculum
                        </h3>

                        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                            {course.curriculum?.length ? (
                                course.curriculum
                                    .sort((a, b) => a.order - b.order)
                                    .map((item) => (
                                        <div
                                            key={item.id}
                                            className="border rounded-md px-3 py-2 bg-background"
                                        >
                                            <p className="font-medium">{item.title}</p>
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
                    </div>

                    <Separator />

                    {/* Learnings */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <ListChecks className="h-5 w-5 text-indigo-600" />
                            What You Will Learn
                        </h3>

                        <ul className="bg-muted/50 p-4 rounded-lg list-disc list-inside space-y-1">
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
                    </div>

                    <Separator />

                    {/* Requirements */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Requirements
                        </h3>

                        <ul className="bg-muted/50 p-4 rounded-lg list-disc list-inside space-y-1">
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
                    </div>

                    <Separator />

                    {/* FAQs */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <HelpCircle className="h-5 w-5 text-orange-600" />
                            FAQs
                        </h3>

                        <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                            {course.faqs?.length ? (
                                course.faqs.map((faq) => (
                                    <div key={faq.id}>
                                        <p className="font-medium">{faq.question}</p>
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
                    </div>

                    <Separator />

                    {/* System Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-orange-600" />
                            System Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                            <InfoRow
                                label="Created At"
                                value={formatDateTime(course.createdAt)}
                            />
                            <InfoRow
                                label="Updated At"
                                value={formatDateTime(course.updatedAt)}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CourseViewDetailDialog;