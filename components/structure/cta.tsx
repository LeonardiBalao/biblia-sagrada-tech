import React from "react";
import { Container } from "./container";
import { Button } from "../ui/button";
import Link from "next/link";

export const Cta = () => {
  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-indigo-600 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl">
            Está pronto para começar?
          </h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
            Agora é melhor do que nunca!
          </p>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <Link href="/auth/login">
            <Button
              size={"lg"}
              className="bg-white text-black hover:bg-gray-200"
            >
              Comece Sua Jornada!
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};
