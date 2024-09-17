import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { auth } from "@/server/auth";
import Navbar from "@/components/structure/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllChapters } from "@/server/actions/get-all-chapters";
import { ChapterComboBox } from "./chapter-combobox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { generateSlug, processString } from "@/server/utils/functions";

export default async function BibleIndex() {
  const session = await auth();
  const allChapters = await getAllChapters();

  return (
    <>
      <Navbar user={session?.user} />
      <div className="flex flex-col pl-0 sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex gap-4 flex-wrap">
              <Card className="max-w-xs">
                <CardHeader>
                  <CardTitle className={"text-xl"}>Biblia Sagrada</CardTitle>
                  <CardDescription>Índice de capítulos</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="velho">
                    <TabsList>
                      <TabsTrigger className="text-xs" value="velho">
                        Velho Testamento
                      </TabsTrigger>
                      <TabsTrigger className="text-xs" value="novo">
                        Novo Testamento
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="velho">
                      <Separator />
                      <div className="w-full flex justify-center my-4">
                        <ChapterComboBox
                          chapters={allChapters.success?.old.chaptersOld}
                          testament={
                            allChapters.success?.old.chaptersOld[0].testament!
                          }
                        />
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 gap-1 place-items-center mt-4">
                        {allChapters.success?.old.uniqueOldChapters.map(
                          (c, i) => (
                            <Link
                              key={i}
                              href={`/biblia/velho-testamento/${generateSlug(
                                c
                              )}`}
                            >
                              <Button
                                variant={"outline"}
                                size={"sm"}
                                className="text-xs w-32 whitespace-pre-wrap h-auto py-2"
                              >
                                {processString(c)}
                              </Button>
                            </Link>
                          )
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="novo">
                      <Separator />
                      <div className="w-full flex justify-center my-4">
                        <ChapterComboBox
                          chapters={allChapters.success?.new.chaptersNew}
                          testament={
                            allChapters.success?.new.chaptersNew[0].testament!
                          }
                        />
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 gap-1 place-items-center mt-4">
                        {allChapters.success?.new.uniqueNewChapters.map(
                          (c, i) => (
                            <Link
                              key={i}
                              href={`/biblia/novo-testamento/${generateSlug(
                                c
                              )}`}
                            >
                              <Button
                                variant={"outline"}
                                size={"sm"}
                                className="text-xs w-32 whitespace-pre-wrap h-auto py-2"
                              >
                                {processString(c)}
                              </Button>
                            </Link>
                          )
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
