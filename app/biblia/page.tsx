import PainelAside from "@/app/painel/painel-aside";
import PainelNavbar from "@/app/painel/painel-navbar";

import { getUserProgress } from "@/server/actions/get-user-progress";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { treatTestamentSlug } from "@/server/utils/functions";
import Navbar from "@/components/structure/navbar";
import { getBiblePage } from "@/server/actions/get-bible-page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PropertiesProps {
  params: {
    testamento: string;
    capitulo: string;
    versiculo: string;
  };
}

export default async function BibleOptions({ params }: PropertiesProps) {
  const session = await auth();

  return (
    <>
      <Navbar user={session?.user} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex gap-4 flex-wrap">
              <Card>
                <CardHeader>
                  <CardTitle>Biblia Sagrada</CardTitle>
                  <CardDescription>Índice</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
