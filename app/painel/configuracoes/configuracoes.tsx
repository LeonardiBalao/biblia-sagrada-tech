/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { setUserConfig } from "@/server/actions/set-user-config";
import { ExtendUser } from "@/types/next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ConfiguracoesProps {
  user: ExtendUser;
}

export function Configuracoes({ user }: ConfiguracoesProps) {
  const router = useRouter();
  const [terms, setTerms] = useState(user.acceptsTerms ? "Yes" : "No");
  const [notification, setNotification] = useState(
    user.acceptsNotification ? "Yes" : "No"
  );

  const handleSubmit = async () => {
    if (terms === "No")
      return toast.error(
        "Você precisa concordar com nossas políticas para continuar."
      );
    const { success, error } = await setUserConfig(terms, notification, user);
    if (error) return toast.error(error);
    router.push("/painel");
    return toast.success(success);
  };

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">
          Olá, {user.name.split(" ")[0]}
        </CardTitle>
        <CardDescription>
          {user.firstLogin
            ? "Leia nossoas políticas e concorde com as políticas para continuar."
            : "Altere suas configurações"}
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {(terms === "No" || user.firstLogin === true) && (
          <div className="flex gap-4">
            <Checkbox
              id="termos"
              checked={terms === "No" ? false : true}
              value={terms}
              onClick={() => {
                terms === "No" ? setTerms("Yes") : setTerms("No");
              }}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="termos"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Concordo com a{" "}
                <Link
                  href={"/painel/politica-de-uso"}
                  className="underline text-sm"
                >
                  Política de uso
                </Link>{" "}
                e a{" "}
                <Link
                  href={"/painel/politica-de-privacidade"}
                  className="underline text-sm"
                >
                  Política de privacidade
                </Link>
                .
              </label>
            </div>
          </div>
        )}
        <div className="flex gap-4">
          <Checkbox
            id="notificacoes"
            checked={notification === "Yes" ? true : false}
            value={notification}
            onClick={() => {
              toast.success(
                "Você poderá reverter essa opção a qualquer instante."
              );
              notification === "Yes"
                ? setNotification("No")
                : setNotification("Yes");
            }}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="notificacoes"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Aceito receber notificações.
            </label>
          </div>
        </div>
        <p className="text-sm">
          As notificações são essenciais para que nosso aplicativo acompanhe e
          apoie seu progresso continuamente.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>
          Salvar
        </Button>
      </CardFooter>
    </Card>
  );
}
