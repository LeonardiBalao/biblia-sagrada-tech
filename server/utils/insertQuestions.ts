import { DIFFICULTY, TESTAMENT } from "@prisma/client";
import prisma from "../db";
import { createVerses } from "./functions";

async function main() {
  const quizzes = [
    {
      question: "Qual é o primeiro versículo da Bíblia?",
      testament: TESTAMENT.VELHO,
      chapterId: 1,
      verseIds: [1],
      correctAnswer: "No princípio criou Deus os céus e a terra.",
      options: [
        "No princípio criou Deus os céus e a terra.",
        "E disse Deus: Haja luz.",
        "E viu Deus que era bom.",
        "E separou Deus a luz das trevas.",
        "E chamou Deus à luz Dia.",
      ],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Quem construiu a arca para sobreviver ao dilúvio?",
      testament: TESTAMENT.VELHO,
      chapterId: 6,
      verseIds: [155, 156, 157, 158, 159, 160],
      correctAnswer: "Noé",
      options: ["Abraão", "Moisés", "Noé", "Davi", "Salomão"],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Qual foi o nome do filho que Abraão quase sacrificou?",
      testament: TESTAMENT.VELHO,
      chapterId: 22,
      verseIds: [557, 558, 559, 660],
      correctAnswer: "Isaque",
      options: ["Ismael", "Esaú", "Jacó", "Isaque", "José"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem interpretou os sonhos do Faraó no Egito?",
      testament: TESTAMENT.VELHO,
      chapterId: 41,
      verseIds: [1210, 1211, 1212],
      correctAnswer: "José",
      options: ["Moisés", "José", "Daniel", "Arão", "Davi"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Qual profeta teve uma visão de um vale de ossos secos?",
      testament: TESTAMENT.VELHO,
      chapterId: 840,
      verseIds: createVerses(10, 21387),
      correctAnswer: "Ezequiel",
      options: ["Isaías", "Jeremias", "Ezequiel", "Daniel", "Oséias"],
      difficulty: DIFFICULTY.DIFICIL,
    },
    {
      question: "Quem foi o último juiz de Israel antes da monarquia?",
      testament: TESTAMENT.VELHO,
      chapterId: 244,
      verseIds: createVerses(3, 7363),
      correctAnswer: "Samuel",
      options: ["Gideão", "Sansão", "Eli", "Samuel", "Saul"],
      difficulty: DIFFICULTY.DIFICIL,
    },
  ];

  for (const quiz of quizzes) {
    await prisma.quizz.create({
      data: quiz,
    });
  }
}

main();
