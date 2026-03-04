"use client";

import { Menu, Bell, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

import LogoutBtn from "@/components/shared/LogoutBtn";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { IUser, IUserRole } from "@/types/user/user";
import { INavSection } from "@/types/dashboard/NavItem";
import { cn } from "@/lib/utils";

interface DashboardNavbarContentProps {
    user: IUser;
    navItems: INavSection[];
}

export default function DashboardNavbarContent({
    user,
    navItems,
}: DashboardNavbarContentProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* ================= NAVBAR ================= */}
            <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
                <div className="flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="max-md:hidden flex items-center">
                        {user.role != IUserRole.STUDENT && <Breadcrumb />}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    {/* <div className="hidden md:flex w-full max-w-sm items-center relative">
                        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search..." className="pl-9" />
                    </div> */}

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-9 w-9 rounded-full">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src="/avatar.png" />
                                        <AvatarFallback>
                                            {user?.name?.slice(0, 1)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                                <DropdownMenuLabel className="text-indigo-600">
                                    {user.role}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogoutBtn />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* ================= MOBILE DRAWER ================= */}
            <Drawer open={open} onOpenChange={setOpen} direction="left" >
                <DrawerContent className="h-screen p-0 bg-background">
                    <DrawerHeader className="border-b px-4 py-3">
                        <DrawerTitle className="text-left text-base font-semibold">
                            Dashboard Menu
                        </DrawerTitle>
                    </DrawerHeader>

                    <div className="flex flex-col justify-between h-full">
                        {/* Navigation */}
                        <div className="overflow-y-auto p-4 space-y-6">
                            {navItems?.map((section, sectionId) => (
                                <div key={sectionId}>
                                    {section.title && (
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                                            {section.title}
                                        </h4>
                                    )}

                                    <Separator className="mb-3" />

                                    <div className="flex flex-col gap-1">
                                        {section.items?.map((item, itemId) => {
                                            const isActive = (() => {
                                                if (item.href === "/admin/dashboard") {
                                                    return pathname === item.href;
                                                }
                                                if (item.href === "/instructor/dashboard") {
                                                    return pathname === item.href;
                                                }
                                                if (item.href === "/dashboard") {
                                                    return pathname === item.href;
                                                }

                                                return (
                                                    pathname === item.href ||
                                                    pathname.startsWith(item.href + "/")
                                                );
                                            })();

                                            return (
                                                <DrawerClose asChild key={itemId}>
                                                    <Link
                                                        href={item.href}
                                                        className={cn(
                                                            "px-3 py-2 rounded-md text-sm text-foreground transition",
                                                            isActive
                                                                ? "bg-muted text-indigo-600 font-semibold"
                                                                : "hover:bg-muted"
                                                        )}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </DrawerClose>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom User Section */}
                        <div className="border-t p-4 bg-background">
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

                            <div className="mt-3">
                                <LogoutBtn />
                            </div>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}