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
        <section className="relative max-md:py-20 max-md:pt-52 md:min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-white to-slate-100
         dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

            {/* Floating Tech Badges */}
            <div className="absolute inset-0 pointer-events-none ">
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
                        className="absolute backdrop-blur-md bg-white/5 border border-white/10 p-4 rounded-2xl"
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
                className="container px-4 md:px-6 mx-auto relative z-10"
            >
                <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">

                    <motion.div variants={itemVariants}>
                        <Badge className="px-4 py-1 text-sm border-primary/20 bg-primary/5 text-primary rounded-full">
                            New: Advanced React Course Available Now
                        </Badge>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight"
                    >
                        Upgrade Your Skills with{" "}
                        <span className="bg-linear-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Industry-Level
                        </span>{" "}
                        Courses
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
                    >
                        Master the latest technologies and advance your career with our
                        expert-led courses. Join thousands of learners worldwide.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                            <a href="#courses"> <Button
                                size="lg"
                                className="h-12 px-8 text-base shadow-xl shadow-primary/30 bg-linear-to-r from-primary to-blue-600 hover:opacity-90 transition"
                            >
                                Browse Courses
                            </Button>
                            </a>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-12 px-8 text-base border-primary/30"
                            >
                                View Programs
                            </Button>
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
                className="absolute -top-40 -left-40 w-175 h-175 rounded-full bg-primary/15 blur-3xl"
            />

            <motion.div
                animate={{ y: [0, 40, 0] }}
                transition={{
                    duration: 25, // slower & smoother
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -bottom-40 -right-40 w-175 h-175 rounded-full bg-blue-500/15 blur-3xl"
            />
        </section >
    );
}
