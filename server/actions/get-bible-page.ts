"use server";

import { TESTAMENT } from "@prisma/client";
import prisma from "../db";

export const getBiblePage = async (
  testament: string,
  chapterSlug: string,
  verseNumber: number
) => {
  try {
    const chapter = await prisma.chapter.findFirst({
      where: {
        slug: chapterSlug,
      },
    });

    if (!chapter) return { error: "Capítulo não encontrado" };

    const verses = await prisma.verse.findMany({
      where: {
        chapterId: chapter.id,
        number: {
          gte: verseNumber,
          lt: verseNumber + 3,
        },
      },
    });

    return {
      success: { testament: chapter.testament, chapter: chapter.name, verses },
    };
  } catch (err: any) {
    return { error: err.message };
  }
};
