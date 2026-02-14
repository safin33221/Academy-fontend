"use client";

import { useState } from "react";

import ManagementTable from "@/components/shared/ManagementTable";

import { CourseColumn } from "./CourseColumn"; // ✅ adjust path if needed
import { ICourse } from "@/types/course/course.interface";
import CourseViewDetailDialog from "./CourseViewDetailDialog";

interface CourseTableProps {
    courses: ICourse[];
}

export default function CourseTable({ courses }: CourseTableProps) {
    const [viewingCourse, setViewingCourse] = useState<ICourse | null>(null);

    // const [, startTransition] = useTransition();
    // const router = useRouter();

    // const handleRefresh = () => {
    //     startTransition(() => {
    //         router.refresh();
    //     });
    // };

    /* ================= View ================= */
    const handleView = (course: ICourse) => {
        setViewingCourse(course);
    };

    return (
        <>
            <div className="overflow-x-auto rounded-lg border">
                <ManagementTable<ICourse>
                    data={courses}
                    columns={CourseColumn}
                    getRowKey={(course) => course.id}
                    onView={handleView}
                />
            </div>

            {/* View Dialog (Optional) */}
            <CourseViewDetailDialog
                open={Boolean(viewingCourse)}
                onClose={() => setViewingCourse(null)}
                course={viewingCourse}
            />
        </>
    );
}