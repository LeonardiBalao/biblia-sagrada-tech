"use server";

import prisma from "../db";
import { getRandomQuizz } from "../utils/functions";

export const getQuizz = async (userId: string) => {
  try {
    const quizz = await prisma.quizz.findMany({
      where: {
        UserQuizz: {
          none: {
            userId: userId,
          },
        },
      },
    });
    if (!quizz) return { error: "Nenhuma pergunta encontrada" };

    const randomQuestion = getRandomQuizz(quizz.length);

    return { success: quizz[randomQuestion] };
  } catch (err: any) {
    return { error: err.message };
  }
};
