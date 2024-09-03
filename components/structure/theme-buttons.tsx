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
          "flex gap-2 items-center group justify-center text-sm px-2 py-1 rounded-full border scale-75 cursor-pointer",
          className
        )}
      >
        <Sun
          size={21}
          className={`${checked ? "block" : "hidden"} text-yellow-500`}
          onClick={(e) => {
            setChecked((prev) => !prev);
            e ? setTheme("light") : setTheme("dark");
          }}
        />

        <Moon
          fill="blue"
          size={21}
          className={`${!checked ? "block" : "hidden"} text-blue-500`}
          onClick={(e) => {
            setChecked((prev) => !prev);
            e ? setTheme("dark") : setTheme("light");
          }}
        />
      </div>
    </>
  );
}
