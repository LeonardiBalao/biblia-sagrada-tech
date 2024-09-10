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
    <div>
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
          preTitle="Watch a video"
          title="Learn how to fullfil your needs"
        >
          This section is to highlight a promo or demo video of your product.
          Analysts says a landing page with video has 3% more conversion rate.
          So, don&apos;t forget to add one. Just like this.
        </SectionTitle>

        <Video videoId="fZ0D0cnR88E" />

        <SectionTitle
          preTitle="Testimonials"
          title="Here's what our customers said"
        >
          Testimonials is a great way to increase the brand trust and awareness.
          Use this section to highlight your popular customers.
        </SectionTitle>

        <Testimonials />

        <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
          Answer your customers possible questions here, it will increase the
          conversion rate as well as support or chat requests.
        </SectionTitle>

        <Faq />
        <Cta />

        <Footer />
      </Container>
    </div>
  );
}
