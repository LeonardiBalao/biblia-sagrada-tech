/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import LoadingButton from "@/components/structure/loading-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Verse } from "@prisma/client";
import { ArrowLeft, ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface VersesTabsProps {
  verses: Verse[];
}

export function VersesTabs({ verses }: VersesTabsProps) {
  const [tabValue, setTabValue] = useState("1");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const updateUrlParams = (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("versiculo", tabValue);
      router.push(`?${params.toString()}`);
    };
    updateUrlParams(tabValue);
  }, [tabValue]);

  useEffect(() => {
    const paramValue = searchParams.get("versiculo");
    if (paramValue) setTabValue(paramValue);
  }, []);

  return (
    <Tabs value={tabValue} className="mt-4">
      <TabsList className="flex flex-wrap bg-transparent h-auto">
        {verses.map((v) => (
          <TabsTrigger
            className="w-6 bg-secondary m-1"
            key={v.number}
            value={v.number.toString()}
            onClick={() => setTabValue(v.number.toString())}
          >
            {v.number}
          </TabsTrigger>
        ))}
      </TabsList>
      {verses.map((v) => (
        <TabsContent key={v.id} value={v.number.toString()}>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-center">
                <Badge
                  variant={"outline"}
                  className="text-center font-bold text-md mx-auto rounded-full border-2"
                >
                  {v.number}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="first-letter:text-4xl first-letter:leading-tight first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:font-extrabold">
                {v.content}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 justify-center">
              <div className="mb-4">
                <Button
                  className="rounded-full border-0 shadow-2xl"
                  variant={"outline"}
                  size={"sm"}
                  disabled={parseInt(tabValue) <= 1 ? true : false}
                  onClick={() =>
                    setTabValue((e: string) => {
                      let previousVerse = parseInt(e) - 1;
                      if (!(previousVerse === 0)) {
                        return previousVerse.toString();
                      } else {
                        return e;
                      }
                    })
                  }
                >
                  <ArrowLeftCircle />
                </Button>
                <Button
                  className="rounded-full border-0 shadow-2xl"
                  variant={"outline"}
                  size={"sm"}
                  disabled={parseInt(tabValue) >= verses.length ? true : false}
                  onClick={() =>
                    setTabValue((e: string) => {
                      let nextVerse = parseInt(e) + 1;
                      if (!(nextVerse >= verses.length)) {
                        return nextVerse.toString();
                      } else {
                        return e;
                      }
                    })
                  }
                >
                  <ArrowRightCircle />
                </Button>
              </div>
              <LoadingButton
                text="Voltar"
                href="/biblia"
                loadingText="Carregando"
                icon={<ArrowLeft size={14} />}
                className="w-full"
              />
            </CardFooter>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
