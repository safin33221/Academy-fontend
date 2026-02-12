"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

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
                        Welcome Back to <span className="text-primary">Your Learning</span>
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground max-w-md">
                        Continue your journey, explore new skills, and grow your career
                        with premium courses designed for real-world success.
                    </p>
                </motion.div>

                {/* Right Login Form */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className="rounded-2xl border border-border bg-white shadow-xl p-8">

                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                            Sign In
                        </h2>

                        <form className="space-y-5">

                            {/* Email */}
                            <Input
                                type="email"
                                placeholder="Email address"
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

                            {/* Forgot Password */}
                            <div className="text-right text-sm">
                                <Link
                                    href="#"
                                    className="text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Button */}
                            <Button className="w-full h-11 rounded-lg">
                                Sign In
                            </Button>
                        </form>

                        <p className="mt-6 text-sm text-center text-muted-foreground">
                            Don’t have an account?{" "}
                            <Link
                                href="/register"
                                className="text-primary font-medium hover:underline"
                            >
                                Register
                            </Link>
                        </p>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
