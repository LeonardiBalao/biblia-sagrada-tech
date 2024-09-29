import { DIFFICULTY, TESTAMENT } from "@prisma/client";
import prisma from "../db";

async function main() {
  const quizzes = [
    {
      question: "Quem foi o primeiro homem a ser circuncidado?",
      testament: TESTAMENT.VELHO,
      chapterId: 17,
      verseNumbers: [24],
      correctAnswer: "Abraão",
      options: ["Abraão", "Isaque", "Jacó", "Moisés", "Davi"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem foi a mulher que se tornou rainha da Pérsia?",
      testament: TESTAMENT.VELHO,
      chapterId: 428,
      verseNumbers: [17],
      correctAnswer: "Ester",
      options: ["Ester", "Rute", "Débora", "Sara", "Rebeca"],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Quem foi o profeta que viu a visão de um candelabro de ouro?",
      testament: TESTAMENT.VELHO,
      chapterId: 915,
      verseNumbers: [2],
      correctAnswer: "Zacarias",
      options: ["Zacarias", "Isaías", "Jeremias", "Ezequiel", "Daniel"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem foi o rei que construiu a cidade de Samaria?",
      testament: TESTAMENT.VELHO,
      chapterId: 307,
      verseNumbers: [24],
      correctAnswer: "Onri",
      options: ["Onri", "Acabe", "Jeroboão", "Salomão", "Davi"],
      difficulty: DIFFICULTY.DIFICIL,
    },
    {
      question: "Quem foi o profeta que previu a queda de Tiro?",
      testament: TESTAMENT.VELHO,
      chapterId: 828,
      verseNumbers: [3],
      correctAnswer: "Ezequiel",
      options: ["Ezequiel", "Isaías", "Jeremias", "Daniel", "Amós"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem foi o homem que viveu mais tempo na Bíblia?",
      testament: TESTAMENT.VELHO,
      chapterId: 5,
      verseNumbers: [27],
      correctAnswer: "Matusalém",
      options: ["Matusalém", "Noé", "Abraão", "Adão", "Jared"],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Quem foi o profeta que previu a destruição de Nínive?",
      testament: TESTAMENT.VELHO,
      chapterId: 901,
      verseNumbers: [1],
      correctAnswer: "Naum",
      options: ["Naum", "Jonas", "Amós", "Obadias", "Miquéias"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question:
        "Quem foi o rei que teve um sonho sobre uma estátua com cabeça de ouro?",
      testament: TESTAMENT.VELHO,
      chapterId: 852,
      verseNumbers: [31 - 32],
      correctAnswer: "Nabucodonosor",
      options: ["Nabucodonosor", "Dario", "Ciro", "Belsazar", "Artaxerxes"],
      difficulty: DIFFICULTY.DIFICIL,
    },
    {
      question: "Quem foi o profeta que previu a vinda do Espírito Santo?",
      testament: TESTAMENT.VELHO,
      chapterId: 878,
      verseNumbers: [28],
      correctAnswer: "Joel",
      options: ["Joel", "Isaías", "Jeremias", "Ezequiel", "Daniel"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem foi o rei que teve um sonho sobre uma árvore grande?",
      testament: TESTAMENT.VELHO,
      chapterId: 854,
      verseNumbers: [10],
      correctAnswer: "Nabucodonosor",
      options: ["Nabucodonosor", "Dario", "Ciro", "Belsazar", "Artaxerxes"],
      difficulty: DIFFICULTY.DIFICIL,
    },
    {
      question: "Quem foi o profeta que previu a reconstrução do templo?",
      testament: TESTAMENT.VELHO,
      chapterId: 910,
      verseNumbers: [8],
      correctAnswer: "Ageu",
      options: ["Ageu", "Zacarias", "Malaquias", "Ezequiel", "Isaías"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question:
        "Quem foi o profeta que previu a vinda de Elias antes do grande e terrível dia do Senhor?",
      testament: TESTAMENT.VELHO,
      chapterId: 929,
      verseNumbers: [5],
      correctAnswer: "Malaquias",
      options: ["Malaquias", "Isaías", "Jeremias", "Ezequiel", "Daniel"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem foi o primeiro sacerdote mencionado na Bíblia?",
      testament: TESTAMENT.VELHO,
      chapterId: 14,
      verseNumbers: [18],
      correctAnswer: "Melquisedeque",
      options: ["Melquisedeque", "Arão", "Eli", "Zadoque", "Abiatar"],
      difficulty: DIFFICULTY.MODERADO,
    },
    {
      question: "Quem foi a mãe de Samuel?",
      testament: TESTAMENT.VELHO,
      chapterId: 237,
      verseNumbers: [20],
      correctAnswer: "Ana",
      options: ["Ana", "Sara", "Rebeca", "Raquel", "Débora"],
      difficulty: DIFFICULTY.FACIL,
    },
    {
      question: "Quem foi o rei que construiu o palácio de cedro?",
      testament: TESTAMENT.VELHO,
      chapterId: 272,
      verseNumbers: [11],
      correctAnswer: "Davi",
      options: ["Davi", "Salomão", "Saul", "Ezequias", "Josias"],
      difficulty: DIFFICULTY.MODERADO,
    },
  ];

  for (const quiz of quizzes) {
    await prisma.quizz.create({
      data: quiz,
    });
  }
}

main();

// const getAllQuestions = async () => {
//   const allQuestions = await prisma.quizz.findMany();
//   console.log(allQuestions.map((q) => q.question));
// };

// getAllQuestions();
