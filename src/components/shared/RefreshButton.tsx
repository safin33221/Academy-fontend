"use client";

import { RefreshCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";

interface RefreshButtonProps {
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
  showLabel?: boolean;
}

const RefreshButton = ({
  size = "default",
  variant = "outline",
  showLabel = true,
}: RefreshButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    const params = searchParams.toString(); // ✅ preserve role & filters

    startTransition(() => {
      if (params) {
        router.replace(`?${params}`);
      } else {
        router.refresh();
      }
    });
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleRefresh}
      disabled={isPending}
    >
      <RefreshCcw
        className={`h-4 w-4 ${isPending ? "animate-spin" : ""} ${showLabel ? "mr-2" : ""
          }`}
      />
      {showLabel && "Refresh"}
    </Button>
  );
};

export default RefreshButton;
