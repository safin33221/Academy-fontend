"use client";

import { useState } from "react";
import {
    Share2,
    X,
    Facebook,
    Linkedin,
    Twitter,
    Link,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ShareModalProps = {
    title: string;
    description?: string;
    slug: string;
};

export default function ShareModal({
    title,
    description,
    slug,
}: ShareModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const shareUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}/course/${slug}`
            : "";

    const handleCopy = async () => {
        if (!shareUrl) return;
        await navigator.clipboard.writeText(shareUrl);
    };

    const socialLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    };

    return (
        <>
            {/* Trigger Button */}
            <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={() => setIsOpen(true)}
            >
                <Share2 className="h-4 w-4 mr-2" />
                Share Course
            </Button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-background rounded-2xl shadow-xl p-6 relative animate-in fade-in zoom-in-95">
                        {/* Close */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <h3 className="text-lg font-semibold mb-6 text-center">
                            Share this Course
                        </h3>

                        {/* Social */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <a
                                href={socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2 p-4 rounded-xl border hover:bg-muted transition"
                            >
                                <Facebook className="h-6 w-6" />
                                <span className="text-xs">Facebook</span>
                            </a>

                            <a
                                href={socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2 p-4 rounded-xl border hover:bg-muted transition"
                            >
                                <Twitter className="h-6 w-6" />
                                <span className="text-xs">Twitter</span>
                            </a>

                            <a
                                href={socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2 p-4 rounded-xl border hover:bg-muted transition"
                            >
                                <Linkedin className="h-6 w-6" />
                                <span className="text-xs">LinkedIn</span>
                            </a>
                        </div>

                        {/* Copy */}
                        <div className="flex items-center gap-2 bg-muted rounded-lg p-2">
                            <input
                                readOnly
                                value={shareUrl}
                                className="flex-1 bg-transparent text-xs outline-none"
                            />
                            <Button size="sm" onClick={handleCopy}>
                                <Link className="h-4 w-4 mr-1" />
                                Copy
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}