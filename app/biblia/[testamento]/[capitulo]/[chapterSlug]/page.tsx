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
  const chapterVerses = await prisma.chapter.findFirst({
    where: { slug: chapterSlug },
    include: { Verses: true },
  });
  if (!chapterVerses) {
    console.log("deu merda");
    return {
      title: `BIBLIA SAGRADA TECH`,
      description: `O Melhor site de biblia online portuguesa do mundo`,
      keywords: [
        "Bíblia",
        "Escrituras",
        "Antigo Testamento",
        "Evangelho",
        "Salmos",
        "Profetas",
        "Apóstolos",
        `www.bibliasagrada.tech`,
        "bibliasagrada.tech",
        "Biblia Sagrada",
        "Biblia Online",
      ],
      viewport: "width=device-width, initial-scale=1.0",
      robots: "index, follow",
      authors: [
        {
          name: "Biblia Sagrada Tech",
          url: "https://www.bibliasagrada.tech",
        },
      ],
      openGraph: {
        images: [
          {
            url: "/img/pray.jpg",
            width: 800,
            height: 600,
            alt: "Descrição da imagem",
          },
        ],
      },
    };
  }
  const verse = chapterVerses?.Verses.filter(
    (v) => v.number === parseInt(searchParams.versiculo)
  );
  return {
    title: `${chapterVerses?.testament} TESTAMENTO - ${chapterVerses?.name}`,
    description: `${verse[0].content}`,
    keywords: [
      `${chapterVerses?.name} Versículo ${searchParams.versiculo}`,
      `${chapterVerses?.name}`,
      `Capítulo ${chapterVerses?.name}`,
      `Versículo ${searchParams.versiculo}`,
      "Bíblia",
      "Escrituras",
      "Antigo Testamento",
      "Evangelho",
      "Salmos",
      "Profetas",
      "Apóstolos",
      `${chapterVerses?.testament} Testamento`,
      `${chapterVerses?.name} Capítulo ${capitulo}`,
      `www.bibliasagrada.tech`,
      "bibliasagrada.tech",
      "Biblia Sagrada",
      "Biblia Online",
    ],
    viewport: "width=device-width, initial-scale=1.0",
    robots: "index, follow",
    authors: [
      {
        name: "Biblia Sagrada Tech",
        url: "https://www.bibliasagrada.tech",
      },
    ],
    openGraph: {
      images: [
        {
          url: "/img/pray.jpg",
          width: 800,
          height: 600,
          alt: "Biblia Sagrada Tech",
        },
      ],
    },
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
