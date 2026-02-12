import { getMe } from "@/services/auth/getMe";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { INavSection } from "@/types/dashboard/NavItem";
import { getNavItemByRole } from "@/lib/navItem.config";
import { IUserRole } from "@/types/user/user";

export default async function DashboardSidebar() {
    const res = await getMe()
    const user = res?.data
    if (!user) {
        return null
    }

    const navItems: INavSection[] = getNavItemByRole(user?.role as IUserRole)
    return (
        <div>
            <DashboardSidebarContent navItems={navItems} user={user} />
        </div>
    );
};
