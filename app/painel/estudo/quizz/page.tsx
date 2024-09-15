import PainelAside from "@/app/painel/painel-aside";
import PainelNavbar from "@/app/painel/painel-navbar";

import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import Quizz from "./quizz";
import { getQuizz } from "@/server/actions/get-question";

export default async function EstudoBiblia() {
  const session = await auth();
  if (!session || !session?.user.id) return redirect("/auth/login");
  const quizz = await getQuizz();

  if (!quizz.success) return redirect("/painel");

  return (
    <>
      <PainelAside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <PainelNavbar user={session.user} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex gap-4 flex-wrap">
              <Quizz quizz={quizz.success} user={session.user} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
