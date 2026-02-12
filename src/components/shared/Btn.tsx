import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

type BtnSize = "sm" | "lg" | "xl";

interface BtnProps {
    title?: string;
    size?: BtnSize;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
    children?: ReactNode;
}

export default function Btn({
    title,
    size = "lg",
    className,
    type = "button",
    disabled,
    isLoading,
    onClick,
    children,
}: BtnProps) {
    const sizeStyles = {
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
    };

    return (
        <Button
            type={type}
            disabled={disabled || isLoading}
            onClick={onClick}
            className={cn(
                "w-full font-semibold rounded-xl shadow-lg shadow-primary/20 bg-linear-to-r from-primary to-blue-600 hover:opacity-90 transition duration-300",
                sizeStyles[size],
                className
            )}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                </span>
            ) : (
                children || title
            )}
        </Button>
    );
}
