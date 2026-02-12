import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type BtnSize = "sm" | "lg" | "xl";

interface BtnProps {
    title: string;
    size?: BtnSize;
}

export default function Btn({ title, size = "lg" }: BtnProps) {
    const sizeStyles = {
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
    };

    return (
        <Button
            className={cn(
                "shadow-xl shadow-primary/30 bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition duration-300",
                sizeStyles[size]
            )}
        >
            {title}
        </Button>
    );
}
