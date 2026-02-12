"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const formatSegment = (segment: string) => {
    return segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function Breadcrumb() {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);

    return (
        <div className="text-sm text-muted-foreground mb-4">
            <nav className="flex items-center gap-2">
                <Link href="/" className="hover:text-primary">
                    Home
                </Link>

                {segments.map((segment, index) => {
                    const href = "/" + segments.slice(0, index + 1).join("/");
                    const isLast = index === segments.length - 1;

                    return (
                        <div key={href} className="flex items-center gap-2">
                            <span>/</span>
                            {isLast ? (
                                <span className="text-foreground font-medium">
                                    {formatSegment(segment)}
                                </span>
                            ) : (
                                <Link href={href} className="hover:text-primary">
                                    {formatSegment(segment)}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}
