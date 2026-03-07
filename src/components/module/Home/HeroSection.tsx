"use client";
import {
    Code2,
    Cpu,
    Database,
    Braces,
    Terminal,
    Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function HeroSection() {
    return (
        <section
            className="relative flex min-h-[calc(100svh-1rem)] items-center justify-center overflow-hidden bg-linear-to-br
            from-slate-50 via-white to-slate-100 pt-32 pb-16 sm:pt-36 sm:pb-20 md:min-h-screen md:pt-28 md:pb-16 lg:pt-32
            dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
        >

            {/* Floating Tech Badges */}
            <div className="pointer-events-none absolute inset-0 hidden md:block">
                {[
                    { Icon: Code2, top: "15%", left: "10%" },
                    { Icon: Cpu, top: "25%", right: "12%" },
                    { Icon: Database, bottom: "20%", left: "15%" },
                    { Icon: Terminal, bottom: "25%", right: "18%" },
                    { Icon: Braces, top: "45%", left: "5%" },
                    { Icon: Layers, top: "60%", right: "5%" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -20, 0] }}
                        transition={{
                            duration: 6 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md lg:p-4"
                        style={{
                            top: item.top,
                            left: item.left,
                            right: item.right,
                            bottom: item.bottom,
                        }}
                    >
                        <item.Icon size={32} className="text-black/10" />
                    </motion.div>
                ))}
            </div>
            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="mx-auto flex max-w-4xl flex-col items-center space-y-6 text-center sm:space-y-8">

                    <motion.div variants={itemVariants}>
                        <Badge className="rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary sm:px-4 sm:text-sm">
                            New: Advanced React Course Available Now
                        </Badge>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
                    >
                        Upgrade Your Skills with{" "}
                        <span className="bg-linear-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Industry-Level
                        </span>{" "}
                        Courses
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
                    >
                        Master the latest technologies and advance your career with our
                        expert-led courses. Join thousands of learners worldwide.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                            <a href="#courses"> <Button
                                size="lg"
                                className="h-12 w-full px-6 text-base shadow-xl shadow-primary/30 transition hover:opacity-90 sm:w-auto sm:px-8 bg-linear-to-r from-primary to-blue-600"
                            >
                                Browse Courses
                            </Button>
                            </a>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                            <Link href={`/join-us`}>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="h-12 w-full border-primary/30 px-6 text-base sm:w-auto sm:px-8"
                                >
                                    Join Now
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                </div>
            </motion.div >

            {/* Large Soft Background Glow (Slower & Bigger) */}
            < motion.div
                animate={{ y: [0, -40, 0] }
                }
                transition={{
                    duration: 20, // slower
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-40 -left-40 h-112 w-md rounded-full bg-primary/15 blur-3xl sm:h-144 sm:w-xl"
            />

            <motion.div
                animate={{ y: [0, 40, 0] }}
                transition={{
                    duration: 25, // slower & smoother
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -bottom-40 -right-40 h-112 w-md rounded-full bg-blue-500/15 blur-3xl sm:h-144 sm:w-xl"
            />
        </section >
    );
}
