"use server";

import prisma from "../db";

export const setUserProgress = async (progress: UserProgress) => {
  try {
    const versesLength = await prisma.verse.count({
      where: { chapterId: progress.chapterId },
    });
    if (progress.verseId + 4 >= versesLength) {
      return { error: "Next chapter" };
    }
    await prisma.readingProgress.update({
      where: { userId: progress.userId },
      data: {
        verseId: progress.verseId + 4,
      },
    });
    return { success: `Versículo ${progress.verseId} lido.` };
  } catch (err: any) {
    return { error: err.message };
  }
};
