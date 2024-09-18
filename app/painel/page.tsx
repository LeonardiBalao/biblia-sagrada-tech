import {
  AlertCircle,
  BicepsFlexed,
  Book,
  ChartArea,
  ChartLine,
  Check,
  CheckCircle,
  CircleX,
  Cross,
  Forward,
  Medal,
  Puzzle,
  RulerIcon,
  ShieldQuestion,
  Trophy,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { getGeneralInfo } from "@/server/actions/get-general-info";
import {
  Cross1Icon,
  Cross2Icon,
  ExclamationTriangleIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { getTop10Users } from "@/server/actions/get-top-10-users";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAchievements } from "@/server/actions/get-achievements";
import { mapIcon } from "@/server/utils/functions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getLastQuizzes } from "@/server/actions/get-last-quizzes";
import LoadingButton from "@/components/structure/loading-button";

export default async function Painel() {
  let top10users: LeaderboardUser[] = [];
  const session = await auth();
  if (!session || !session.user.id) return redirect("/auth/login");
  const { error, success } = await getGeneralInfo(session.user);
  if (error) return redirect("/painel/configuracoes");
  if (session.user.firstLogin || !session.user.acceptsTerms)
    return redirect("/painel/configuracoes");

  const achievements = await getAchievements(session.user.id);
  const lastQuizzes = await getLastQuizzes(session.user.id);

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
          <div className="flex gap-4 justify-around md:justify-start">
            <LoadingButton
              icon={<Book size={21} />}
              text="Estudar"
              href="/painel/estudo/biblia/velho-testamento/genesis-1/1"
              className="animate-pulse"
              loadingText="Carregando"
            />
            <LoadingButton
              icon={<BicepsFlexed size={21} />}
              text="Quizz"
              href="/painel/estudo/quizz"
              className="animate-pulse"
              loadingText="Carregando"
            />
            <LoadingButton
              icon={<Cross size={21} />}
              text="Bíblia"
              href="/biblia"
              className="animate-pulse"
              loadingText="Carregando"
            />
          </div>
          <div className="grid gap-2 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Meu Progresso
                </CardTitle>
                <ChartArea
                  color="blue"
                  className="h-4 w-4 text-muted-foreground"
                />
              </CardHeader>
              <Separator />
              <CardContent className="flex flex-col gap-4 mt-4">
                <Badge
                  variant={"secondary"}
                  className="font-bold font-md flex justify-center uppercase"
                >
                  Velho Testamento
                </Badge>
                <div className="ml-4 flex flex-col items-center justify-center">
                  <div className="text-sm font-semibold">
                    Capítulos: {success?.chaptersRead}/{success?.chaptersOld}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Versículos: {success?.verseId! - 1}/
                    {success?.versesOld.toLocaleString()}
                  </p>
                </div>
                <Badge
                  variant={"secondary"}
                  className="font-bold font-md flex justify-center uppercase"
                >
                  Novo Testamento
                </Badge>
                <div className="ml-4 flex flex-col items-center justify-center">
                  <div className="text-sm font-bold">
                    Capítulos:{" "}
                    {success?.chaptersRead! < 932
                      ? 0
                      : success?.chaptersRead! - 931}
                    /{success?.chaptersNew}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Versículos:{" "}
                    {success?.verseId! < 7943
                      ? 0
                      : (success?.verseId! - 7943).toLocaleString()}
                    /{success?.versesNew.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Últimos Quizzes
                </CardTitle>
                <QuestionMarkCircledIcon
                  color="blue"
                  className="h-4 w-4 text-muted-foreground"
                />
              </CardHeader>
              <Separator />
              <CardContent className="flex flex-col gap-4 mt-4">
                {lastQuizzes.success?.map((q) => (
                  <div
                    key={q.id}
                    className={`text-xs font-bold flex gap-2 items-center`}
                  >
                    {q.answer ? (
                      <CheckCircle color="green" size={17} />
                    ) : (
                      <CircleX color="red" size={17} />
                    )}
                    {q.question}
                  </div>
                ))}
                {lastQuizzes.error && (
                  <div className="flex flex-col gap-4 justify-between items-center mt-5">
                    <div className="flex gap-2 items-center">
                      <AlertCircle color="orange" />
                      <span className="text-sm">{lastQuizzes.error}</span>
                    </div>
                    <Link href={"/painel/estudo/quizz"}>
                      <Button variant={"link"} className="underline">
                        Responder Quizzes
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold ">
                  Minhas conquistas
                </CardTitle>
                <Trophy fill="gold" className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <Separator />
              <CardContent className="mx-auto my-auto">
                <Carousel className="cursor-pointer">
                  <CarouselContent className="p-4">
                    {achievements.success?.length ? (
                      achievements.success
                        .sort(
                          (a, b) =>
                            b.createdAt.getTime() - a.createdAt.getTime()
                        )
                        .map((a) => (
                          <CarouselItem
                            key={a.id}
                            className="border w-full rounded-lg p-4 text-sm flex flex-col items-center justify-center gap-2 bg-secondary mr-2"
                          >
                            <div className="font-bold">{a.name}</div>
                            <div>{mapIcon(a.icon)}</div>
                            <div className="text-xs text-center">
                              {a.description}
                            </div>
                          </CarouselItem>
                        ))
                    ) : (
                      <CarouselItem>
                        <div className="flex flex-col gap-4 justify-between items-center mt-5">
                          <div className="flex gap-2 items-center">
                            <AlertCircle color="orange" />
                            <span className="text-sm">
                              Você ainda não começou seus estudos
                            </span>
                          </div>
                          <Link
                            href={
                              "/painel/estudo/biblia/velho-testamento/genesis-1/1"
                            }
                          >
                            <Button variant={"link"} className="underline">
                              Começar estudo
                            </Button>
                          </Link>
                        </div>
                      </CarouselItem>
                    )}
                  </CarouselContent>

                  {achievements.success?.length! > 1 && (
                    <>
                      <CarouselNext />
                      <CarouselPrevious />
                    </>
                  )}
                </Carousel>
              </CardContent>
            </Card>
          </div>
          <Card x-chunk="dashboard-01-chunk-5" className="max-w-screen-md">
            <CardHeader>
              <CardTitle className="text-center">TOP 10 USUÁRIOS</CardTitle>
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
        </main>
      </div>
    </>
  );
}
