import Image from "next/image";
import React from "react";

import { Container } from "./container";
import { Separator } from "../ui/separator";

export const MissaoVisaoValores = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-gray-800">
            <h2 className="font-bold text-2xl mb-4">Desafio</h2>
            <p className="text-md leading-normal">
              Devotos, estudantes de teologia e jovens enfrentam
              <Mark>dificuldades</Mark> em manter o{" "}
              <u>hábito de leitura da Bíblia</u>.
            </p>
            <Separator className="my-4 border-2" />
            <p className="text-lg leading-normal">
              Foi aí que percebemos a <b>necessidade</b> de algo novo, algo que
              pudesse
              <Mark>transformar a experiência</Mark> de leitura da Bíblia.
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-gray-800">
            <h2 className="font-bold text-2xl">Visão</h2>
            <p className="text-lg leading-normal">
              Simples, mas <Mark>poderosa</Mark>
            </p>
            <Separator className="my-4 border-2" />
            <p className="text-xl leading-normal">
              <b>Promover</b> a leitura e o estudo das escrituras de forma{" "}
              <u>organizada, intuitiva e envolvente</u>.
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-gray-800">
            <h2 className="font-bold text-2xl mb-4">Impacto</h2>
            <p className="text-md leading-normal ">
              Parte das contribuições recebidas é destinada a doações para
              causas sociais, apoiando comunidades carentes e programas
              educacionais.
            </p>
            <Separator className="my-4 border-2" />
            <p className="mt-2 text-lg leading-normal">
              Cada leitura, cada quiz, cada conquista,
              <Mark>contribui para um mundo melhor.</Mark>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

interface AvatarProps {
  image: any;
  name: string;
  title: string;
}

function Avatar(props: Readonly<AvatarProps>) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image
          src={props.image}
          width="40"
          height="40"
          alt="Avatar"
          placeholder="blur"
        />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
      </div>
    </div>
  );
}

function Mark(props: { readonly children: React.ReactNode }) {
  return (
    <>
      {" "}
      <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
        {props.children}
      </mark>{" "}
    </>
  );
}
