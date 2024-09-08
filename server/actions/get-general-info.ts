"use server";

import { TESTAMENT } from "@prisma/client";
import prisma from "../db";
import { ExtendUser } from "@/types/next-auth";

export const getGeneralInfo = async (user: ExtendUser) => {
  const userProgress = await prisma.readingProgress.findFirst({
    where: { userId: user.id },
  });
  if (!userProgress) return { error: "Usuário não aceitou os termos." };
  const chaptersOld = await prisma.chapter.count({
    where: { testament: TESTAMENT.VELHO },
  });
  const chaptersRead =
    userProgress.chapterId > 1 ? userProgress.chapterId - 1 : 0;
  const chaptersNew = await prisma.chapter.count({
    where: { testament: TESTAMENT.NOVO },
  });
  const versesOld = await prisma.verse.count({
    where: {
      chapterId: {
        lt: 931,
      },
    },
  });
  const versesNew = await prisma.verse.count({
    where: {
      chapterId: {
        gte: 931,
      },
    },
  });
  if (!chaptersNew || !chaptersOld || !versesOld || !versesNew)
    return { error: "Não encontrado" };
  return {
    success: { chaptersNew, chaptersOld, versesNew, versesOld, chaptersRead },
  };
};
