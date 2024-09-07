"use server";

import prisma from "../db";

export const setUserProgress = async (
  userId: string,
  userProgress: UserProgress
) => {
  try {
    const versesLength = await prisma.verse.count();
    if (userProgress.verseId <= versesLength) {
      return { fail: "Next chapter" };
    }
    await prisma.readingProgress.update({
      where: { userId },
      data: {
        verseId: userProgress.verseId + 1,
      },
    });
    return { created: `Versículo ${userProgress.verseId} lido.` };
  } catch (err: any) {
    return { fail: err.message };
  }
};
