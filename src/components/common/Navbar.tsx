"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import Logo from "../shared/Logo";

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
        <nav className="fixed top-3 left-1/2 z-50 w-full max-w-7xl -translate-x-1/2 px-3 sm:top-4 sm:px-4 lg:px-6">
            <div className="flex h-14 items-center justify-between rounded-2xl border border-white/20 bg-white/70 px-3 shadow-lg backdrop-blur-xl sm:h-16 sm:px-4 lg:px-6">

                {/* Logo */}
                <Link href="/">
                    <Logo width={104} height={36} className="sm:w-28 sm:h-10" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
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
                <div className="flex items-center gap-2 sm:gap-3">

                    {user ? (
                        <>

                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button className="relative">
                                        <Avatar className="h-10 w-10 ring-2 ring-blue-500/30 hover:ring-blue-500 transition">
                                            <AvatarImage src={user.profilePhoto || ""} />
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
                                        <Link href="/my-profile">My Profile</Link>
                                    </DropdownMenuItem>
                                    {user.role !== IUserRole.USER && (
                                        <DropdownMenuItem asChild>
                                            <Link href={dashboard}>Dashboard</Link>
                                        </DropdownMenuItem>
                                    )}

                                    <DropdownMenuItem asChild>
                                        <Link href="/course">Browse Courses</Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem asChild>
                                        <LogoutBtn />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </>
                    ) : (
                        <>

                            <Link href="/join-us">
                                <Btn title="Join Us" size="sm" />
                            </Link>
                        </>
                    )}

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-1.5"
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
                <div className="mt-3 space-y-4 rounded-2xl border bg-white p-5 shadow-lg">
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
        </nav >
    );
}
