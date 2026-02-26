"use server";

import { serverFetch } from "@/lib/serverFetch";
import { IUserRole } from "@/types/user/user";


export const updateUserRole = async (
    id: string,
    role: IUserRole
) => {
    try {

        const res = await serverFetch.patch(
            `/users/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role }),
            }
        );


        return await res.json();
    } catch (error) {
        console.error("Update user role error:", error);
        throw error;
    }
};