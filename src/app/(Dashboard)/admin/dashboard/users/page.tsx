import UserFilter from "@/components/module/admin/userManagement/UserFilter";
import UserManagementHeader from "@/components/module/admin/userManagement/UserManagementHeader";
import UserTable from "@/components/module/admin/userManagement/UserTable";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllUsers } from "@/services/user/getAllUser";

export default async function page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParamsObj = await searchParams;
    const finalParams = {
        ...searchParamsObj
    };
    const queryString = queryStringFormatter(finalParams);
    const res = await getAllUsers(queryString);
    const users = res?.data
    return (
        <div className="space-y-2">
            <UserManagementHeader />
            <UserFilter />
            <UserTable users={users} />
        </div>
    );
};
