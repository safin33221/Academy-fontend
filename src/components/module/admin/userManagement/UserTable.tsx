/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import ManagementTable from "@/components/shared/ManagementTable";
import { IUser } from "@/types/user/user";
import { UserColumn } from "./UserColumn";
import UserViewDetailDialog from "./UserViewDetailDialog";
import { toggleUserBlockStatus } from "@/services/user/toggleUserBlockStatus";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ConfirmDialog from "@/components/shared/DeleteConfirmationDialog";

interface UserTableProps {
    users: IUser[];
}

export default function UserTable({ users }: UserTableProps) {
    const [viewingUser, setViewingUser] = useState<IUser | null>(null);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [, startTransition] = useTransition();
    const router = useRouter();

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (user: IUser) => {
        setViewingUser(user);
    };

    const handleToggleBlock = (user: IUser) => {
        setSelectedUser(user); // This opens the dialog
    };

    const confirmToggleBlock = async () => {
        if (!selectedUser) return;

        try {
            setIsSubmitting(true);

            const result = await toggleUserBlockStatus(selectedUser.id);

            if (result.success) {
                toast.success(result.message);
                setSelectedUser(null); // close dialog
                handleRefresh();
            } else {
                toast.error(result.message || "Operation failed");
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isBlocking = selectedUser?.isBlocked === false;

    return (
        <>
            <div className="overflow-x-auto rounded-lg border">
                <ManagementTable<IUser>
                    data={users}
                    columns={UserColumn}
                    getRowKey={(user) => user.id}
                    onView={handleView}
                    onToggleBlock={handleToggleBlock}
                    isRowBlocked={(user) => user.isBlocked}
                />
            </div>

            {/* View Dialog */}
            <UserViewDetailDialog
                open={Boolean(viewingUser)}
                onClose={() => setViewingUser(null)}
                user={viewingUser}
            />

            {/* Block / Unblock Confirm Dialog */}
            <ConfirmDialog
                open={Boolean(selectedUser)}
                onOpenChange={(open) => {
                    if (!open) setSelectedUser(null);
                }}
                onConfirm={confirmToggleBlock}
                title={isBlocking ? "Block User" : "Unblock User"}
                description={
                    <>
                        Are you sure you want to{" "}
                        <strong>
                            {isBlocking ? "block" : "unblock"}
                        </strong>{" "}
                        {selectedUser?.name}?
                    </>
                }
                confirmText={isBlocking ? "Block" : "Unblock"}
                variant={isBlocking ? "destructive" : "default"}
                isLoading={isSubmitting}
            />
        </>
    );
}