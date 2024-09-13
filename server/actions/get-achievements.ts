"use server";

import prisma from "../db";

export const getAchievements = async (userId: string) => {
  try {
    const achievements = await prisma.achievement.findMany({
      where: { userId },
    });
    if (!achievements) return { error: "No Achievements yet." };
    return { success: achievements };
  } catch (err: any) {
    return { error: err.message };
  }
};
