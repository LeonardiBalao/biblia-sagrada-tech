"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface NextChapterProps {
  chaptersAmount: number;
}

export default function NextChapter({ chaptersAmount }: NextChapterProps) {
  const router = useRouter();
  const [path, setPath] = useState("");
  const [currentChapter, setCurrentChapter] = useState(0);
  const [nextPath, setNextPath] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPath(window.location.pathname);
    const paths = path.split("/");
    const chapterNumber = paths[paths.length - 1].split("-");
    setCurrentChapter(parseInt(chapterNumber[chapterNumber.length - 1]));
  }, [path, currentChapter]);

  const handleNextChapter = async () => {
    setLoading(true);
    if (currentChapter + 1 >= chaptersAmount) {
      setLoading(false);
      return toast.error("Este é o último capítulo.");
    }
    setTimeout(() => setLoading(false), 2000);
    return router.push(
      path.replace(currentChapter.toString(), (currentChapter + 1).toString())
    );
  };

  return (
    <Button
      className="rounded-full shadow-lg border-0"
      variant={"outline"}
      size={"sm"}
      disabled={currentChapter + 1 >= chaptersAmount ? true : false}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-blue-200 rounded-full animate-spin border-t-transparent" />
      ) : (
        <ArrowRightCircle onClick={handleNextChapter} />
      )}
    </Button>
  );
}
