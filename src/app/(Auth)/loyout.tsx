
import React from "react";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen ">


            {/* Main Content Area */}
            <main className="">
                {children}
            </main>

        </div>
    );
}