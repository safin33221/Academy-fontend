import { DateCell } from "@/components/shared/cell/DateCell";
import { columns } from "@/components/shared/ManagementTable";
import { IUser } from "@/types/user/user";

import { ShieldCheck } from "lucide-react";

export const UserColumn: columns<IUser>[] = [
    {
        header: "Users",
        accessor: (user) => (
            <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                    {user.name}
                </span>
                <span className="text-xs text-muted-foreground">
                    ID: {user.id.slice(0, 8)}...
                </span>
            </div>
        ),
    },
    {
        header: "Email",
        accessor: (user) => (
            <span className="text-sm text-muted-foreground">
                {user.email}
            </span>
        ),
    },
    {
        header: "Role",
        accessor: (user) => (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 uppercase">
                <ShieldCheck size={12} />
                {user.role}
            </span>
        ),
        className: "text-center",
    },
    {
        header: "Verification",
        accessor: (user) => (
            <span
                className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
          ${user.isVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
            >
                {user.isVerified ? "Verified" : "Unverified"}
            </span>
        ),
        className: "text-center",
    },
    {
        header: "Status",
        accessor: (user) => (
            <span
                className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium
          ${user.isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
            >
                {user.isActive ? "Active" : "Inactive"}
            </span>
        ),
        className: "text-center",
    },
    {
        header: "Created At",
        accessor: (user) => (
            <span className="text-sm text-muted-foreground">
                <DateCell date={user.createdAt} />
            </span>
        ),
    },

];
