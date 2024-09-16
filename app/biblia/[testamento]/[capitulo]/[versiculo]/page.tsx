import PainelAside from "@/app/painel/painel-aside";
import PainelNavbar from "@/app/painel/painel-navbar";

import { getUserProgress } from "@/server/actions/get-user-progress";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { treatTestamentSlug } from "@/server/utils/functions";
import OpenBible from "./open-bible";
import Navbar from "@/components/structure/navbar";
import { getBiblePage } from "@/server/actions/get-bible-page";

interface PropertiesProps {
  params: {
    testamento: string;
    capitulo: string;
    versiculo: string;
  };
}

export default async function EstudoBiblia({ params }: PropertiesProps) {
  const { testamento, capitulo, versiculo } = params;
  const session = await auth();
  const cleanedTestamento = treatTestamentSlug(testamento);

  const page = await getBiblePage(
    cleanedTestamento,
    capitulo,
    parseInt(versiculo)
  );

  if (page.error || !page.success) return redirect("/biblia");

  return (
    <>
      <Navbar user={session?.user} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex gap-4 flex-wrap">
              <OpenBible page={page.success} user={session?.user} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
