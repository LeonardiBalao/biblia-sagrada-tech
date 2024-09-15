import PainelAside from "@/app/painel/painel-aside";
import PainelNavbar from "@/app/painel/painel-navbar";

import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import Quizz from "./quizz";
import { getQuizz } from "@/server/actions/get-question";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoadingButton from "@/components/structure/loading-button";

export default async function EstudoBiblia() {
  const session = await auth();
  if (!session || !session?.user.id) return redirect("/auth/login");
  const quizz = await getQuizz(session.user.id);

  return (
    <>
      <PainelAside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <PainelNavbar user={session.user} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex gap-4 flex-wrap">
              {quizz.success && (
                <Quizz quizz={quizz.success} user={session.user} />
              )}
              {!quizz.success && (
                <Card className="w-full md:max-w-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-center font-serif bg-secondary py-2">
                      QUIZZ
                    </CardTitle>
                    <Separator />
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 mt-4 justify-center items-center">
                    <p>Você já respondeu a todas as perguntas.</p>
                    <Badge>Amanhã tem mais!</Badge>
                    <Separator />
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <LoadingButton
                      text="Voltar ao painel"
                      href="/painel"
                      loadingText="Redirecionando ao painel"
                    />
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
