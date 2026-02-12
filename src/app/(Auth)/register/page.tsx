"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Hero Section */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hidden lg:block"
                >
                    <h1 className="text-5xl font-bold leading-tight text-gray-900">
                        Start Your <span className="text-primary">Learning Journey</span>
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground max-w-md">
                        Join thousands of learners upgrading their skills and building
                        successful careers with industry-focused courses.
                    </p>
                </motion.div>

                {/* Right Register Form */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className="rounded-2xl border border-border bg-white shadow-xl p-8">

                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                            Create Account
                        </h2>

                        <form className="space-y-5">

                            {/* Name */}
                            <Input
                                type="text"
                                placeholder="Full name"
                                className="h-11 rounded-lg"
                            />

                            {/* Email */}
                            <Input
                                type="email"
                                placeholder="Email address"
                                className="h-11 rounded-lg"
                            />
                            <Input
                                type="text"
                                placeholder="Phone number"
                                className="h-11 rounded-lg"
                            />

                            {/* Password */}
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="h-11 rounded-lg pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>




                            {/* Register Button */}
                            <Button className="w-full h-11 rounded-lg">
                                Create Account
                            </Button>
                        </form>

                        <p className="mt-6 text-sm text-center text-muted-foreground">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-primary font-medium hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
