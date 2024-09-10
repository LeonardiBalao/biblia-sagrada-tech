"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeButtons({ className }: { className: string }) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    theme === "dark" || (resolvedTheme === "dark" && theme === "system")
      ? setChecked(true)
      : setChecked(false);
  }, [resolvedTheme, theme]);

  return (
    <>
      <div
        className={cn(
          "flex gap-2 items-center group justify-center text-sm px-2 py-1 rounded-full border-2 border-secondary scale-75 shadow-lg",
          className
        )}
      >
        <Sun
          size={24}
          className={cn(
            "text-yellow-500 cursor-pointer",
            checked ? "block" : "hidden"
          )}
          onClick={(e) => {
            setChecked((prev) => !prev);
            e ? setTheme("light") : setTheme("dark");
          }}
        />

        <Moon
          fill="blue"
          size={24}
          className={cn(
            "text-blue-500 cursor-pointer",
            !checked ? "block" : "hidden"
          )}
          onClick={(e) => {
            setChecked((prev) => !prev);
            e ? setTheme("dark") : setTheme("light");
          }}
        />
      </div>
    </>
  );
}
