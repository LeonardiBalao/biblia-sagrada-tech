import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PainelAside from "../painel-aside";
import PainelNavbar from "../painel-navbar";
import { Separator } from "@/components/ui/separator";
import prisma from "@/server/db";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { getUserProgress } from "@/server/actions/get-user-progress";

export default async function Painel() {
  const session = await auth();
  if (!session || !session.user.id) return redirect("/auth/login");

  const { success, error } = await getUserProgress(session.user.id);

  return (
    <>
      <PainelAside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <PainelNavbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex gap-4 flex-wrap">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Estudo da Bíblia
                  </CardTitle>
                  <CardDescription>
                    Descubra a profundidade da fé, explorando a rica e complexa
                    história do povo de Deus através de toda a Bíblia.
                  </CardDescription>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <p>
                    A Bíblia é uma coleção rica de livros que narram a criação
                    do mundo, a história dos patriarcas, a libertação do Egito,
                    as leis de Moisés, os profetas, a vida de Jesus, e muito
                    mais. Ao estudar esses textos, você mergulhará em histórias
                    de fé, coragem e perseverança, encontrando lições valiosas
                    para a vida moderna.
                  </p>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <h2 className="font-semibold my-5 text-lg">
                          Por que Estudar a Bíblia?
                        </h2>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-8 my-5 flex flex-col gap-2">
                          <li>
                            <strong>Fundamentos da Fé:</strong> Compreenda as
                            bases da fé cristã e judaica.
                          </li>
                          <li>
                            <strong>Histórias Inspiradoras:</strong> Encontre
                            exemplos de coragem, fé e perseverança.
                          </li>
                          <li>
                            <strong>Lições para a Vida Moderna:</strong> Aplique
                            os ensinamentos antigos em sua vida diária.
                          </li>
                          <li>
                            <strong>Conexão Espiritual:</strong> Fortaleça sua
                            relação com Deus através do estudo profundo das
                            Escrituras.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        <h2 className="font-semibold my-5 text-lg">
                          O que você vai estudar?
                        </h2>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ol className="list-decimal my-5 pl-8 flex flex-col gap-2">
                          <li>
                            <strong>Gênesis:</strong> Comece com a criação do
                            mundo e a história dos patriarcas.
                          </li>
                          <li>
                            <strong>Êxodo:</strong> Explore a libertação do
                            Egito e as leis de Moisés.
                          </li>
                          <li>
                            <strong>Levítico, Números e Deuteronômio:</strong>{" "}
                            Aprofunde-se nas leis e nos ensinamentos dados ao
                            povo de Israel.
                          </li>
                          <li>
                            <strong>Josué a Ester:</strong> Estude a história do
                            povo de Israel na Terra Prometida.
                          </li>
                          <li>
                            <strong>Livros de Sabedoria:</strong> Mergulhe nos
                            ensinamentos de Jó, Salmos, Provérbios, Eclesiastes
                            e Cantares de Salomão.
                          </li>
                          <li>
                            <strong>Profetas Maiores e Menores:</strong> Conheça
                            as mensagens dos profetas e suas relevâncias para os
                            dias atuais.
                          </li>
                          <li>
                            <strong>Evangelhos:</strong> Acompanhe a vida e os
                            ensinamentos de Jesus Cristo.
                          </li>
                          <li>
                            <strong>Atos dos Apóstolos:</strong> Entenda a
                            formação da igreja primitiva e a expansão do
                            cristianismo.
                          </li>
                          <li>
                            <strong>Epístolas:</strong> Leia as cartas dos
                            apóstolos com orientações para as igrejas e para a
                            vida cristã.
                          </li>
                          <li>
                            <strong>Apocalipse:</strong> Explore as visões
                            proféticas sobre o fim dos tempos e a esperança da
                            nova criação.
                          </li>
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        <h2 className="font-semibold my-5 text-lg">
                          Dicas para um Estudo Eficaz:
                        </h2>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-8 my-5 flex flex-col gap-2">
                          <li>
                            <strong>Defina um Horário Fixo:</strong> Reserve um
                            tempo diário ou semanal para o estudo.
                          </li>
                          <li>
                            <strong>Use Recursos de Apoio:</strong> Utilize
                            comentários bíblicos, dicionários e guias de estudo.
                          </li>
                          <li>
                            <strong>Participe de Grupos de Estudo:</strong>{" "}
                            Compartilhe insights e aprenda com outros.
                          </li>
                          <li>
                            <strong>Faça Anotações:</strong> Registre suas
                            reflexões e perguntas para aprofundar seu
                            entendimento.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter>
                  <Link
                    className="w-full"
                    href={`/painel/estudo/biblia/${
                      success
                        ? `${success.testament.toLocaleLowerCase()}-testamento/${
                            success.slug
                          }/${success.verseId}`
                        : "velho-testamento/genesis-1/1"
                    }`}
                  >
                    <Button className="w-full">
                      {success ? "Continuar" : "Começar"}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
