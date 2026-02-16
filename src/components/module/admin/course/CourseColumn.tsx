import { DateCell } from "@/components/shared/cell/DateCell";
import { columns } from "@/components/shared/ManagementTable";
import { BookOpen, Star, BadgeCheck } from "lucide-react";
import { ICourse } from "@/types/course/course.interface";

export const CourseColumn: columns<ICourse>[] = [
    {
        header: "Course",
        accessor: (course) => (
            <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                    {course.title}
                </span>
                <span className="text-xs text-muted-foreground">
                    {course.slug}
                </span>
            </div>
        ),
    },

    {
        header: "Category",
        accessor: (course) => (
            <span className="text-sm text-muted-foreground">
                {course.category}
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
        header: "Duration",
        accessor: (course) => (
            <span className="text-sm text-muted-foreground">
                {course.duration}h
            </span>
        ),
        className: "text-center",
    },

    {
        header: "Classes",
        accessor: (course) => (
            <span className="text-sm text-muted-foreground">
                {course.totalClasses}
            </span>
        ),
        className: "text-center",
    },

    {
        header: "Price",
        accessor: (course) => {
            const isFree = course.price === 0;

            return (
                <div className="flex flex-col text-sm text-center">
                    {isFree ? (
                        <span className="font-medium text-emerald-600">Free</span>
                    ) : course.discountPrice ? (
                        <>
                            <span className="text-xs line-through text-red-500">
                                ৳ {course.price}
                            </span>
                            <span className="font-medium text-foreground">
                                ৳ {course.discountPrice}
                            </span>
                        </>
                    ) : (
                        <span className="font-medium text-foreground">
                            ৳ {course.price}
                        </span>
                    )}
                </div>
            );
        },
        className: "text-center",
    },

    {
        header: "Rating",
        accessor: (course) => (
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Star size={14} className="text-yellow-500" />
                {course.rating.toFixed(1)} ({course.reviewCount})
            </span>
        ),
        className: "text-center",
    },

    {
        header: "Premium",
        accessor: (course) => (
            <span
                className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
        ${course.isPremium
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
            >
                {course.isPremium ? "Yes" : "No"}
            </span>
        ),
        className: "text-center",
    },

    {
        header: "Featured",
        accessor: (course) => (
            <span
                className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
        ${course.isFeatured
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
            >
                <BadgeCheck size={12} />
                {course.isFeatured ? "Featured" : "Normal"}
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