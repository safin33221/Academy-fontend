import AdminDashboard from "@/components/module/admin/dashboard/AdminDashboard";
import { getAdminDashboardData } from "@/services/dashboard/adminDashboard";
import {
    EMPTY_ADMIN_DASHBOARD_DATA,
    IAdminDashboardData,
} from "@/types/dashboard/adminDashboard.interface";

export default async function Page() {
    const resAdmin = await getAdminDashboardData();
    const data: IAdminDashboardData =
        (resAdmin?.data as IAdminDashboardData) ?? EMPTY_ADMIN_DASHBOARD_DATA;

    return (
        <div>
            <AdminDashboard data={data} />
        </div>
    );
};
