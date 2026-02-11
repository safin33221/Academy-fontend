"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Award, Code, Headphones, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
const FEATURES = [
    {
        icon: Users,
        title: "Expert Instructors",
        desc: "Learn from industry professionals with real-world experience.",
        gradient: "from-blue-500 to-indigo-500",
    },
    {
        icon: Headphones,
        title: "Live Support",
        desc: "Get help whenever you need it with our 24/7 support team.",
        gradient: "from-pink-500 to-rose-500",
    },
    {
        icon: Award,
        title: "Certification",
        desc: "Earn recognized certificates to showcase your achievements.",
        gradient: "from-amber-500 to-orange-500",
    },
    {
        icon: Code,
        title: "Real Projects",
        desc: "Build a portfolio of projects to demonstrate your skills.",
        gradient: "from-emerald-500 to-teal-500",
    },
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};



const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
            , // smooth premium easing
        },
    },
};


export default function FeaturesSection() {
    return (
        <section className="relative py-24 bg-linear-to-b from-white via-slate-50 to-white overflow-hidden">

            {/* Soft Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-500/10 blur-[120px] rounded-full" />

            <div className="container relative mx-auto px-4 md:px-6">

                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Why Choose Our Academy?
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        We provide career-focused training designed to make you industry-ready.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {FEATURES.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <Card className="group relative overflow-hidden border-none bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl">
                                <CardContent className="p-8 text-center space-y-5">

                                    {/* Icon */}
                                    <div
                                        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-r ${feature.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <feature.icon className="h-6 w-6" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-semibold text-lg">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </CardContent>

                                {/* Premium Hover Glow */}
                                <div
                                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition duration-500 bg-linear-to-r ${feature.gradient}`}
                                />
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
