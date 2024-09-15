"use server";

import prisma from "../db";

export const getChapterName = async (chapterId: number) => {
  try {
    const chapter = await prisma.chapter.findFirst({
      where: { id: chapterId },
    });
    if (!chapter) return { error: "Capítulo não encontrado" };
    return { success: chapter.name };
  } catch (err: any) {
    return { error: err.message };
  }
};
