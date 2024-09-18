import {
  BookOpenIcon,
  ChartAreaIcon,
  FlipHorizontal2Icon,
  HeartIcon,
  MedalIcon,
  ShieldCheckIcon,
  ShieldQuestion,
  Smartphone,
  SmileIcon,
  SunIcon,
  TextCursorIcon,
} from "lucide-react";
import benefitOneImg from "@/public/landing-page/benefit-zero.jpg";
import benefitTwoImg from "@/public/landing-page/benefit-one.jpg";

const benefitOne = {
  title: "Experiência completa e envolvente com várias funcionalidades",
  desc: "Estude a Bíblia de um jeito diferente e engajante",
  image: benefitOneImg,
  bullets: [
    {
      title: "Leitura Organizada",
      desc: "Acesso fácil ao Velho e Novo Testamento.",
      icon: <BookOpenIcon />,
    },
    {
      title: "Gamificação",
      desc: "Acumule pontos, conquiste medalhas e salve seu progresso.",
      icon: <MedalIcon />,
    },
    {
      title: "Interatividade",
      desc: "Participe de quizzes e desafios bíblicos.",
      icon: <ShieldQuestion />,
    },
    {
      title: "Impacto Social",
      desc: "Parte dos contribuições destinadas a causas sociais.",
      icon: <HeartIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Funcionalidades Avançadas e Tecnológicas",
  desc: "Explore funcionalidades adicionais que tornam a experiência ainda mais completa e moderna.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Estude do seu smartphone",
      desc: "A Bíblia Sagrada Tech é projetada como um template responsivo, também atendendo a experiência móvel.",
      icon: <Smartphone />,
    },
    {
      title: "Tecnologia de Ponta",
      desc: "A plataforma é alimentada pelas tecnologias mais recentes, como as maiores empresas Tech do mundo.",
      icon: <FlipHorizontal2Icon />,
    },
    {
      title: "Modo Claro e Escuro",
      desc: "A Bíblia Sagrada Tech vem com um modo claro e escuro configurável.",
      icon: <SunIcon />,
    },
    {
      title: "Segurança e Privacidade",
      desc: "Garantimos a segurança e privacidade dos dados dos usuários com servidores confiáveis.",
      icon: <ShieldCheckIcon />,
    },
    {
      title: "Suporte ao Cliente",
      desc: "Oferecemos atendimento via chat, e-mail e FAQs para ajudar nossos usuários.",
      icon: <SmileIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
