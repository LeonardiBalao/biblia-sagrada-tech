"use server";

import prisma from "../db";

export const getLastQuizzes = async (userId: string) => {
  try {
    let quizzQuestions = [];
    const lastQuizzes = await prisma.userQuizz.findMany({
      take: 3,
      where: { userId },
    });
    if (lastQuizzes.length === 0)
      return { error: "Ainda não respondeu nenhuma questão." };
    for (let q of lastQuizzes) {
      const question = await prisma.quizz.findFirst({
        where: { id: q.quizzId },
      });
      if (question)
        quizzQuestions.push({
          id: q.id,
          question: question.question,
          answer: q.userAnswer,
        });
    }
    return { success: quizzQuestions };
  } catch (err: any) {
    return { error: err.message };
  }
};
