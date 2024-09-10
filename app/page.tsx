import { Benefits } from "@/components/structure/benefits";
import { Container } from "@/components/structure/container";
import { Cta } from "@/components/structure/cta";
import { benefitOne, benefitTwo } from "@/components/structure/data";
import { Faq } from "@/components/structure/faq";
import { Footer } from "@/components/structure/footer";
import { Hero } from "@/components/structure/hero";
import Navbar from "@/components/structure/navbar";
import { SectionTitle } from "@/components/structure/section-title";
import { Testimonials } from "@/components/structure/testimonials";
import { Video } from "@/components/structure/video";
import { auth } from "@/server/auth";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <Navbar user={session?.user} />
      <Container>
        <Hero />
        <SectionTitle preTitle="Benefícios" title="Por que nos escolher?">
          Leitura intuitiva e envolvente da Bíblia, com gamificação, doações
          sociais e uma interface amigável para todos os usuários.
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
