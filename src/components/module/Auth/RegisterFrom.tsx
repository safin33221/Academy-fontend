"use client";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Btn from "@/components/shared/Btn";
import { motion } from "framer-motion";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { register } from "@/services/auth/register";
import toast from "react-hot-toast";
export default function RegisterFrom() {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, isPending] = useActionState(register, null);

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message);
        } else {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center">

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

            < motion.div
                initial={{ opacity: 0, y: 40 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md mx-auto"
            >
                <div className="rounded-2xl border border-border bg-white shadow-xl p-8">

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-semibold text-gray-900">
                            Create Account
                        </h2>

                        <Link href="/">
                            <Button variant="outline" className="flex items-center " >
                                <ArrowLeft className="mr-1" />
                                <span> Home</span>
                            </Button>
                        </Link>
                    </div>

                    <form action={formAction} className="space-y-5">

                        {/* Name */}
                        <Field>
                            <FieldLabel className="sr-only" htmlFor="name">
                                Full name
                            </FieldLabel>
                            <Input
                                id="name"
                                name="name"              // ✅ REQUIRED
                                autoComplete="off"
                                placeholder="Full Name"
                            />
                        </Field>

                        {/* Email */}
                        <Field>
                            <FieldLabel className="sr-only" htmlFor="email">
                                Email address
                            </FieldLabel>
                            <Input
                                id="email"
                                name="email"             // ✅ REQUIRED
                                type="email"
                                autoComplete="off"
                                placeholder="Email address"
                            />
                        </Field>

                        {/* Phone */}
                        <Field>
                            <FieldLabel className="sr-only" htmlFor="phone">
                                Phone number
                            </FieldLabel>
                            <Input
                                id="phone"
                                name="phone"             // ✅ REQUIRED
                                autoComplete="off"
                                placeholder="Phone number"
                            />
                        </Field>

                        {/* Password */}
                        <Field>
                            <FieldLabel className="sr-only" htmlFor="password">
                                Password
                            </FieldLabel>

                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"        // ✅ REQUIRED
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    autoComplete="new-password"
                                    className="h-12 pr-12"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </Field>


                        <Btn
                            type="submit"
                            title={isPending ? "creating..." : "Register"}
                            size="lg"
                            className="w-full"
                            disabled={isPending}
                        />

                    </form>

                    <p className="mt-6 text-sm text-center text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-primary font-medium hover:underline"
                        >

                        </Link>
                    </p>

                </div>
            </motion.div >
        </div >

    );
};
