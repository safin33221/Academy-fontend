"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

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

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isAuthenticated = true;

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
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
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
                                        className={`absolute left-1/2 top-full mt-4 w-120 -translate-x-1/2 rounded-2xl border bg-white p-6 shadow-2xl transition-all duration-300 ${activeDropdown === item.label
                                            ? "opacity-100 translate-y-0 visible"
                                            : "opacity-0 translate-y-3 invisible"
                                            }`}
                                    >
                                        <div className="grid gap-4">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="rounded-xl p-4 hover:bg-gray-50 transition"
                                                >
                                                    <p className="font-semibold text-sm">
                                                        {child.label}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-1">
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
                                    className="text-sm font-medium hover:text-blue-600 transition"
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                <Link href="/">
                                    <Button variant="outline">Dashboard</Button>
                                </Link>
                                <Button variant="destructive">Logout</Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost">Login</Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-105 transition-transform">
                                        Enroll Now
                                    </Button>
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
        </nav>
    );
}
