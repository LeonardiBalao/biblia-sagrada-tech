"use server";

import prisma from "../db";

export const getSlugChapters = async (chapterSlug: string) => {
  try {
    const relatedChapters = await prisma.chapter.findMany({
      where: {
        slug: {
          contains: chapterSlug,
        },
      },
      orderBy: {
        id: "asc",
      },
    });
    if (!relatedChapters) return { error: "Capítulos não encontrados." };
    return { success: relatedChapters };
  } catch (err: any) {
    return { error: err.message };
  }
};
