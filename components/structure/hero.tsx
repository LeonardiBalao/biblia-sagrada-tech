import Image from "next/image";
import { Container } from "./container";
import Link from "next/link";
import { Button } from "../ui/button";
import Bible from "@/public/img/bible.jpg";
import { AspectRatio } from "../ui/aspect-ratio";
import LoadingButton from "./loading-button";

export const Hero = () => {
  return (
    <>
      <Container className="flex flex-wrap">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              Descubra a Bíblia de Forma Interativa e Envolvente
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              Transforme seu estudo bíblico com nossa plataforma gamificada e
              intuitiva.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <LoadingButton
                href="/auth/login"
                loadingText="Carregando"
                text="Começar Minha Jornada"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2 relative">
          <div className="w-[350px] relative z-10">
            <AspectRatio ratio={9 / 16}>
              <Image
                src={Bible}
                width="616"
                height="300"
                className={
                  "object-cover rounded-xl md:mt-12 shadow-2xl border-2 border-gray-400 backdrop-blur"
                }
                alt="bible"
                loading="eager"
              />
            </AspectRatio>
          </div>
        </div>
      </Container>
    </>
  );
};
