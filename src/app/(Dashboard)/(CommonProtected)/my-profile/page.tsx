import MyProfile from "@/components/module/CommonProtected/myProfile/MyProfile";
import { getMe } from "@/services/auth/getMe";
import { IUser } from "@/types/user/user";

export default async function page() {
    const res = await getMe()
    const user: IUser = res?.data
    return (
        <div>
            <MyProfile user={user} />
        </div>
    );
};
