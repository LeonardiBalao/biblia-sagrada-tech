"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface LoadingButtonProps {
  text: string;
  href: string;
  loadingText: string;
}

export default function LoadingButton({
  text,
  href,
  loadingText,
}: LoadingButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      router.push(href);
    }, 1000);
  };

  if (loading) {
    return (
      <Button className="w-full flex gap-4" variant={"outline"}>
        <div className="w-4 h-4 border-2 border-blue-200 rounded-full animate-spin border-t-transparent" />
        {loadingText}
      </Button>
    );
  } else {
    return (
      <Button className="w-full flex gap-4" onClick={handleSubmit}>
        {text}
      </Button>
    );
  }
}
