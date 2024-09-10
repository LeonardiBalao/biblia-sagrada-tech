"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Container } from "./container";

export const Faq = () => {
  return (
    <div className="!p-0">
      <div className="w-full max-w-3xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

const faqdata = [
  {
    question: "Como faço para contribuir?",
    answer:
      "Simples, basta enviar um pix para bibliasagradatech@gmail.com. Agradecemos imensamente a sua contribuição.",
  },
  {
    question: "O aplicativo é inteiro gratuito?",
    answer:
      "Sim, o aplicativo é 100% gratuitomas depende de contribuições para se manter, visto que o custo de mantê-lo no ar é bem alto. Caso nós os usuários não contribuam o suficiente, pode ser que se torne pago.",
  },
  {
    question: "Posso compartilhar?",
    answer:
      "Com certeza. A sua ajuda na divulgação é essencial para que mais pessoas possam estudar as escrituras.",
  },
  {
    question: "Como entro em contato?",
    answer:
      "Encaminhe um email para bibliasagradatech@gmail.com, respoderemos assim que possível.",
  },
];
