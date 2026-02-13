import UserManagementHeader from "@/components/module/admin/userManagement/UserManagementHeader";
import UserTable from "@/components/module/admin/userManagement/UserTable";
import { getAllUsers } from "@/services/user/getAllUser";

export default async function page() {
    const res = await getAllUsers()
    const users = res.data
    return (
        <div>
            <UserManagementHeader />
            <UserTable users={users} />
        </div>
    );
};
