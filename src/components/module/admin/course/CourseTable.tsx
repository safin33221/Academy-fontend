"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import ManagementTable from "@/components/shared/ManagementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog copy";
import { CourseColumn } from "./CourseColumn";
import { ICourse } from "@/types/course/course.interface";
import { courseSoftDelete } from "@/services/course/deleteCourse";

interface CourseTableProps {
    courses: ICourse[];
}

export default function CourseTable({ courses }: CourseTableProps) {
    const [deleting, setDeleting] = useState<ICourse | null>(null);
    const [isDeletingDialog, setIsDeletingDialog] = useState(false);
    const [, startTransition] = useTransition();
    const router = useRouter();

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    /* ================= View ================= */
    const handleView = (course: ICourse) => {
        router.push(`/admin/dashboard/courses/${course.slug}`);
    };

    /* ================= Edit ================= */
    const handleUpdate = (course: ICourse) => {
        router.push(`/admin/dashboard/courses/update/${course.slug}`);
    };

    /* ================= Delete ================= */
    const handleDelete = (course: ICourse) => {
        setDeleting(course);
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
            toast.error(result.message || "Failed to delete course");
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
                    onEdit={handleUpdate}
                    onDelete={handleDelete}
                />
            </div>

            <DeleteConfirmationDialog
                open={!!deleting}
                onOpenChange={(open) => !open && setDeleting(null)}
                onConfirm={confirmDelete}
                title="Delete Course"
                description={`Are you sure you want to delete ${deleting?.title}? This action cannot be undone.`}
                isDeleting={isDeletingDialog}
            />
        </>
    );
}