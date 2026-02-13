import DashboardNavbar from "@/components/module/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/module/dashboard/DashboardSidebar";
import { getCookies } from "@/services/auth/tokenHandler";
import { redirect } from "next/navigation";

export default async function layout({ children }: { children: React.ReactNode }) {


    const accessToken = await getCookies("accessToken")
    if (!accessToken) {
        redirect("/")

    }
    return (
        <div className="h-screen flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 h-full overflow-y-auto border-r max-md:hidden">

                <DashboardSidebar />
            </aside>

            {/* Main Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Navbar */}
                <div className="shrink-0">
                    <DashboardNavbar />
                    {/* <h1>Dashboard navbar</h1> */}
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 mt-16">
                    {children}
                </main>
            </div>
        </div>
    );
}

