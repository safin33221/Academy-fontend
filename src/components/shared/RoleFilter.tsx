"use client";

import { useRouter, useSearchParams } from "next/navigation";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IUserRole } from "@/types/user/user";
import { div } from "framer-motion/client";

interface RoleFilterProps {
    paramName?: string;
}

export default function RoleFilter({ paramName = "role" }: RoleFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentRole = searchParams.get(paramName) || undefined;

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "ALL") {
            params.delete(paramName);
        } else {
            params.set(paramName, value);
        }

        router.push(`?${params.toString()}`);
    };

    return (
        <div className="relative w-full">
            <Select value={currentRole} onValueChange={handleChange}>
                <SelectTrigger className="w-50">
                    <SelectValue placeholder="Filter by role" />
                </SelectTrigger>

                <SelectContent>
                    {/* ✅ Never use empty string */}
                    <SelectItem value="ALL">All Roles</SelectItem>

                    {Object.values(IUserRole).map((role) => (
                        <SelectItem key={role} value={role}>
                            {role}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}