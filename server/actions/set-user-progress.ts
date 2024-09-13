"use server";

import { ExtendUser } from "@/types/next-auth";
import prisma from "../db";
import { setAchievements } from "./set-achievement";

const versiclesAmount: number = 3;

export const setUserProgress = async (
  progress: UserProgress,
  user: ExtendUser
) => {
  try {
    // First Achievement
    const newAchievement = await setAchievements(progress);

    const versesLength = await prisma.verse.count({
      where: { chapterId: progress.chapterId },
    });
    if (progress.chapterId > 930) {
      await prisma.readingProgress.update({
        where: { userId: progress.userId },
        data: {
          testament: "NOVO",
        },
      });
      progress.testament = "NOVO";
    }
    const newChapterSlug = await prisma.chapter.findFirst({
      where: { id: progress.chapterId + 1 },
    });

    if (!newChapterSlug) return { error: "No slug" };
    // Move to next chapter
    if (progress.verseNumber + 3 > versesLength) {
      const finalVersesPoints = versesLength - progress.verseNumber + 1;
      await prisma.readingProgress.update({
        where: { userId: progress.userId },
        data: {
          chapterId: progress.chapterId + 1,
          verseNumber: 1,
          verseId: {
            increment: finalVersesPoints,
          },
        },
      });

      if (progress.chapterId > 1190) {
        return {
          success: { message: "Acabou!", url: `success`, newAchievement },
        };
      }

      await prisma.points.update({
        where: {
          userId: progress.userId,
        },
        data: {
          points: {
            increment: versesLength + finalVersesPoints,
          },
        },
      });

      return {
        success: {
          message: `${
            user.name.split(" ")[0]
          }, você acaba de completar o capítulo ${
            progress.chapterName
          } e ganhou mais ${versesLength + finalVersesPoints} pontos!`,
          url: `${progress.testament.toLocaleLowerCase()}-testamento/${
            newChapterSlug.slug
          }/1`,
          newAchievement,
        },
      };
    }

    // Move to next verses
    await prisma.readingProgress.update({
      where: { userId: progress.userId },
      data: {
        verseNumber: progress.verseNumber + versiclesAmount,
        verseId: {
          increment: versiclesAmount,
        },
      },
    });
    await prisma.points.upsert({
      where: { userId: progress.userId },
      create: {
        userId: progress.userId,
        points: 3, // Initial points if the record doesn't exist
      },
      update: {
        points: {
          increment: 3, // Increment points by 3 if the record exists
        },
      },
    });
    return {
      success: {
        message: `${user.name.split(" ")[0]}, você ganhou 3 pontos!`,
        url: `${progress.testament.toLocaleLowerCase()}-testamento/${
          progress.slug
        }/${progress.verseNumber + 3}`,
        newAchievement,
      },
    };
  } catch (err: any) {
    return { error: err.message };
  }
};
