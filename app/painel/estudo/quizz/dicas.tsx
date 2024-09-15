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
import { Card, CardContent } from "@/components/ui/card";

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
    { id: number; content: string }[] | null
  >(null);

  useEffect(() => {
    const getInfo = async () => {
      const chapterName = await getChapterName(chapterId);
      setChapter(chapterName.success!);
      const verses = await getVerses(verseIds);
      setVerses(verses.success!);
    };
    getInfo();
  }, []);

  return (
    <div>
      <Collapsible
        open={tip1IsOpen}
        onOpenChange={setTip1IsOpen}
        className="w-[350px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Capítulo Relacionado</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
            {chapter}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible
        open={tip2IsOpen}
        onOpenChange={setTip2IsOpen}
        className="w-[350px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">Versículos</h4>
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
                    <CardContent className="p-4">
                      <p className="text-sm">{v.content}</p>
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
