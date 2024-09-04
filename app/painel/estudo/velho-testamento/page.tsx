import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PainelAside from "../../painel-aside";
import PainelNavbar from "../../painel-navbar";
import { getVelhoTestamento } from "@/server/actions/get-velho-testamento";
import { redirect } from "next/navigation";

export default async function Painel() {
  const capítuloVelhoTestamento = await getVelhoTestamento();
  if (!capítuloVelhoTestamento) return redirect("/painel");
  return (
    <>
      <PainelAside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <PainelNavbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex gap-4 flex-wrap">
              <Card className="max-w-md">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    Selecione um capítulo do Velho Testamento
                  </CardTitle>
                  <CardDescription>
                    Para começar, selecione um capítulo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Capítulo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {capítuloVelhoTestamento.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell>{c.name}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
