/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import React from "react";

export const StatCard = ({
    icon,
    title,
    value,
    description,
    trend,
    trendDirection = "up",
    loading = false,
    size = "md" // নতুন prop: "sm" বা "md"
}: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    description?: string;
    trend?: number;
    trendDirection?: "up" | "down";
    loading?: boolean;
    size?: "sm" | "md";
}) => {
    // সাইজ অনুযায়ী className
    const sizeClasses = {
        sm: {
            container: "rounded-lg border p-2", // padding কমালাম
            iconWrapper: "p-1.5 rounded-lg", // icon container ছোট
            icon: "h-3.5 w-3.5", // icon নিজেই ছোট
            title: "text-[10px] leading-tight", // টাইটেল ছোট
            value: "text-sm font-semibold", // ভ্যালু ছোট
            description: "text-[9px]",
            badge: "text-[8px] px-1 py-0",
            gap: "gap-1.5"
        },
        md: {
            container: "rounded-xl border p-4",
            iconWrapper: "p-2 rounded-lg",
            icon: "h-4 w-4",
            title: "text-xs",
            value: "text-lg font-semibold",
            description: "text-xs",
            badge: "text-xs px-1.5 py-0",
            gap: "gap-3"
        }
    };

    const classes = sizeClasses[size];

    if (loading) {
        return (
            <div className={cn(classes.container, "bg-card animate-pulse")}>
                <div className={cn("flex items-center", classes.gap)}>
                    <div className={cn(classes.iconWrapper, "bg-muted/50 w-8 h-8")} />
                    <div className="space-y-1 flex-1">
                        <div className={cn("h-2 bg-muted rounded w-12", classes.title)} />
                        <div className={cn("h-3 bg-muted rounded w-8", classes.value)} />
                        {description && <div className={cn("h-2 bg-muted rounded w-14", classes.description)} />}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cn(
            classes.container,
            "bg-card hover:shadow-sm transition-all duration-300 group"
        )}>
            <div className={cn("flex items-center", classes.gap)}>
                <div className={cn(
                    classes.iconWrapper,
                    "bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300"
                )}>
                    {icon && typeof icon === 'object' && 'type' in icon
                        ? React.cloneElement(icon as React.ReactElement<any>, {
                            className: cn(classes.icon, "text-current")
                        })
                        : icon
                    }
                </div>
                <div className="flex-1 min-w-0">
                    <p className={cn("text-muted-foreground truncate", classes.title)}>
                        {title}
                    </p>
                    <div className="flex items-center flex-wrap gap-1">
                        <p className={classes.value}>{value}</p>
                        {description && (
                            <span className={cn("text-muted-foreground truncate", classes.description)}>
                                {description}
                            </span>
                        )}
                        {trend !== undefined && (
                            <Badge
                                variant="outline"
                                className={cn(
                                    classes.badge,
                                    trendDirection === "up"
                                        ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                                        : "text-red-600 border-red-200 bg-red-50"
                                )}
                            >
                                {trendDirection === "up" ? "↑" : "↓"} {trend}%
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};