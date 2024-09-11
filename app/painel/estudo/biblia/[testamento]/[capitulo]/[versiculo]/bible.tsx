"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Note from "./note";
import { setUserProgress } from "@/server/actions/set-user-progress";
import { useRouter } from "next/navigation";
import { ExtendUser } from "@/types/next-auth";
import { useEffect, useState } from "react";

interface BibleProps {
  progress: UserProgress;
  user: ExtendUser;
}

export default function Bible({ progress, user }: BibleProps) {
  const timer = 7;
  const [seconds, setSeconds] = useState(timer);
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState(true);
  const router = useRouter();
  const handleSubmit = async () => {
    setLoading(true);
    const { success, error } = await setUserProgress(progress, user);
    if (error) return toast.error(error);
    toast.success(success!.message);
    if (success?.newAchievement) {
      toast.message(`Nova conquista! ${success.newAchievement.name}`, {
        description: success.newAchievement.description,
      });
    }
    router.push(`/painel/estudo/biblia/${success!.url}`);
    return setTimeout(() => setLoading(false), 2000);
  };

  useEffect(() => {
    setTimeout(() => setReading(false), timer * 1000);
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [seconds]);

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl text-center font-serif bg-secondary py-2">
          {progress.testament} TESTAMENTO
        </CardTitle>
        <Separator />
        <div className="w-full flex justify-center py-4 items-center">
          <Badge variant={"secondary"} className="text-md shadow-lg">
            {progress.chapterName}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="mb-4">
          <div className="w-full flex justify-center">
            <Badge
              variant={"outline"}
              className="text-center font-bold text-md mb-4 mx-auto rounded-full border-2"
            >
              {progress.verses[0].number}
            </Badge>
            <Note verse={progress.verses[0]} progress={progress} />
          </div>
          <p className="first-letter:text-4xl first-letter:leading-tight first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:font-extrabold">
            {progress.verses[0].content}
          </p>
        </div>
        {progress.verses.slice(1).map((v) => (
          <div key={v.number} className="mb-2">
            <div className="w-full flex justify-center">
              <Badge
                variant={"outline"}
                className="text-center font-bold text-md mb-4 mx-auto rounded-full border-2"
              >
                {v.number}
              </Badge>
              <Note verse={v} progress={progress} />
            </div>
            <p className="first-letter:text-4xl first-letter:leading-tight first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:font-extrabold">
              {v.content}
            </p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        {loading ? (
          <Button className="w-full flex gap-4" variant={"outline"}>
            <div className="w-4 h-4 border-2 border-blue-200 rounded-full animate-spin border-t-transparent" />
            Carregando...
          </Button>
        ) : (
          <Button
            className="w-full flex gap-4"
            disabled={reading}
            onClick={handleSubmit}
          >
            {reading
              ? "Leitura"
              : progress.verses.length === 3
              ? "Próxima página"
              : "Próximo capítulo"}

            {seconds !== 0 && (
              <div className="text-md font-bold animate-pulse">{seconds}</div>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
