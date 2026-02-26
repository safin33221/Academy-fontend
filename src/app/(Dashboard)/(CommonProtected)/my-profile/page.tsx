import MyProfile from "@/components/module/CommonProtected/myProfile/MyProfile";
import { getMe } from "@/services/auth/getMe";
import { IUser } from "@/types/user/user";
import { redirect } from "next/navigation";

export default async function page() {
    const res = await getMe()
    const user: IUser | undefined = res?.data

    if (!user) {
        redirect("/")
    }

    return (
        <div>
            <MyProfile user={user} />
        </div>
    );
};
