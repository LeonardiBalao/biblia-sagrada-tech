import PainelAside from "@/app/painel/painel-aside";
import PainelNavbar from "@/app/painel/painel-navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

import { Separator } from "@/components/ui/separator";
import { getUserProgress } from "@/server/actions/get-user-progress";
import { setUserProgress } from "@/server/actions/set-user-progress";
import { auth } from "@/server/auth";
import { treatTestamentSlug } from "@/utils/functions";
import Link from "next/link";
import { redirect } from "next/navigation";
import Bible from "./bible";

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
  const { success, error } = await getUserProgress(session.user.id);
  if (error || !success) return redirect("/auth/login");
  if (
    cleanedTestamento !== success.testament ||
    capitulo !== success.slug ||
    parseInt(versiculo) !== success.verseId
  )
    return <div>Não autorizado</div>;

  const next = async () => {
    const { created, fail } = await setUserProgress(session.user.id!, success);
    if (fail) {
      toast.error(fail);
      return;
    }
    toast.success(created);
  };

  return (
    <>
      <PainelAside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <PainelNavbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex gap-4 flex-wrap">
              <Bible progress={success} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
