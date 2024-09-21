import { DIFFICULTY, TESTAMENT } from "@prisma/client";
import prisma from "../db";

async function main() {
  const quizzes = [
    {
      question: "Quem foi lançado na cova dos leões?",
      testament: TESTAMENT.VELHO,
      chapterId: 856,
      verseNumbers: [16, 17, 18],
      correctAnswer: "Daniel",
      options: ["Daniel", "José", "Moisés", "Elias", "Davi"],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Qual é o menor versículo da Bíblia?",
      testament: TESTAMENT.NOVO,
      chapterId: 1008,
      verseNumbers: [35],
      correctAnswer: "Jesus chorou.",
      options: [
        "Jesus chorou.",
        "Deus é amor.",
        "O Senhor é meu pastor.",
        "Amai-vos uns aos outros.",
        "Vinde a mim.",
      ],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Quem foi o primeiro rei de Israel?",
      testament: TESTAMENT.VELHO,
      chapterId: 246,
      verseNumbers: [1],
      correctAnswer: "Saul",
      options: ["Saul", "Davi", "Salomão", "Josias", "Ezequias"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem foi o traidor de Jesus?",
      testament: TESTAMENT.NOVO,
      chapterId: 955,
      verseNumbers: [14, 15, 16],
      correctAnswer: "Judas Iscariotes",
      options: ["Pedro", "Judas Iscariotes", "Tomé", "João", "Tiago"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem foi o homem mais forte da Bíblia?",
      testament: TESTAMENT.VELHO,
      chapterId: 227,
      verseNumbers: [29, 30],
      correctAnswer: "Sansão",
      options: ["Sansão", "Davi", "Golias", "Saul", "Josué"],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question:
        "Quem foi o profeta que desafiou os profetas de Baal no Monte Carmelo?",
      testament: TESTAMENT.VELHO,
      chapterId: 309,
      verseNumbers: [20, 21, 22],
      correctAnswer: "Elias",
      options: ["Elias", "Eliseu", "Jeremias", "Isaías", "Ezequiel"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem foi o primeiro mártir cristão?",
      testament: TESTAMENT.NOVO,
      chapterId: 1025,
      verseNumbers: [59, 60],
      correctAnswer: "Estevão",
      options: ["Estevão", "Pedro", "Paulo", "Tiago", "João"],
      difficulty: DIFFICULTY.DIFICIL,
    },
    {
      question: "Quem foi o pai de João Batista?",
      testament: TESTAMENT.NOVO,
      chapterId: 974,
      verseNumbers: [13],
      correctAnswer: "Zacarias",
      options: ["Zacarias", "José", "Simeão", "Anás", "Caifás"],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Quem foi o rei que pediu sabedoria a Deus?",
      testament: TESTAMENT.VELHO,
      chapterId: 294,
      verseNumbers: [9, 10],
      correctAnswer: "Salomão",
      options: ["Salomão", "Davi", "Saul", "Josias", "Ezequias"],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Quem foi o profeta que foi engolido por um grande peixe?",
      testament: TESTAMENT.VELHO,
      chapterId: 890,
      verseNumbers: [17],
      correctAnswer: "Jonas",
      options: ["Jonas", "Elias", "Moisés", "Jeremias", "Isaías"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem foi o discípulo que andou sobre as águas com Jesus?",
      testament: TESTAMENT.NOVO,
      chapterId: 943,
      verseNumbers: [29],
      correctAnswer: "Pedro",
      options: ["Pedro", "João", "Tiago", "André", "Tomé"],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Quem foi o rei que viu a mão escrevendo na parede?",
      testament: TESTAMENT.VELHO,
      chapterId: 855,
      verseNumbers: [5],
      correctAnswer: "Belsazar",
      options: ["Belsazar", "Nabucodonosor", "Dario", "Ciro", "Artaxerxes"],
      difficulty: DIFFICULTY.DIFICIL,
    },
    {
      question: "Quem foi o profeta que subiu ao céu em um redemoinho?",
      testament: TESTAMENT.VELHO,
      chapterId: 315,
      verseNumbers: [11],
      correctAnswer: "Elias",
      options: ["Elias", "Eliseu", "Moisés", "Enoque", "Isaías"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem foi o apóstolo que negou Jesus três vezes?",
      testament: TESTAMENT.NOVO,
      chapterId: 955,
      verseNumbers: [75],
      correctAnswer: "Pedro",
      options: ["Pedro", "João", "Tiago", "André", "Tomé"],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Quem foi o profeta que previu o nascimento de Jesus em Belém?",
      testament: TESTAMENT.VELHO,
      chapterId: 898,
      verseNumbers: [2],
      correctAnswer: "Miquéias",
      options: ["Miquéias", "Isaías", "Jeremias", "Ezequiel", "Daniel"],
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
