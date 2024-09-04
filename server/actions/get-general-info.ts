"use server";

import { TESTAMENT } from "@prisma/client";
import prisma from "../db";

export const getGeneralInfo = async () => {
  const chaptersOld = await prisma.chapter.count({
    where: { testament: TESTAMENT.VELHO },
  });
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
  return { success: { chaptersNew, chaptersOld, versesNew, versesOld } };
};
