"use client"
import { logout } from "@/services/auth/logout";
import { Button } from "../ui/button";

export default function LogoutBtn() {

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div>
            <Button variant={`destructive`} className="w-full " onClick={handleLogout}>Logout</Button>
        </div>
    );
};
