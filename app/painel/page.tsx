import { ChartLine, Cross } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PainelAside from "./painel-aside";
import PainelNavbar from "./painel-navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getGeneralInfo } from "@/server/actions/get-general-info";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import prisma from "@/server/db";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { getTop10Users } from "@/server/actions/get-top-10-users";

export default async function Painel() {
  let top10users: LeaderboardUser[] = [];
  const session = await auth();
  if (!session) return redirect("/auth/login");
  const { error, success } = await getGeneralInfo(session.user);
  const chapters = await prisma.chapter.findMany({ take: 5 });
  if (error) return redirect("/painel/configuracoes");
  if (session.user.firstLogin || !session.user.acceptsTerms)
    return redirect("/painel/configuracoes");

  const top10 = await getTop10Users();
  if (!top10) {
    top10users = [];
  } else {
    top10users = top10;
  }
  return (
    <>
      <PainelAside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <PainelNavbar user={session.user} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Velho testamento
                </CardTitle>
                <Cross fill="gray" className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-md font-bold">
                  Capítulos lidos: {success?.chaptersRead}/
                  {success?.chaptersOld}
                </div>
                <p className="text-xs text-muted-foreground">
                  Versículos: {success?.versesOld.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Novo testamento
                </CardTitle>
                <Cross fill="gray" className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-md font-bold">
                  Capítulos: {success?.chaptersNew}
                </div>
                <p className="text-xs text-muted-foreground">
                  Versículos: {success?.versesNew.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Desafios
                </CardTitle>
                <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-md font-bold">
                  Capítulos: {success?.chaptersNew}
                </div>
                <p className="text-xs text-muted-foreground">
                  Versículos: {success?.versesNew.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Progresso
                </CardTitle>
                <ChartLine className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-md font-bold">
                  Capítulos: {success?.chaptersNew}
                </div>
                <p className="text-xs text-muted-foreground">
                  Versículos: {success?.versesNew.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Próximos Capítulos</CardTitle>
                  <CardDescription>Continue de onde parou</CardDescription>
                </div>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-5">
              <CardHeader>
                <CardTitle className="text-center">TOP 10</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                <Table>
                  <TableCaption>
                    Os 10 usuários que mais estudam em nosso app.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead className="text-center">Pontuação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {top10users.map((u, i) => (
                      <TableRow key={i}>
                        <TableCell>{u.name}</TableCell>
                        <TableCell className="font-extrabold text-center">
                          {u.points}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
