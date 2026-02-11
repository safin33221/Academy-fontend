import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React from "react";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}
