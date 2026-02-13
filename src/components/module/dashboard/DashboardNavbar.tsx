"use client";

import { Menu, Bell, Search } from "lucide-react";
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
import LogoutBtn from "@/components/shared/LogoutBtn";

interface DashboardNavbarProps {
    onMenuClick?: () => void;
}

export default function DashboardNavbar({
    onMenuClick,
}: DashboardNavbarProps) {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                </div>

                {/* Center Search */}
                <div className="hidden md:flex w-full max-w-sm items-center relative">
                    <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search..."
                        className="pl-9"
                    />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                    </Button>

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-9 w-9 rounded-full"
                            >
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="/avatar.png" />
                                    <AvatarFallback>SA</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-56"
                        >
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem >
                                <LogoutBtn />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}