"use server";

import prisma from "../db";

export const getUserProgress = async (userId: string) => {
  try {
    const progress = await prisma.readingProgress.findFirst({
      where: { userId },
    });

    if (!progress) return {};

    const chapter = await prisma.chapter.findFirst({
      where: { id: progress.chapterId },
    });

    if (!chapter) return {};

    const versesLength = await prisma.verse.count({
      where: {
        chapterId: progress.chapterId,
      },
    });

    if (!versesLength) return {};

    const verses = (
      await prisma.verse.findMany({
        where: {
          id: {
            lt: Math.min(progress.verseId + 4, versesLength),
            gte: progress.verseId,
          },
        },
      })
    ).map((v) => {
      return { id: v.id, content: v.content };
    });

    if (!verses) return {};

    const userProgress = {
      ...progress,
      slug: chapter.slug,
      chapterName: chapter.name,
      verses: verses,
    } as UserProgress;

    return { success: userProgress };
  } catch (err) {
    return { error: err };
  }
};
