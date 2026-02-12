import { getMe } from "@/services/auth/getMe";
import Navbar from "./Navbar";

export default async function NavbarWarper() {
    const user = await getMe()
    console.log({ user });
    return (
        <div>
            <Navbar user={user} />
        </div>
    );
};
