import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import PainelAside from "../painel-aside";
import PainelNavbar from "../painel-navbar";
import { Configuracoes } from "./configuracoes";

export default async function Painel() {
  const session = await auth();
  if (!session) return redirect("/");
  return (
    <>
      <PainelAside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <PainelNavbar user={session.user} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex gap-4  md:gap-8 md:justify-center">
            <Configuracoes user={session.user} />
          </div>
        </main>
      </div>
    </>
  );
}
