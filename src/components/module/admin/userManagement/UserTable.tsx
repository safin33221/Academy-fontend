/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import ManagementTable from "@/components/shared/ManagementTable";
import { IUser, IUserRole } from "@/types/user/user";

import { UserColumn } from "./UserColumn";
import UserViewDetailDialog from "./UserViewDetailDialog";
import { toggleUserBlockStatus } from "@/services/user/toggleUserBlockStatus";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ConfirmDialog from "@/components/shared/DeleteConfirmationDialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateUserRole } from "@/services/user/updateUserRole";

interface UserTableProps {
    users: IUser[];
}

type ActionType = "block" | "role" | null;

export default function UserTable({ users }: UserTableProps) {
    const [viewingUser, setViewingUser] = useState<IUser | null>(null);

    const [dialogState, setDialogState] = useState<{
        type: ActionType;
        user: IUser | null;
    }>({
        type: null,
        user: null,
    });

    const [selectedRole, setSelectedRole] = useState<IUserRole | "">("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [, startTransition] = useTransition();
    const router = useRouter();

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    /* ================= View ================= */
    const handleView = (user: IUser) => {
        setViewingUser(user);
    };

    /* ================= Block ================= */
    const handleToggleBlock = (user: IUser) => {
        setDialogState({ type: "block", user });
    };

    const confirmToggleBlock = async () => {
        if (!dialogState.user) return;

        try {
            setIsSubmitting(true);

            const result = await toggleUserBlockStatus(dialogState.user.id);

            if (result.success) {
                toast.success(result.message);
                closeDialog();
                handleRefresh();
            } else {
                toast.error(result.message);
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    /* ================= Role Update ================= */
    const handleRoleUpdate = (user: IUser) => {
        setDialogState({ type: "role", user });
        setSelectedRole(user.role);
    };

    const confirmRoleUpdate = async () => {
        if (!dialogState.user || !selectedRole) return;

        try {
            setIsSubmitting(true);

            const result = await updateUserRole(
                dialogState.user.id,
                selectedRole
            );

            if (result.success) {
                toast.success(result.message);
                closeDialog();
                handleRefresh();
            } else {
                toast.error(result.message);
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    /* ================= Shared ================= */
    const closeDialog = () => {
        setDialogState({ type: null, user: null });
        setSelectedRole("");
    };

    const handleConfirm = () => {
        if (dialogState.type === "block") return confirmToggleBlock();
        if (dialogState.type === "role") return confirmRoleUpdate();
    };

    const isBlocking =
        dialogState.type === "block" &&
        dialogState.user?.isBlocked === false;

    return (
        <>
            <div className="overflow-x-auto rounded-lg border">
                <ManagementTable<IUser>
                    data={users}
                    columns={UserColumn}
                    getRowKey={(user) => user.id}
                    onView={handleView}
                    onToggleBlock={handleToggleBlock}
                    updateRole={handleRoleUpdate}
                    isRowBlocked={(user) => user.isBlocked}
                />
            </div>

            {/* View Dialog */}
            <UserViewDetailDialog
                open={Boolean(viewingUser)}
                onClose={() => setViewingUser(null)}
                user={viewingUser}
            />

            {/* Confirm Dialog */}
            <ConfirmDialog
                open={Boolean(dialogState.user)}
                onOpenChange={(open) => {
                    if (!open) closeDialog();
                }}
                onConfirm={handleConfirm}
                title={
                    dialogState.type === "block"
                        ? isBlocking
                            ? "Block User"
                            : "Unblock User"
                        : "Update User Role"
                }
                description={
                    dialogState.type === "block" ? (
                        <>
                            Are you sure you want to{" "}
                            <strong>
                                {isBlocking ? "block" : "unblock"}
                            </strong>{" "}
                            {dialogState.user?.name}?
                        </>
                    ) : (
                        <div className="space-y-4">
                            <p>
                                Change role for{" "}
                                <strong>{dialogState.user?.name}</strong>
                            </p>

                            <Select
                                value={selectedRole}
                                onValueChange={(value: string) =>
                                    setSelectedRole(value as IUserRole)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>

                                <SelectContent>
                                    {Object.values(IUserRole).map((role) => (
                                        <SelectItem key={role} value={role}>
                                            {role}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )
                }
                confirmText={
                    dialogState.type === "block"
                        ? isBlocking
                            ? "Block"
                            : "Unblock"
                        : "Update Role"
                }
                variant={
                    dialogState.type === "block" && isBlocking
                        ? "destructive"
                        : "default"
                }
                isLoading={isSubmitting}
            />
        </>
    );
}