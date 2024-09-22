"use server";

import { ExtendUser } from "@/types/next-auth";
import { Quizz } from "@prisma/client";
import prisma from "../db";

export const setQuizzAnswer = async (
  answer: string,
  quizz: Quizz,
  user: ExtendUser
) => {
  try {
    if (!answer) return { error: "Selecione uma resposta" };
    if (!quizz) return { error: "Falta quizz" };
    if (!user || !user.id) return { error: "No user" };
    const answerIsCorret = answer === quizz.correctAnswer;

    let points = 0;
    switch (quizz.difficulty) {
      case "DIFICIL":
        points = 5;
        break;
      case "MODERADO":
        points = 3;
        break;
      case "FACIL":
        points = 1;
        break;
    }
    if (!answerIsCorret) {
      await prisma.userQuizz.create({
        data: {
          userId: user.id,
          quizzId: quizz.id,
          userAnswer: answerIsCorret,
        },
      });
      return { error: "Resposta incorreta" };
    }

    await prisma.points.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        points,
      },
      update: {
        points: {
          increment: points,
        },
      },
    });

    await prisma.userQuizz.create({
      data: {
        userId: user.id,
        quizzId: quizz.id,
        userAnswer: answerIsCorret,
      },
    });

    return {
      success: `Resposta correta, ${
        user.name.split(" ")[0]
      }. + ${points} pontos!`,
    };
  } catch (err: any) {
    return { error: err.message };
  }
};
