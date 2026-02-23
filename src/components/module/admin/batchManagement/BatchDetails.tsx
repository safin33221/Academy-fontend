/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { IBatch } from "@/types/batch/batch.interface";
import { IUser } from "@/types/user/user";
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
                            className="w-full max-h-96 object-cover transition-transform duration-500 group-hover:scale-105"
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


                    {/* ================= ENROLLED STUDENTS ================= */}
                    {/* ================= ENROLLED STUDENTS TABLE ================= */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">
                                Enrolled Students
                            </h2>

                            <div className="flex items-center gap-3">
                                <span className="text-sm text-muted-foreground">
                                    {batch.enrollments?.length || 0} Students
                                </span>

                                <Button className="px-4 py-2 text-sm bg-primary text-white rounded-lg">
                                    Send Email
                                </Button>
                            </div>
                        </div>

                        {batch.enrollments?.length === 0 ? (
                            <div className="text-muted-foreground text-sm">
                                No students enrolled yet.
                            </div>
                        ) : (
                            <div className="overflow-x-auto border rounded-xl">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50 text-left">
                                        <tr>
                                            <th className="px-4 py-3">Student</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">Assignments</th>
                                            <th className="px-4 py-3">Attendance</th>
                                            <th className="px-4 py-3">Progress</th>
                                            <th className="px-4 py-3 text-right">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {batch.enrollments.map((item: any) => {
                                            const user = item.user;

                                            // Example placeholders (replace with real data)
                                            const assignmentMark = user.assignmentMark ?? 85;
                                            const attendance = user.attendancePercent ?? 90;
                                            const progress = user.progressPercent ?? 70;

                                            return (
                                                <tr
                                                    key={item.id}
                                                    className="border-t hover:bg-muted/40 transition"
                                                >
                                                    {/* Student Info */}
                                                    <td className="px-4 py-3 flex items-center gap-3">
                                                        <div className="h-9 w-9 rounded-full overflow-hidden bg-muted flex items-center justify-center text-xs font-medium">
                                                            {user.profilePhoto ? (
                                                                <Image
                                                                    src={user.profilePhoto}
                                                                    alt={user.name}
                                                                    width={36}
                                                                    height={36}
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                user.name?.charAt(0)
                                                            )}
                                                        </div>
                                                        <span className="font-medium">
                                                            {user.name}
                                                        </span>
                                                    </td>

                                                    {/* Email */}
                                                    <td className="px-4 py-3 text-muted-foreground">
                                                        {user.email}
                                                    </td>

                                                    {/* Assignment */}
                                                    <td className="px-4 py-3">
                                                        {assignmentMark}%
                                                    </td>

                                                    {/* Attendance */}
                                                    <td className="px-4 py-3">
                                                        {attendance}%
                                                    </td>

                                                    {/* Progress Bar */}
                                                    <td className="px-4 py-3 w-40">
                                                        <div className="w-full bg-muted rounded-full h-2">
                                                            <div
                                                                className="bg-primary h-2 rounded-full"
                                                                style={{ width: `${progress}%` }}
                                                            />
                                                        </div>
                                                    </td>

                                                    {/* Action */}
                                                    <td className="px-4 py-3 text-right">
                                                        <button className="text-sm text-primary underline">
                                                            Email
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div >
            </div >
        </div >
    );
}
