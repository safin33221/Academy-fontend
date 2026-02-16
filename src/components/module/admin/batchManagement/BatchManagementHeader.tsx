"use client"
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BatchManagementHeader() {
    const router = useRouter()
    return (
        <div>
            <ManagementPageHeader
                title="Batch Management"
                description="Manage Batch"
                action={{
                    icon: Plus,
                    label: "Create Batch",
                    onClick: () => router.push("/admin/dashboard/batch/create"),
                }} />
        </div>
    );
};
