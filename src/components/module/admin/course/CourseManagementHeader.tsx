"use client"
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CourseManagementHeader() {
    const router = useRouter()
    return (
        <div>
            <ManagementPageHeader
                title="Course Management"
                description="Manage Course"
                action={{
                    icon: Plus,
                    label: "Create Course",
                    onClick: () => router.push("/admin/dashboard/courses/create"),
                }}
            />


        </div>
    );
};
