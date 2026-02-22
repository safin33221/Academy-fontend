"use client";

import { useState, useTransition } from "react";

import ManagementTable from "@/components/shared/ManagementTable";

import { CourseColumn } from "./CourseColumn"; // ✅ adjust path if needed
import { ICourse } from "@/types/course/course.interface";
import CourseViewDetailDialog from "./CourseViewDetailDialog";
import { redirect, useRouter } from "next/navigation";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog copy";
import toast from "react-hot-toast";
import { courseSoftDelete } from "@/services/course/deleteCourse";


interface CourseTableProps {
    courses: ICourse[];
}

export default function CourseTable({ courses }: CourseTableProps) {
    const [viewingCourse, setViewingCourse] = useState<ICourse | null>(null);
    const [deleting, setDeleting] = useState<ICourse | null>(null);
    const [isDeletingDialog, setIsDeletingDialog] = useState(false)
    const [, startTransition] = useTransition();
    const router = useRouter();
    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    /* ================= View ================= */
    const handleView = (course: ICourse) => {
        // setViewingCourse(course);
        redirect(`/admin/dashboard/courses/${course.slug}`)
    };
    const handleDelete = (course: ICourse) => {
        setDeleting(course)
    };

    const confirmDelete = async () => {
        if (!deleting) return;

        setIsDeletingDialog(true);
        const result = await courseSoftDelete(deleting.id as string);


        setIsDeletingDialog(false);
        if (result.success) {
            toast.success(result.message || "Course deleted successfully");
            setDeleting(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete User");
        }
    };

    return (
        <>
            <div className="overflow-x-auto rounded-lg border">
                <ManagementTable<ICourse>
                    data={courses}
                    columns={CourseColumn}
                    getRowKey={(course) => course.id}
                    onView={handleView}
                    onDelete={handleDelete}
                />
            </div>

            {/* View Dialog (Optional) */}
            <CourseViewDetailDialog
                open={Boolean(viewingCourse)}
                onClose={() => setViewingCourse(null)}
                course={viewingCourse}
            />

            <DeleteConfirmationDialog
                open={!!deleting}
                onOpenChange={(open) => !open && setDeleting(null)}
                onConfirm={confirmDelete}
                title="Delete Course"
                description={`Are you sure you want to delete ${deleting?.title} . This action cannot be undone.`}
                isDeleting={isDeletingDialog}
            />
        </>
    );
}