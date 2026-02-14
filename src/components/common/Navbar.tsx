"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Btn from "../shared/Btn";
import LogoutBtn from "../shared/LogoutBtn";
import { IUser, IUserRole } from "@/types/user/user";
import { getDefaultDashboard } from "@/lib/auth-utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface NavItem {
    label: string;
    href: string;
}

const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Our Course", href: "/course" },
    { label: "Success Stories", href: "/success" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar({ user }: { user: IUser | null }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const dashboard = getDefaultDashboard(user?.role as IUserRole);

    return (
        <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-6">
            <div className="flex h-16 items-center justify-between rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl shadow-lg px-6">

                {/* Logo */}
                <Link href="/">
                    <h1 className="text-xl font-semibold tracking-tight bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Academy
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`text-sm font-medium transition-colors ${pathname === item.href
                                ? "text-blue-600"
                                : "text-slate-700 hover:text-blue-600"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">

                    {user ? (
                        <>
                            {user.role !== IUserRole.USER ? (
                                <>
                                    <Link href={dashboard}>
                                        <Button variant="outline">Dashboard</Button>
                                    </Link>
                                    <LogoutBtn />
                                </>
                            ) : (
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="relative">
                                            <Avatar className="h-10 w-10 ring-2 ring-blue-500/30 hover:ring-blue-500 transition">
                                                <AvatarImage src={user.profileImage || ""} />
                                                <AvatarFallback>
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>

                                            {/* Online Indicator */}
                                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                                        </button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                        align="end"
                                        sideOffset={10}
                                        className="w-64 rounded-xl border bg-white shadow-xl"
                                    >
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-800">
                                                    {user.name}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {user.email}
                                                </span>
                                            </div>
                                        </DropdownMenuLabel>

                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem asChild>
                                            <Link href="/profile">My Profile</Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link href="/course">Browse Courses</Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem asChild>
                                            <LogoutBtn />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Btn title="Join Us" size="sm" />
                            </Link>
                        </>
                    )}

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="rounded-2xl border bg-white shadow-lg p-6 space-y-4">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block text-sm font-medium transition ${pathname === item.href
                                ? "text-blue-600"
                                : "text-slate-700 hover:text-blue-600"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}