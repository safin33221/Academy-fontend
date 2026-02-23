"use client";

import { useState, useActionState, useEffect } from "react";
import InfoRow from "@/components/shared/InfoRow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatDateTime, getInitials } from "@/lib/formatters";
import { updateUserAction } from "@/services/user/UpdateUser";
import { IUser } from "@/types/user/user";

import {
    Calendar,
    Mail,
    Phone,
    User,
    ShieldCheck,
    ShieldX,
    Shield,
    Edit,
} from "lucide-react";
import toast from "react-hot-toast";
import Btn from "@/components/shared/Btn";

export default function MyProfile({ user }: { user: IUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(
        user.profilePhoto || ""
    );
    console.log({ user });

    const [state, formAction, isPending] =
        useActionState(updateUserAction, null);

    // Auto-close editing mode when update is successful
    useEffect(() => {
        if (state?.success) {
            toast.success(state.message);
            const timer = setTimeout(() => {
                setIsEditing(false);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [state])

    return (
        <form
            action={formAction}
            className="max-w-7xl mx-auto p-6 space-y-8"
        >
            <input type="hidden" name="id" value={user.id} />

            {/* ================= PROFILE HEADER ================= */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-muted/40 rounded-lg">
                <div className="relative">
                    <Avatar className="h-44 w-44 border shadow">
                        <AvatarImage src={previewImage} />
                        <AvatarFallback className="text-2xl">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>

                    {isEditing && (
                        <label className="absolute bottom-0 right-0  text-xs px-2 py-1 rounded cursor-pointer">
                            <Edit />
                            <input
                                type="file"
                                name="file" // must match multer field
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setPreviewImage(
                                            URL.createObjectURL(file)
                                        );
                                    }
                                }}
                            />
                        </label>
                    )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                    {isEditing ? (
                        <Input
                            name="name"
                            defaultValue={user.name}
                            className="text-xl font-semibold"
                        />
                    ) : (
                        <h2 className="text-2xl font-semibold">
                            {user.name}
                        </h2>
                    )}

                    <p className="text-muted-foreground flex items-center gap-2 mt-1 justify-center sm:justify-start">
                        <Mail className="h-4 w-4" />
                        {user.email}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                        <Badge variant={user.isActive ? "default" : "destructive"}>
                            {user.isActive ? "Active" : "Inactive"}
                        </Badge>

                        <Badge
                            variant={user.isVerified ? "secondary" : "outline"}
                            className="flex items-center gap-1"
                        >
                            {user.isVerified ? (
                                <ShieldCheck className="h-3 w-3" />
                            ) : (
                                <ShieldX className="h-3 w-3" />
                            )}
                            {user.isVerified ? "Verified" : "Unverified"}
                        </Badge>

                        <Badge
                            variant="outline"
                            className="flex items-center gap-1 font-semibold"
                        >
                            <Shield className="h-3 w-3" />
                            {user.role}
                        </Badge>
                    </div>
                </div>

                {!isEditing ?
                    (<Btn
                        onClick={() => setIsEditing(true)}
                        type="button"
                        size="lg"
                        title="Edit"
                        className="w-1/12"
                    />)

                    : (
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsEditing(false);
                                    setPreviewImage(user.profilePhoto || "");
                                }}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    )}
            </div>

            {/* ================= ACCOUNT INFORMATION ================= */}
            <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Account Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                    <InfoRow label="User ID" value={user.id} />
                    <InfoRow label="Role" value={user.role} />
                    <InfoRow
                        label="Premium"
                        value={user.isPremium ? "Yes" : "No"}
                    />
                    <InfoRow
                        label="Blocked"
                        value={user.isBlocked ? "Yes" : "No"}
                    />
                </div>
            </div>

            <Separator />

            {/* ================= CONTACT INFORMATION ================= */}
            <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-purple-600" />
                    Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                    <InfoRow label="Email Address" value={user.email} />

                    {isEditing ? (
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">
                                Phone Number
                            </p>
                            <Input
                                name="phone"
                                defaultValue={user.phone || ""}
                            />
                        </div>
                    ) : (
                        <InfoRow
                            label="Phone Number"
                            value={user.phone || "—"}
                        />
                    )}
                </div>
            </div>

            <Separator />

            {/* ================= SYSTEM INFORMATION ================= */}
            <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    System Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                    <InfoRow
                        label="User Since"
                        value={formatDateTime(user.createdAt)}
                    />
                    <InfoRow
                        label="Last Updated"
                        value={formatDateTime(user.updatedAt)}
                    />
                    <InfoRow
                        label="Last Login"
                        value={
                            user.lastLoginAt
                                ? formatDateTime(user.lastLoginAt)
                                : "Never"
                        }
                    />
                </div>
            </div>

        </form >
    );
}