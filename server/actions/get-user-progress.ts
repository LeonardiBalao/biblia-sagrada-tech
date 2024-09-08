"use server";

import prisma from "../db";

export const getUserProgress = async (userId: string) => {
  try {
    const progress = await prisma.readingProgress.findFirst({
      where: { userId },
    });

    if (!progress) return { error: "No progress" };

    const chapter = await prisma.chapter.findFirst({
      where: { id: progress.chapterId },
    });

    if (!chapter) return { error: "No chapter" };

    const versesLength = await prisma.verse.count({
      where: {
        chapterId: progress.chapterId,
      },
    });

    if (!versesLength) return { error: "No verses" };

    const verses = (
      await prisma.verse.findMany({
        where: {
          number: {
            gte: progress.verseNumber,
            lt: Math.min(progress.verseNumber + 3, versesLength + 1),
          },
          chapterId: progress.chapterId,
        },
      })
    ).map((v) => {
      return { number: v.number, content: v.content };
    });

    if (!verses) return {};

    const userProgress = {
      ...progress,
      slug: chapter.slug,
      chapterName: chapter.name,
      verses: verses,
    } as UserProgress;

    return { progress: userProgress };
  } catch (err: any) {
    return { error: err.message };
  }
};
