/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import Btn from "../shared/Btn";
import LogoutBtn from "../shared/LogoutBtn";

interface NavItem {
    label: string;
    href?: string;
    children?: { label: string; href: string; desc?: string }[];
}

const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "/" },
    {
        label: "Courses",
        children: [
            {
                label: "Web Development",
                href: "/courses/web",
                desc: "Frontend, Backend & Fullstack",
            },
            {
                label: "Graphic Design",
                href: "/courses/graphic",
                desc: "Creative Design Mastery",
            },
            {
                label: "Digital Marketing",
                href: "/courses/marketing",
                desc: "SEO, Ads & Social Media",
            },
        ],
    },
    { label: "Success Stories", href: "/success" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar({ user }: { user: any }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);



    // Close dropdown on outside click
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
        <nav className=" z-50 bg-white/70 backdrop-blur-md border-b container mx-auto rounded-2xl shadow-lg absolute left-1/2 -translate-x-1/2">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <h1 className="text-xl font-bold tracking-wide">
                        Academy
                    </h1>

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
                                            className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === item.label
                                                ? "rotate-180"
                                                : ""
                                                }`}
                                        />
                                    </button>

                                    {/* Smooth Dropdown */}
                                    <div
                                        className={`absolute left-1/2 top-full mt-4 w-120 -translate-x-1/2 rounded-2xl border bg-white p-6 shadow-2xl transition-all duration-300  ${activeDropdown === item.label
                                            ? "opacity-100 translate-y-0 visible"
                                            : "opacity-0 translate-y-3 invisible"
                                            }`}
                                    >
                                        <div className="grid gap-3">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="group relative rounded-xl p-4 transition-all duration-300 
                 hover:bg-slate-100 dark:hover:bg-white/5"
                                                >
                                                    {/* Content */}
                                                    <div>
                                                        <p className="font-semibold text-sm text-slate-800 dark:text-white 
                      group-hover:text-primary dark:group-hover:text-blue-400 
                      transition-colors">
                                                            {child.label}
                                                        </p>

                                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                            {child.desc}
                                                        </p>
                                                    </div>

                                                    {/* Animated Bottom Gradient Border */}
                                                    <span className="absolute left-0 bottom-0 h-0.5 w-0  bg-linear-to-r from-primary to-blue-600 hover:opacity-90   dark:from-blue-500 dark:to-indigo-500 transition-all duration-300 group-hover:w-full rounded-full" />
                                                </Link>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={item.label}
                                    href={item.href!}
                                    className="text-sm font-medium hover:text-blue-600 transition"
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">
                        {user?.success ? (
                            <>
                                {/* <Link href="/">
                                    <Button variant="outline">Dashboard</Button>
                                </Link> */}
                                <div>
                                    <p className="text-sm font-medium text-slate-800 dark:text-white">
                                        {user.data.name}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {user.data.email}
                                    </p>
                                </div>
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
            </div>
        </nav >
    );
}
