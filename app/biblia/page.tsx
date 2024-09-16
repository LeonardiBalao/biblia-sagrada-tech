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

export default async function BibleIndex() {
  const session = await auth();
  const allChapters = await getAllChapters();

  return (
    <>
      <Navbar user={session?.user} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex gap-4 flex-wrap">
              <Card>
                <CardHeader>
                  <CardTitle className={"text-xl"}>Biblia Sagrada</CardTitle>
                  <CardDescription>Índice de capítulos</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="velho" className="w-[320px]">
                    <TabsList>
                      <TabsTrigger value="velho">Velho Testamento</TabsTrigger>
                      <TabsTrigger value="novo">Novo Testamento</TabsTrigger>
                    </TabsList>
                    <TabsContent value="velho">
                      <Separator />
                      <div className="w-full flex justify-center my-4">
                        <ChapterComboBox
                          chapters={allChapters.success?.old}
                          testament={allChapters.success?.old[0].testament!}
                        />
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 gap-1 place-items-center mt-4">
                        {allChapters.success?.old.map((c) => (
                          <Link
                            key={c.id}
                            href={`/biblia/velho-testamento/${c.slug}`}
                          >
                            <Button
                              variant={"outline"}
                              size={"sm"}
                              className="text-xs w-40 whitespace-pre-wrap"
                            >
                              {c.name[0] +
                                c.name
                                  .split("")
                                  .slice(1)
                                  .join("")
                                  .toLowerCase()}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="novo">
                      <Separator />
                      <div className="w-full flex justify-center my-4">
                        <ChapterComboBox
                          chapters={allChapters.success?.new}
                          testament={allChapters.success?.new[0].testament!}
                        />
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 gap-1 place-items-center mt-4">
                        {allChapters.success?.new.map((c) => (
                          <Link
                            className="w-full"
                            key={c.id}
                            href={`/biblia/novo-testamento/${c.slug}`}
                          >
                            <Button
                              variant={"outline"}
                              size={"sm"}
                              className="text-xs w-40 whitespace-pre-wrap"
                            >
                              {c.name[0] +
                                c.name
                                  .split("")
                                  .slice(1)
                                  .join("")
                                  .toLowerCase()}
                            </Button>
                          </Link>
                        ))}
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
