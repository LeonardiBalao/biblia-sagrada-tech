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
import { VersesTabs } from "./verses-tabs";
import { getChaptersAmount } from "@/server/actions/get-chapters-amount";
import NextChapter from "./next-chapter";
import PreviousChapter from "./previous-chapter";
import { Metadata, ResolvingMetadata } from "next";
import prisma from "@/server/db";

interface PropertiesProps {
  params: {
    testamento: string;
    capitulo: string;
    chapterSlug: string;
  };
  searchParams: {
    versiculo: string;
  };
}

export async function generateMetadata({
  params,
  searchParams,
}: PropertiesProps): Promise<Metadata> {
  const { testamento, capitulo, chapterSlug } = params;
  const chapter = await prisma.chapter.findFirst({
    where: { slug: chapterSlug },
  });
  let versiculo = !searchParams.versiculo
    ? 1
    : parseInt(searchParams.versiculo);
  const verse = await prisma.verse.findFirst({
    where: {
      number: versiculo,
    },
  });

  return {
    title: `${chapter?.testament} TESTAMENTO - ${chapter?.name}`,
    description: `${verse!.content}`,
    keywords: [
      `${chapter?.name} Versículo ${searchParams.versiculo}`,
      `${chapter?.name}`,
      `Capítulo ${chapter?.name}`,
      `Versículo ${searchParams.versiculo}`,
      `${chapterSlug.replaceAll("-", " ")}:${searchParams.versiculo}`,
      `${chapterSlug.replaceAll("-", " ")},${searchParams.versiculo}`,
      `${chapterSlug.replaceAll("-", " ")} ${searchParams.versiculo}`,
      "Versículos sobre amor",
      "Passagens bíblicas sobre fé",
      "Versíclo sobre fé",
      "Versículo sobre paz",
      `${chapter?.testament} Testamento`,
      `${chapter?.name} Capítulo ${capitulo}`,
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    authors: [
      {
        name: "Biblia Sagrada Tech",
        url: "https://www.bibliasagrada.tech",
      },
    ],
  };
}

export default async function EstudoBiblia({ params }: PropertiesProps) {
  const { capitulo, chapterSlug } = params;
  const session = await auth();

  const verses = await getChapterVerses(chapterSlug);
  const chaptersAmount = await getChaptersAmount(capitulo);

  if (verses.error || !verses.success) return redirect("/biblia");

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
                    <div className="flex gap-4 justify-between">
                      <div>
                        <PreviousChapter
                          chaptersAmount={chaptersAmount.success!}
                        />
                      </div>
                      <div>{verses.success.chapterName}</div>
                      <div>
                        <NextChapter chaptersAmount={chaptersAmount.success!} />
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-center">
                    {verses.success.verses.length} versículos
                  </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent>
                  <VersesTabs verses={verses.success.verses} />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
