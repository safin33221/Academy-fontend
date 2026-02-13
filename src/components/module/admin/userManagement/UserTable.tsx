import ManagementTable from "@/components/shared/ManagementTable";
import { IUser } from "@/types/user/user";
import { UserColumn } from "./UserColumn";

export default function UserTable({ users }: { users: IUser[] }) {
    return (
        <div>
            <div className="overflow-x-auto rounded-lg border">
                <ManagementTable
                    data={users}
                    columns={UserColumn}
                    getRowKey={(user) => user.id}
                // onView={handleView}
                // onDelete={handleDelete}
                />


            </div>
        </div>
    );
};
