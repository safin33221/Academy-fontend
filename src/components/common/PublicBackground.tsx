"use client";

import { motion } from "framer-motion";

export default function PublicBackground() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-black">
            {/* Blob 1 */}
            <motion.div
                animate={{ x: [0, 200, -200, 0], y: [0, -100, 100, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-purple-600/30 rounded-full blur-[140px]"
            />

            {/* Blob 2 */}
            <motion.div
                animate={{ x: [0, -200, 200, 0], y: [0, 100, -100, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-blue-600/30 rounded-full blur-[140px]"
            />

            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
    );
}