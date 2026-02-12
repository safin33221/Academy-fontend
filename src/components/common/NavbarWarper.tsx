import { getMe } from "@/services/auth/getMe";
import Navbar from "./Navbar";

export default async function NavbarWarper() {
    const user = await getMe()
    console.log({ user });
    return (
        <div className="sticky top-5 z-50  ">
            <Navbar user={user} />
        </div>
    );
};
