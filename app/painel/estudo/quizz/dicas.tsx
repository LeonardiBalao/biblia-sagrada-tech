/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useEffect, useState } from "react";
import { getChapterName } from "@/server/actions/get-chapter-name";
import { getVerses } from "@/server/actions/get-verses";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DicasProps {
  chapterId: number;
  verseIds: number[];
}

export function Dicas({ chapterId, verseIds }: DicasProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tip1IsOpen, setTip1IsOpen] = useState(false);
  const [tip2IsOpen, setTip2IsOpen] = useState(false);
  const [chapter, setChapter] = useState("");
  const [verses, setVerses] = useState<
    { id: number; content: string; number: number }[] | null
  >(null);

  useEffect(() => {
    setTip1IsOpen(false);
    setTip2IsOpen(false);
    const getInfo = async () => {
      const chapterName = await getChapterName(chapterId);
      setChapter(chapterName.success!);
      const verses = await getVerses(verseIds, chapterId);
      setVerses(verses.success!);
    };
    getInfo();
  }, [chapterId, verseIds]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <Collapsible
        open={tip1IsOpen}
        onOpenChange={setTip1IsOpen}
        className="w-full space-y-2"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Capítulo Relacionado</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2 w-full">
          <span className="pl-4 text-xs">{chapter}</span>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={tip2IsOpen}
        onOpenChange={setTip2IsOpen}
        className="w-full space-y-2"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold ">Versículos Relacionados</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <Carousel>
            <CarouselContent>
              {verses?.map((v) => (
                <CarouselItem key={v.id}>
                  <Card>
                    <CardContent className="p-4 min-h-[240px] w-full flex flex-col gap-4 px-4 bg-secondary rounded-xl">
                      <Badge
                        variant={"outline"}
                        className="text-center font-bold text-md mb-4 mx-auto rounded-full border-2"
                      >
                        {v.number}
                      </Badge>
                      <div className="flex flex-wrap">
                        <p className="first-letter:text-3xl  text-sm xl first-letter:leading-tight first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:font-extrabold">
                          {v.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {verses !== null && verses.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
