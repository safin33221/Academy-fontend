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
    Globe,
    Layers,
    Star,
    Users,
    BadgeCheck,
} from "lucide-react";
import { ICourse } from "@/types/course/course.interface";

interface ICourseViewDetailDialogProps {
    open: boolean;
    onClose: () => void;
    course: ICourse | null;
}

const CourseViewDetailDialog = ({
    open,
    onClose,
    course,
}: ICourseViewDetailDialogProps) => {
    if (!course) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Course Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row gap-6 p-6 bg-muted/40 rounded-lg mb-6">
                        <div className="relative w-full md:w-64 h-40 rounded-lg overflow-hidden border shadow">
                            <Image
                                src={course.thumbnail}
                                alt={course.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold">{course.title}</h2>
                            <p className="text-muted-foreground mt-2">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-4">
                                <Badge variant="outline">{course.level}</Badge>
                                <Badge variant="secondary">{course.type}</Badge>
                                <Badge
                                    variant={course.status === "PUBLISHED" ? "default" : "outline"}
                                >
                                    {course.status}
                                </Badge>
                                <Badge
                                    variant={course.approved ? "default" : "destructive"}
                                    className="flex items-center gap-1"
                                >
                                    <BadgeCheck className="h-3 w-3" />
                                    {course.approved ? "Approved" : "Pending"}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Sections */}
                    <div className="space-y-6">
                        {/* Course Information */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                                Course Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow label="Course ID" value={course.id} />
                                <InfoRow label="Slug" value={course.slug} />
                                <InfoRow label="Access" value={course.access} />
                                <InfoRow
                                    label="Duration"
                                    value={`${course.durationInWeeks} Weeks`}
                                />
                                <InfoRow
                                    label="Certificate"
                                    value={course.certificateEnabled ? "Enabled" : "Disabled"}
                                />
                                <InfoRow
                                    label="Premium"
                                    value={course.isPremium ? "Yes" : "No"}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Pricing & Stats */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-green-600" />
                                Pricing & Statistics
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Price"
                                    value={
                                        course.price === 0
                                            ? "Free"
                                            : `৳ ${course.price}`
                                    }
                                />
                                <InfoRow
                                    label="Discount Price"
                                    value={
                                        course.discountPrice
                                            ? `৳ ${course.discountPrice}`
                                            : "No Discount"
                                    }
                                />
                                <InfoRow
                                    label="Total Enrollments"
                                    value={`${course.totalEnrollments}`}
                                />
                                <InfoRow
                                    label="Rating"
                                    value={`${course.averageRating} (${course.totalReviews} reviews)`}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Modules */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Layers className="h-5 w-5 text-purple-600" />
                                Modules
                            </h3>

                            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                                {course.modules.length > 0 ? (
                                    course.modules.map((module) => (
                                        <div
                                            key={module.id}
                                            className="flex items-center justify-between border rounded-md px-3 py-2 bg-background"
                                        >
                                            <span>{module.title}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground text-sm">
                                        No modules added.
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
                                    label="Last Updated"
                                    value={formatDateTime(course.updatedAt)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CourseViewDetailDialog;