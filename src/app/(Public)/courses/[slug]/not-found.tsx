import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "404 - Page Not Found | Nexaali Academy",
    description:
        "The page you are looking for does not exist or may have been moved.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4 text-center">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-lg">Course Not Found</p>
            <p className="text-muted-foreground">
                The Course you are looking for does not exist or may have been moved.
            </p>
            <Link
                href="/"

            >
                <Button variant={`default`}>

                    Go Back Home
                </Button>
            </Link>
        </div >
    );
}