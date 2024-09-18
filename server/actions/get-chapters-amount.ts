"use server";

import prisma from "../db";

export const getChaptersAmount = async (chapterSlug: string) => {
  try {
    const chaptersAmount = await prisma.chapter.count({
      where: {
        slug: {
          contains: chapterSlug,
        },
      },
    });
    if (!chaptersAmount) return { error: "Nenhum capítulo encontrado." };

    return { success: chaptersAmount };
  } catch (err: any) {
    return { error: err.message };
  }
};
