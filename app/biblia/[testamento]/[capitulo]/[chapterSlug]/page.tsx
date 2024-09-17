import PainelAside from "@/app/painel/painel-aside";
import PainelNavbar from "@/app/painel/painel-navbar";

import { getUserProgress } from "@/server/actions/get-user-progress";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { treatTestamentSlug } from "@/server/utils/functions";
import Navbar from "@/components/structure/navbar";
import { getBiblePage } from "@/server/actions/get-bible-page";
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

interface PropertiesProps {
  params: {
    testamento: string;
    capitulo: string;
    chapterSlug: string;
  };
}

export default async function EstudoBiblia({ params }: PropertiesProps) {
  const { capitulo, chapterSlug } = params;
  const session = await auth();

  const verses = await getChapterVerses(chapterSlug);

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
                  <CardTitle>{verses.success.chapterName}</CardTitle>
                  <CardDescription>
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
