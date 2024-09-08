import PainelAside from "@/app/painel/painel-aside";
import PainelNavbar from "@/app/painel/painel-navbar";

import { toast } from "sonner";

import { getUserProgress } from "@/server/actions/get-user-progress";
import { setUserProgress } from "@/server/actions/set-user-progress";
import { auth } from "@/server/auth";
import { redirect, useRouter } from "next/navigation";
import Bible from "./bible";
import { treatTestamentSlug } from "@/server/utils/functions";

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

  if (!session || !session?.user.id) return redirect("/auth/login");
  const { progress, error } = await getUserProgress(session.user.id);
  if (error || !progress) return redirect("/auth/login");
  if (
    cleanedTestamento !== progress.testament ||
    capitulo !== progress.slug ||
    parseInt(versiculo) !== progress.verseNumber
  )
    return redirect(
      `/painel/estudo/biblia/${progress.testament.toLowerCase()}-testamento/${
        progress.slug
      }/${progress.verseNumber}`
    );

  return (
    <>
      <PainelAside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <PainelNavbar user={session.user} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex gap-4 flex-wrap">
              <Bible progress={progress} user={session.user} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
