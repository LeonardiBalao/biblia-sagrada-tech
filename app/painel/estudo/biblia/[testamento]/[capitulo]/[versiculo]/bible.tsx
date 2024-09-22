"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Note from "./note";
import { setUserProgress } from "@/server/actions/set-user-progress";
import { useRouter } from "next/navigation";
import { ExtendUser } from "@/types/next-auth";
import { useEffect, useRef, useState } from "react";
import { Cross, HelpCircle, HelpCircleIcon, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SelectSeparator } from "@/components/ui/select";

interface BibleProps {
  progress: UserProgress;
  user: ExtendUser;
}

export default function Bible({ progress, user }: BibleProps) {
  const timer = 7;
  const [seconds, setSeconds] = useState(timer);
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState(true);
  const drawerTriggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const handleSubmit = async () => {
    setLoading(true);
    const { success, error } = await setUserProgress(progress, user);
    if (error) return toast.error(error);
    toast.success(success!.message);
    if (success?.newAchievement) {
      toast.message(`😀 Nova conquista!	${success.newAchievement.name}`, {
        description: success.newAchievement.description,
      });
    }
    router.push(`/painel/estudo/biblia/${success!.url}`);
    return setTimeout(() => setLoading(false), 2000);
  };

  useEffect(() => {
    setTimeout(() => setReading(false), timer * 1000);
    if (progress.chapterId === 1 && progress.verseNumber === 1) {
      drawerTriggerRef.current?.click();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [seconds]);

  return (
    <div className="flex flex-col gap-4">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl text-center font-serif bg-secondary py-2">
            {progress.testament} TESTAMENTO
          </CardTitle>
          <Separator />
          <div className="w-full flex justify-center py-4 items-center">
            <Badge variant={"secondary"} className="text-md shadow-lg">
              {progress.chapterName}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="mb-4">
            <div className="w-full flex justify-center">
              <Badge
                variant={"outline"}
                className="text-center font-bold text-md mb-4 mx-auto rounded-full border-2"
              >
                {progress.verses[0].number}
              </Badge>
              <Note verse={progress.verses[0]} progress={progress} />
            </div>
            <p className="first-letter:text-4xl first-letter:leading-tight first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:font-extrabold">
              {progress.verses[0].content}
            </p>
          </div>
          {progress.verses.slice(1).map((v) => (
            <div key={v.number} className="mb-2">
              <div className="w-full flex justify-center">
                <Badge
                  variant={"outline"}
                  className="text-center font-bold text-md mb-4 mx-auto rounded-full border-2"
                >
                  {v.number}
                </Badge>
                <Note verse={v} progress={progress} />
              </div>
              <p className="first-letter:text-4xl first-letter:leading-tight first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:font-extrabold">
                {v.content}
              </p>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex gap-2 items-center">
          <Drawer>
            <DrawerTrigger
              ref={drawerTriggerRef}
              className={cn(
                buttonVariants({ variant: "destructive" }),
                "flex items-center gap-2"
              )}
            >
              <HelpCircleIcon size={14} />
              Ajuda
            </DrawerTrigger>
            <DrawerContent className="flex justify-center">
              <Card className="max-w-screen-sm mx-auto mt-2">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Bem-vindo ao estudo sequencial da Bíblia
                  </CardTitle>
                  <CardDescription>
                    Instruções para aproveitar ao máximo sua jornada:
                  </CardDescription>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-md">
                      Benefícios de Estudar Desta Maneira
                    </h3>
                    <ul className="list-disc ml-8 flex flex-col gap-2">
                      <li>
                        Desenvolvimento de uma leitura disciplinada e
                        sequencial.
                      </li>
                      <li>
                        Maior compreensão e retenção dos ensinamentos bíblicos.
                      </li>
                      <li>
                        Motivação contínua através do sistema de pontos e
                        conquistas.
                      </li>
                      <li>
                        Sentimento de realização ao completar capítulos e livros
                        da Bíblia.
                      </li>
                    </ul>
                    <h3 className="font-bold text-md">Pontuação</h3>
                    <ul className="list-disc ml-8 flex flex-col gap-2">
                      <li>
                        Você ganhará <strong>1 ponto</strong> para cada
                        versículo da Bíblia que ler.
                      </li>
                      <li>
                        Ao terminar um capítulo, você receberá um{" "}
                        <strong>bônus de pontuação</strong> para cada versículo
                        dentro daquele capítulo.
                      </li>
                      <li>
                        Você também ganhará uma <strong>nova conquista</strong>{" "}
                        referente ao capítulo concluído, que será exibida em seu
                        painel em {"Conquistas"}.
                      </li>
                    </ul>

                    <Separator className="border-2" />
                    <p className="text-sm text-center">
                      Neste modo modo estudo, você não poderá voltar para não
                      afetar seu progresso.
                    </p>
                    <p className="text-sm text-center">
                      Você pode <strong>resetar seu progresso</strong> em
                      configurações.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <DrawerClose className="w-full">
                    <Button className="w-full" variant="default">
                      Continuar
                    </Button>
                  </DrawerClose>
                </CardFooter>
              </Card>
            </DrawerContent>
          </Drawer>
          {loading ? (
            <Button className="w-full flex gap-4" variant={"outline"}>
              <div className="w-4 h-4 border-2 border-blue-200 rounded-full animate-spin border-t-transparent" />
              Carregando...
            </Button>
          ) : (
            <Button
              className="w-full flex gap-4"
              disabled={reading}
              onClick={handleSubmit}
            >
              {reading
                ? "Leitura"
                : progress.verses.length === 3
                ? "Próxima página"
                : "Próximo capítulo"}

              {seconds !== 0 && (
                <div className="text-md font-bold animate-pulse">{seconds}</div>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
      <Link href="/biblia" className="mx-auto">
        <Button>Consultar a Biblia</Button>
      </Link>
    </div>
  );
}
