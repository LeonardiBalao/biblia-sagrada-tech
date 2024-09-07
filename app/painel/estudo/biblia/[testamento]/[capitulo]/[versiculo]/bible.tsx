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
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import Note from "./note";
import { setUserProgress } from "@/server/actions/set-user-progress";
import { useRouter } from "next/navigation";

interface BibleProps {
  progress: UserProgress;
}

export default function Bible({ progress }: BibleProps) {
  const router = useRouter();
  const handleSubmit = async () => {
    const { success, error } = await setUserProgress(progress);
    if (error) return toast.error(error);
    toast.success(success);
    router.push(
      `/painel/estudo/biblia/${progress.testament.toLocaleLowerCase()}-testamento/${
        progress.slug
      }/${progress.verseId + 4}`
    );
  };

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
              {progress.verses[0].id}
            </Badge>
            <Note verse={progress.verses[0]} progress={progress} />
          </div>
          <p className="first-letter:text-4xl first-letter:leading-tight first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:font-extrabold">
            {progress.verses[0].content}
          </p>
        </div>
        {progress.verses.slice(1).map((v) => (
          <div key={v.id} className="mb-2">
            <div className="w-full flex justify-center">
              <Badge
                variant={"outline"}
                className="text-center font-bold text-md mb-4 mx-auto rounded-full border-2"
              >
                {v.id}
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
        <Button className="w-full" onClick={handleSubmit}>
          Próxima página
        </Button>
      </CardFooter>
    </Card>
  );
}
