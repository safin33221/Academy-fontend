import { getMe } from "@/services/auth/getMe";
import Navbar from "./Navbar";

export default async function NavbarWarper() {
    const res = await getMe()
    const user = res?.data


    return (
        <div className="absolute ">
            <Navbar user={user} />
        </div>
    );
};
