
import { INavSection } from "@/types/dashboard/NavItem";
import { getNavItemByRole } from "@/lib/navItem.config";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { IUser, IUserRole } from "@/types/user/user";

interface DashboardNavbarProps {

    user: IUser
}
export default function DashboardNavbar({

    user
}: DashboardNavbarProps) {
    const navItems: INavSection[] = getNavItemByRole(user?.role as IUserRole)
    return (
        <div>
            <DashboardNavbarContent user={user} navItems={navItems} />
        </div>

    );
}