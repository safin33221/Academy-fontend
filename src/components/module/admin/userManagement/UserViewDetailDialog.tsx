"use client";

import InfoRow from "@/components/shared/InfoRow";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime, getInitials } from "@/lib/formatters";
import { IUser } from "@/types/user/user";

import {
    Calendar,
    Mail,
    Phone,
    User,
    ShieldCheck,
    ShieldX,
    Shield,
} from "lucide-react";

interface IUserViewDetailDialogProps {
    open: boolean;
    onClose: () => void;
    user: IUser | null;
}

const UserViewDetailDialog = ({
    open,
    onClose,
    user,
}: IUserViewDetailDialogProps) => {
    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>User Profile</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Profile Header */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-muted/40 rounded-lg mb-6">
                        <Avatar className="h-24 w-24 border shadow">
                            {/* If you later add profileImage field */}
                            {/* <AvatarImage src={user.profileImage} /> */}
                            <AvatarFallback className="text-2xl">
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-2xl font-semibold">{user.name}</h2>

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
                    </div>

                    {/* Information Sections */}
                    <div className="space-y-6">
                        {/* Account Information */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                Account Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow label="User ID" value={user.id} />
                                <InfoRow label="Role" value={user.role} />
                                <InfoRow
                                    label="Verification Status"
                                    value={user.isVerified ? "Verified" : "Not Verified"}
                                />
                                <InfoRow
                                    label="Account Status"
                                    value={user.isActive ? "Active" : "Inactive"}
                                />
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

                        {/* Contact Information */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-purple-600" />
                                Contact Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow label="Email Address" value={user.email} />
                                <InfoRow label="Phone Number" value={user.phone} />
                            </div>
                        </div>

                        <Separator />

                        {/* System Information */}
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
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserViewDetailDialog;