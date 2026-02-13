"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { useDebounce } from "@/app/hooks/useDebounce";


interface SearchFilterProps {
  placeholder?: string;
  paramName: string;
}

const SearchFilter = ({
  placeholder = "Search...",
  paramName,
}: SearchFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // 🔑 controlled state
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  // ✅ URL → Input sync (MOST IMPORTANT PART)
  useEffect(() => {
    const urlValue = searchParams.get(paramName) ?? "";
    setValue(urlValue);
  }, [searchParams, paramName]);

  // ✅ Input → URL sync (debounced)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const urlValue = searchParams.get(paramName) ?? "";

    if (debouncedValue === urlValue) return;

    if (debouncedValue) {
      params.set(paramName, debouncedValue);
      params.set("page", "1");
    } else {
      params.delete(paramName);
      params.delete("page");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isPending}
      />
    </div>
  );
};

export default SearchFilter;
