"use client"
import { useRouter } from "next/navigation";
import { useTransition } from "react";


export default function HandleRefresh() {
    const [, startTransition] = useTransition();
    const router = useRouter();
    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };
    return handleRefresh
};
