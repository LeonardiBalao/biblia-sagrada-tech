import Link from "next/link";

import { Button } from "@/components/ui/button";
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

export default function Painel() {
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
                  <CardTitle className="text-xl font-bold">
                    Estudar o Velho Testamento
                  </CardTitle>
                  <CardDescription>
                    Descubra as raízes profundas da fé, explorando a rica e
                    complexa história do povo de Deus.
                  </CardDescription>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <p>
                    Esta é uma coleção rica de livros que narram a criação do
                    mundo, a história dos patriarcas, a libertação do Egito, as
                    leis de Moisés, os profetas e muito mais. Ao estudar esses
                    textos, você mergulhará em histórias de fé, coragem e
                    perseverança, encontrando lições valiosas para a vida
                    moderna.
                  </p>
                  <h2 className="font-semibold my-5 text-lg">
                    Por que Estudar o Velho Testamento?
                  </h2>
                  <ul className="list-disc pl-8 my-5 flex flex-col gap-2">
                    <li>
                      <strong>Fundamentos da Fé:</strong> Compreenda as bases da
                      fé cristã e judaica.
                    </li>
                    <li>
                      <strong>Histórias Inspiradoras:</strong> Encontre exemplos
                      de coragem, fé e perseverança.
                    </li>
                    <li>
                      <strong>Lições para a Vida Moderna:</strong> Aplique os
                      ensinamentos antigos em sua vida diária.
                    </li>
                    <li>
                      <strong>Conexão Espiritual:</strong> Fortaleça sua relação
                      com Deus através do estudo profundo das Escrituras.
                    </li>
                  </ul>
                  <h2 className="font-semibold my-5 text-lg">
                    O que você vai estudar?
                  </h2>
                  <ol className="list-decimal my-5 pl-8 flex flex-col gap-2">
                    <li>
                      <strong>Gênesis:</strong> Comece com a criação do mundo e
                      a história dos patriarcas.
                    </li>
                    <li>
                      <strong>Êxodo:</strong> Explore a libertação do Egito e as
                      leis de Moisés.
                    </li>
                    <li>
                      <strong>Levítico, Números e Deuteronômio:</strong>{" "}
                      Aprofunde-se nas leis e nos ensinamentos dados ao povo de
                      Israel.
                    </li>
                    <li>
                      <strong>Josué a Ester:</strong> Estude a história do povo
                      de Israel na Terra Prometida.
                    </li>
                    <li>
                      <strong>Livros de Sabedoria:</strong> Mergulhe nos
                      ensinamentos de Jó, Salmos, Provérbios, Eclesiastes e
                      Cantares de Salomão.
                    </li>
                    <li>
                      <strong>Profetas Maiores e Menores:</strong> Conheça as
                      mensagens dos profetas e suas relevâncias para os dias
                      atuais.
                    </li>
                  </ol>
                  <h2 className="font-semibold my-5 text-lg">
                    Dicas para um Estudo Eficaz:
                  </h2>
                  <ul className="list-disc pl-8 my-5 flex flex-col gap-2">
                    <li>
                      <strong>Defina um Horário Fixo:</strong> Reserve um tempo
                      diário ou semanal para o estudo.
                    </li>
                    <li>
                      <strong>Use Recursos de Apoio:</strong> Utilize
                      comentários bíblicos, dicionários e guias de estudo.
                    </li>
                    <li>
                      <strong>Participe de Grupos de Estudo:</strong>
                      Compartilhe insights e aprenda com outros.
                    </li>
                    <li>
                      <strong>Faça Anotações:</strong> Registre suas reflexões e
                      perguntas para aprofundar seu entendimento.
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link
                    className="w-full"
                    href="/painel/estudo/velho-testamento"
                  >
                    <Button className="w-full">Estudar</Button>
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
