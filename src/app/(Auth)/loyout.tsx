
import React from "react";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">


            {/* Main Content Area */}
            <main className="flex-1">
                {children}
            </main>

        </div>
    );
}