import Image from "next/image";
import { DateCell } from "@/components/shared/cell/DateCell";
import { columns } from "@/components/shared/ManagementTable";

import {
    BookOpen,
    Star,
    Users,
    BadgeCheck,
    Globe,
} from "lucide-react";
import { ICourse } from "@/types/course/course.interface";

export const CourseColumn: columns<ICourse>[] = [
    {
        header: "Course",
        accessor: (course) => (
            <div className="flex items-center gap-3">
                <div className="relative h-12 w-16 overflow-hidden rounded-md border">
                    <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                        {course.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        ID: {course.id.slice(0, 8)}...
                    </span>
                </div>
            </div>
        ),
    },
    {
        header: "Type",
        accessor: (course) => (
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700 uppercase">
                <Globe size={12} />
                {course.type}
            </span>
        ),
        className: "text-center",
    },
    {
        header: "Level",
        accessor: (course) => (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 uppercase">
                <BookOpen size={12} />
                {course.level}
            </span>
        ),
        className: "text-center",
    },
    {
        header: "Price",
        accessor: (course) => (
            <div className="flex flex-col text-sm text-muted-foreground">
                {course.discountPrice ? (
                    <>
                        <span className="line-through text-xs text-red-500">
                            ৳ {course.price}
                        </span>
                        <span className="font-medium text-foreground">
                            ৳ {course.discountPrice}
                        </span>
                    </>
                ) : (
                    <span className="font-medium text-foreground">
                        {course.price === 0 ? "Free" : `৳ ${course.price}`}
                    </span>
                )}
            </div>
        ),
        className: "text-center",
    },
    {
        header: "Access",
        accessor: (course) => (
            <span
                className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
        ${course.access === "FREE"
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
            >
                {course.access}
            </span>
        ),
        className: "text-center",
    },
    {
        header: "Enrollments",
        accessor: (course) => (
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Users size={14} />
                {course.totalEnrollments}
            </span>
        ),
        className: "text-center",
    },
    {
        header: "Rating",
        accessor: (course) => (
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Star size={14} className="text-yellow-500" />
                {course.averageRating || 0} ({course.totalReviews})
            </span>
        ),
        className: "text-center",
    },
    {
        header: "Status",
        accessor: (course) => (
            <span
                className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
        ${course.status === "PUBLISHED"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
            >
                {course.status}
            </span>
        ),
        className: "text-center",
    },
    {
        header: "Approved",
        accessor: (course) => (
            <span
                className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
        ${course.approved
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
            >
                <BadgeCheck size={12} />
                {course.approved ? "Approved" : "Pending"}
            </span>
        ),
        className: "text-center",
    },
    {
        header: "Created At",
        accessor: (course) => (
            <span className="text-sm text-muted-foreground">
                <DateCell date={course.createdAt} />
            </span>
        ),
    },
];