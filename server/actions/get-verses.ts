"use server";

import prisma from "../db";

export const getVerses = async (verseNumbers: number[], chapterId: number) => {
  try {
    const verses = (
      await prisma.verse.findMany({
        where: {
          chapterId,
          number: {
            in: verseNumbers,
          },
        },
      })
    ).map((v) => ({ id: v.id, content: v.content, number: v.number }));
    if (!verses) return { error: "Versículos não encontrados." };

    return { success: verses };
  } catch (err: any) {
    return { error: err.message };
  }
};
