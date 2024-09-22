import { DIFFICULTY, TESTAMENT } from "@prisma/client";
import prisma from "../db";

async function main() {
  const quizzes = [
    {
      question: "Quem construiu a arca?",
      testament: TESTAMENT.VELHO,
      chapterId: 6,
      verseNumbers: [14],
      correctAnswer: "Noé",
      options: ["Noé", "Abraão", "Moisés", "Davi", "Salomão"],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Quem foi vendido como escravo pelos irmãos?",
      testament: TESTAMENT.VELHO,
      chapterId: 37,
      verseNumbers: [28],
      correctAnswer: "José",
      options: ["José", "Moisés", "Davi", "Salomão", "Elias"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem recebeu os Dez Mandamentos?",
      testament: TESTAMENT.VELHO,
      chapterId: 70,
      verseNumbers: [1],
      correctAnswer: "Moisés",
      options: ["Moisés", "Abraão", "Isaac", "Jacó", "José"],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Quem derrubou as muralhas de Jericó?",
      testament: TESTAMENT.VELHO,
      chapterId: 193,
      verseNumbers: [20],
      correctAnswer: "Josué",
      options: ["Josué", "Moisés", "Calebe", "Davi", "Salomão"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem foi o gigante derrotado por Davi?",
      testament: TESTAMENT.VELHO,
      chapterId: 253,
      verseNumbers: [49],
      correctAnswer: "Golias",
      options: ["Golias", "Sansão", "Saul", "Elias", "Josué"],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Quem foi o profeta que confrontou o rei Acabe?",
      testament: TESTAMENT.VELHO,
      chapterId: 309,
      verseNumbers: [17],
      correctAnswer: "Elias",
      options: ["Elias", "Eliseu", "Jeremias", "Isaías", "Ezequiel"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem foi o profeta que previu a queda de Nínive?",
      testament: TESTAMENT.VELHO,
      chapterId: 901,
      verseNumbers: [1],
      correctAnswer: "Naum",
      options: ["Naum", "Jonas", "Miquéias", "Isaías", "Jeremias"],
      difficulty: DIFFICULTY.DIFICIL,
    },
    {
      question: "Quem foi o profeta que viu a visão do vale de ossos secos?",
      testament: TESTAMENT.VELHO,
      chapterId: 839,
      verseNumbers: [1, 2],
      correctAnswer: "Ezequiel",
      options: ["Ezequiel", "Isaías", "Jeremias", "Daniel", "Oséias"],
      difficulty: DIFFICULTY.DIFICIL,
    },
    {
      question:
        "Quem foi o profeta que previu a vinda do Messias montado em um jumento?",
      testament: TESTAMENT.VELHO,
      chapterId: 920,
      verseNumbers: [9],
      correctAnswer: "Zacarias",
      options: ["Zacarias", "Isaías", "Jeremias", "Ezequiel", "Daniel"],
      difficulty: DIFFICULTY.DIFICIL,
    },
    {
      question: "Quem foi o apóstolo que escreveu o Apocalipse?",
      testament: TESTAMENT.NOVO,
      chapterId: 1168,
      verseNumbers: [1],
      correctAnswer: "João",
      options: ["João", "Pedro", "Paulo", "Tiago", "André"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem foi o apóstolo que duvidou da ressurreição de Jesus?",
      testament: TESTAMENT.NOVO,
      chapterId: 1017,
      verseNumbers: [24, 25],
      correctAnswer: "Tomé",
      options: ["Tomé", "Pedro", "João", "Tiago", "André"],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Quem foi o apóstolo que pregou no dia de Pentecostes?",
      testament: TESTAMENT.NOVO,
      chapterId: 1020,
      verseNumbers: [14],
      correctAnswer: "Pedro",
      options: ["Pedro", "Paulo", "João", "Tiago", "André"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question:
        "Quem foi o apóstolo que teve uma visão de um lençol com animais?",
      testament: TESTAMENT.NOVO,
      chapterId: 1028,
      verseNumbers: [11],
      correctAnswer: "Pedro",
      options: ["Pedro", "Paulo", "João", "Tiago", "André"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question:
        "Quem foi o apóstolo que escreveu a maioria das cartas do Novo Testamento?",
      testament: TESTAMENT.NOVO,
      chapterId: 1047,
      verseNumbers: [1],
      correctAnswer: "Paulo",
      options: ["Paulo", "Pedro", "João", "Tiago", "André"],
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
