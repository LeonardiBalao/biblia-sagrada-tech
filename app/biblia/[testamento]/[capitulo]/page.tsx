import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/structure/navbar";
import { getChapterVerses } from "@/server/actions/get-chapter-verses";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getSlugChapters } from "@/server/actions/get-slug-chapters";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  getNumbersFromString,
  processString,
  removeChapterNumbers,
} from "@/server/utils/functions";
import { Label } from "@/components/ui/label";

interface PropertiesProps {
  params: {
    testamento: string;
    capitulo: string;
    versiculo: string;
  };
}

export default async function EstudoBiblia({ params }: PropertiesProps) {
  const { testamento, capitulo } = params;
  const session = await auth();

  const chapters = await getSlugChapters(capitulo);
  if (chapters.error || !chapters.success) return redirect("/biblia");

  return (
    <>
      <Navbar user={session?.user} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex gap-4 flex-wrap">
              <Card className="max-w-xs">
                <CardHeader>
                  <CardTitle>
                    {removeChapterNumbers(chapters.success[0].name)}
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                  <div className="mt-4">
                    <Label className="font-semibold text-md">
                      Selecione um capítulo
                    </Label>
                  </div>
                  <div className="grid grid-cols-6 gap-3 place-items-center mt-4">
                    {chapters.success?.map((c, i) => (
                      <Link
                        key={c.id}
                        href={`/biblia/novo-testamento/${capitulo}/${c.slug}?versiculo=1`}
                      >
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          className="text-md whitespace-pre-wrap h-auto py-2"
                        >
                          {getNumbersFromString(c.name)}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
