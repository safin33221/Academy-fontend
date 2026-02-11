"use client";

import Link from "next/link";
import { Facebook, Linkedin, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-300 mt-20">

            {/* Top Gradient Line */}
            <div className="h-0.75 bg-linear-to-r from-blue-400 to-indigo-400" />

            <div className="container mx-auto px-4 py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Academy
                        </h2>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Empowering students with industry-ready skills in Web Development,
                            Graphic Design, and Digital Marketing.
                        </p>

                        {/* Social */}
                        <div className="flex gap-4 mt-6">
                            <Link href="#" className="hover:text-white transition">
                                <Facebook size={18} />
                            </Link>
                            <Link href="#" className="hover:text-white transition">
                                <Linkedin size={18} />
                            </Link>
                            <Link href="#" className="hover:text-white transition">
                                <Youtube size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Courses */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Courses</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/courses/web" className="hover:text-white transition">
                                    Web Development
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses/graphic" className="hover:text-white transition">
                                    Graphic Design
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses/marketing" className="hover:text-white transition">
                                    Digital Marketing
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses" className="hover:text-white transition">
                                    View All Courses
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="hover:text-white transition">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/success" className="hover:text-white transition">
                                    Success Stories
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" className="hover:text-white transition">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Stay Updated
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Subscribe to get updates about new courses and events.
                        </p>

                        <div className="flex items-center gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <Mail size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Academy LMS. All rights reserved.
            </div>
        </footer>
    );
}
