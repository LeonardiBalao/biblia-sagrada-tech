import Link from "next/link";
import { Button } from "../ui/button";

export const Hero = () => {
  return (
    <>
      <main className="container">
        <section className="text-center py-12">
          <h2 className="text-4xl font-bold mb-4 leading-normal">
            Tornando a Bíblia Acessível a Todos
          </h2>
          <p className="text-lg mb-8 container">
            Promovendo a leitura e estudo das escrituras de forma organizada e
            intuitiva.
          </p>

          <Link href="#pricing">
            <Button>Get Started</Button>
          </Link>
        </section>

        <section id="features" className="py-12">
          <h3 className="text-3xl font-bold text-center mb-8">Features</h3>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4">
              <div className="p-6 rounded-lg shadow-md">
                <h4 className="text-2xl font-bold mb-4">Interface Intuitiva</h4>
                <p>Organização detalhada dos capítulos e versículos.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="p-6 rounded-lg shadow-md">
                <h4 className="text-2xl font-bold mb-4">
                  Modelo de Doações Sociais
                </h4>
                <p>Parte dos lucros destinados a causas sociais.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-12 ">
          <h3 className="text-3xl font-bold text-center mb-8">Contribuição</h3>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4">
              <div className="p-6 rounded-lg shadow-md">
                <h4 className="text-2xl font-bold mb-4">Gratuito</h4>
                <p>Acesso limitado</p>
                <p className="text-xl font-bold mt-4">R$0/mês</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="p-6 rounded-lg shadow-md">
                <h4 className="text-2xl font-bold mb-4">Premium</h4>
                <p>Acesso ilimitado</p>
                <p className="text-xl font-bold mt-4">R$29/mês</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-12">
          <h3 className="text-3xl font-bold text-center mb-8">
            Entre em contato
          </h3>
          <form className="w-full max-w-lg mx-auto p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nome
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Mensagem
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                placeholder="Your message"
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <Button type="button">Enviar</Button>
            </div>
          </form>
        </section>
      </main>

      <footer className="bg-primary py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Bíblia Sagrada Tech. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};
