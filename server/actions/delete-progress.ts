"use server";

import prisma from "../db";

export const deleteProgress = async (userId: string | undefined) => {
  try {
    if (!userId) return { error: "Nenhum usuário encontrado" };
    const progress = await prisma.readingProgress.update({
      where: {
        userId,
      },
      data: {
        testament: "VELHO",
        verseId: 1,
        chapterId: 1,
        verseNumber: 1,
      },
    });

    if (!progress) return { error: progress };
    return { success: "Progresso resetado." };
  } catch (err: any) {
    return { error: err.message };
  }
};
