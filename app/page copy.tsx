import { Hero } from "@/components/structure/hero";
import Navbar from "@/components/structure/navbar";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <Navbar user={session?.user} />
      <div className="flex flex-wrap container p-8 mx-auto xl:px-0 ">
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
              <Link href={"/auth/login"}>
                <Button size={"lg"}>Download for Free</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={
                "https://images.unsplash.com/photo-1520629716099-d147346eb224?q=80&w=2525&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              width="616"
              height="617"
              className={"object-cover rounded-3xl"}
              alt="Hero Illustration"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <main className="container items-center mx-auto flex flex-col flex-wrap">
        <section className="text-center py-12">
          <h2 className="text-4xl font-bold mb-4 leading-normal">
            Descubra a Bíblia de Forma Interativa e Envolvente
          </h2>
          <p className="text-lg mb-8 container">
            Transforme seu estudo bíblico com nossa plataforma gamificada e
            intuitiva.
          </p>
          <p>Leia, aprenda e conquiste!</p>
        </section>
        <section className="text-center py-12">
          Por que Escolher a Bíblia Sagrada Tech? Leitura Organizada: Acesso
          fácil ao Velho e Novo Testamento. Gamificação: Acumule pontos,
          conquiste medalhas e veja seu progresso. Interatividade: Participe de
          quizzes e desafios bíblicos. Impacto Social: Parte dos lucros
          destinados a causas sociais.
          <Button>Inscreva-se Agora e Comece Sua Jornada!</Button>
        </section>
        <section>
          “A Bíblia Sagrada Tech transformou meu estudo bíblico. É envolvente e
          motivador!” - Maria S.
        </section>
        <section>
          Elementos Interativos Quiz Bíblico: Teste seus conhecimentos e acumule
          pontos. Desafios Semanais: Participe e ganhe conquistas exclusivas.
        </section>
        <section>
          Garantia de Segurança e Privacidade Segurança e Privacidade Garantidas
          Selos de segurança. Conformidade com GDPR.
        </section>
        <Button>
          Transforme seu estudo bíblico com a Bíblia Sagrada Tech.
        </Button>
      </main>
      <footer className="py-6 w-full">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center">
            bibliasagrada.tech
            <span className="font-bold">@</span>
            {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
}
