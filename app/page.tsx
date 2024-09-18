import { Benefits } from "@/components/structure/benefits";
import { Container } from "@/components/structure/container";
import { Cta } from "@/components/structure/cta";
import { benefitOne, benefitTwo } from "@/components/structure/data";
import { Faq } from "@/components/structure/faq";
import { Footer } from "@/components/structure/footer";
import { Hero } from "@/components/structure/hero";
import { MissaoVisaoValores } from "@/components/structure/missao-visao-valores";
import Navbar from "@/components/structure/navbar";
import { SectionTitle } from "@/components/structure/section-title";
import { Testimonials } from "@/components/structure/testimonials";
import { Video } from "@/components/structure/video";
import { auth } from "@/server/auth";
import { ArrowDownCircle } from "lucide-react";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <Navbar user={session?.user} />
      <Container>
        <Hero />
        <ArrowDownCircle
          size={38}
          className=" md:hidden mx-auto -mt-28"
          color="purple"
        />
        <SectionTitle
          preTitle="Desafio, Missão e Impacto"
          title="Em um tempo onde a tecnologia e a espiritualidade raramente se cruzavam"
        >
          Imagine um mundo onde a leitura da Bíblia não é apenas uma prática
          espiritual, mas uma jornada envolvente e interativa.
        </SectionTitle>
        <MissaoVisaoValores />

        <SectionTitle preTitle="Benefícios" title="Por que?">
          Acreditamos que a leitura da Bíblia pode ser uma experiência
          envolvente e gratificante
        </SectionTitle>

        <Benefits data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} />

        <SectionTitle
          preTitle="A Importância da Leitura da Bíblia"
          title="Benefícios Cerebrais"
        >
          Estudos mostram que ler a Bíblia regularmente reduz solidão, raiva,
          alcoolismo e comportamentos prejudiciais. Também fortalece a memória e
          a habilidade de compartilhar a fé.
        </SectionTitle>

        <Video videoId="KW4sZROK5hU" />

        <SectionTitle
          preTitle="Testemunhos"
          title="Veja o que nossos usuários tem falado sobre o aplicativo"
        >
          Os usuários são nossos maiores divulgadores
        </SectionTitle>

        <Testimonials />

        <SectionTitle preTitle="FAQ" title="Perguntas Frequentes">
          Qualquer dúvida, entre em contato com a gente!
        </SectionTitle>

        <Faq />
        <Cta />

        <Footer />
      </Container>
    </>
  );
}
