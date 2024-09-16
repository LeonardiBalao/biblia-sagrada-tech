"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { ExtendUser } from "@/types/next-auth";
import { useEffect, useState } from "react";
import { Verse } from "@prisma/client";

interface BibleProps {
  page:
    | {
        testament: string;
        chapter: string;
        verses: Verse[];
      }
    | undefined;
  user: ExtendUser | undefined;
}

export default function OpenBible({ page, user }: BibleProps) {
  const timer = 7;
  const [seconds, setSeconds] = useState(timer);
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState(true);
  const router = useRouter();
  const handleSubmit = async () => {
    setLoading(true);
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
          {page?.testament} TESTAMENTO
        </CardTitle>
        <Separator />
        <div className="w-full flex justify-center py-4 items-center">
          <Badge variant={"secondary"} className="text-md shadow-lg">
            {page?.chapter}
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
              {page?.verses[0].number}
            </Badge>
          </div>
          <p className="first-letter:text-4xl first-letter:leading-tight first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:font-extrabold">
            {page?.verses[0].content}
          </p>
        </div>
        {page?.verses.slice(1).map((v) => (
          <div key={v.number} className="mb-2">
            <div className="w-full flex justify-center">
              <Badge
                variant={"outline"}
                className="text-center font-bold text-md mb-4 mx-auto rounded-full border-2"
              >
                {v.number}
              </Badge>
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
              : page?.verses.length === 3
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
