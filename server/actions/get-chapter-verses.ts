"use server";

import prisma from "../db";

export const getChapterVerses = async (slug: string) => {
  try {
    const verses = await prisma.verse.findMany({
      where: {
        chapter: {
          slug: slug,
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    if (!verses) return { error: "Nenhum versículo encontrado" };

    const chapter = await prisma.chapter.findFirst({
      where: { id: verses[0].chapterId },
    });

    if (!chapter) return { error: "Nenhum capítulo encontrado" };

    return { success: { verses, chapterName: chapter.name } };
  } catch (err: any) {
    return { error: err.message };
  }
};
