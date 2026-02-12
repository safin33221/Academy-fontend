"use client";

import { INavSection } from "@/types/dashboard/NavItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/user/user";
import { Separator } from "@/components/ui/separator";


interface DashboardSideBarContentProps {
    navItems: INavSection[];
    user: IUser;
}

export default function DashboardSidebarContent({
    navItems,
    user,
}: DashboardSideBarContentProps) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col justify-between h-[calc(100vh-4rem)]">

            {/* Top Section */}
            <div>
                <h1 className="text-xl font-bold p-4">Academy Logo</h1>

                <nav className="px-4 space-y-6">
                    {navItems.map((section, sectionId) => (
                        <div key={sectionId}>

                            {section.title && (
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                                    {section.title}
                                </h4>
                            )}

                            <Separator />
                            <div className="flex flex-col gap-1">
                                {section.items.map((item, itemId) => {
                                    const isActive = pathname === item.href;

                                    return (
                                        <Link
                                            key={itemId}
                                            href={item.href}
                                            className={cn(
                                                "px-3 py-2 rounded-md text-lg text-primary",
                                                isActive
                                                    ? " text-indigo-600  font-bold bg-slate-200 transition"
                                                    : "hover:bg-muted"
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Bottom User Section */}
            <div className="shrink-0 border-t p-4 fixed bottom-0 bg-background">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-medium">
                        {user.email?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs capitalize text-muted-foreground">
                            {user?.role}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
