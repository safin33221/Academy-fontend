
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import Btn from "../shared/Btn";
import LogoutBtn from "../shared/LogoutBtn";
import { IUser } from "@/types/user/user";
import { getDefaultDashboard } from "@/lib/auth-utils";

interface NavItem {
    label: string;
    href?: string;
    children?: { label: string; href: string; desc?: string }[];
}

const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "/" },
    // {
    //     label: "Courses",
    //     children: [
    //         {
    //             label: "Web Development",
    //             href: "/courses/web",
    //             desc: "Frontend, Backend & Fullstack",
    //         },
    //         {
    //             label: "Graphic Design",
    //             href: "/courses/graphic",
    //             desc: "Creative Design Mastery",
    //         },
    //         {
    //             label: "Digital Marketing",
    //             href: "/courses/marketing",
    //             desc: "SEO, Ads & Social Media",
    //         },
    //     ],
    // },
    { label: "Our Course", href: "/course" },
    { label: "Success Stories", href: "/success" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar({ user }: { user: IUser }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dashboard = getDefaultDashboard(user?.role)
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close desktop dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setActiveDropdown(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[98%] max-w-7xl bg-white/80 backdrop-blur-md border rounded-2xl shadow-lg">
            <div className="px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <h1 className="text-xl font-bold tracking-wide">Academy</h1>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_ITEMS.map((item) =>
                            item.children ? (
                                <div
                                    key={item.label}
                                    className="relative"
                                    ref={dropdownRef}
                                    onMouseEnter={() => setActiveDropdown(item.label)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button className="flex items-center gap-1 text-sm font-medium hover:text-blue-600 transition">
                                        {item.label}
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {/* Desktop Dropdown */}
                                    <div
                                        className={`absolute left-1/2 top-full mt-4 w-100 -translate-x-1/2 rounded-2xl border bg-white p-6 shadow-2xl transition-all duration-300 ${activeDropdown === item.label
                                            ? "opacity-100 translate-y-0 visible"
                                            : "opacity-0 translate-y-3 invisible"
                                            }`}
                                    >
                                        <div className="grid gap-3">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="group relative rounded-xl p-4 hover:bg-slate-100 transition"
                                                >
                                                    <p className="font-semibold text-sm text-slate-800 group-hover:text-blue-600 transition">
                                                        {child.label}
                                                    </p>
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        {child.desc}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={item.label}
                                    href={item.href!}
                                    className="text-lg font-medium hover:text-blue-600 transition"
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <Link href={dashboard}>
                                    <Button
                                        variant={`outline`}
                                    >
                                        Dashboard
                                    </Button>
                                </Link>
                                <LogoutBtn />
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
                            {mobileOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-150 opacity-100 py-4" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="space-y-4 border-t pt-4">
                        {NAV_ITEMS.map((item) =>
                            item.children ? (
                                <div key={item.label} className="space-y-2">
                                    <p className="font-medium text-sm">{item.label}</p>
                                    <div className="pl-3 space-y-2">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                onClick={() => setMobileOpen(false)}
                                                className="block text-sm text-slate-600 hover:text-blue-600"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={item.label}
                                    href={item.href!}
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-sm font-medium hover:text-blue-600"
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}