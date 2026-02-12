
export const dynamic = "force-dynamic";

import Footer from "@/components/common/Footer";
import NavbarWarper from "@/components/common/NavbarWarper";
import React from "react";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <NavbarWarper />

            {/* Main Content Area */}
            <main className="flex-1 pt-12">
                {children}
            </main>

            <Footer />
        </div>
    );
}
