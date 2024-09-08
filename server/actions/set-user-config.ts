"use server";

import { ExtendUser } from "@/types/next-auth";
import prisma from "../db";

export const setUserConfig = async (
  terms: string,
  notification: string,
  extendUser: ExtendUser
) => {
  try {
    if (!extendUser.id) return { error: "Faça login" };
    if (terms === "No")
      return { error: "Você precisa aceitar nossas políticas para continuar." };

    if (extendUser.firstLogin) {
      await prisma.user.update({
        where: { id: extendUser.id },
        data: {
          firstLogin: false,
          acceptsNotifications: notification === "Yes" ? true : false,
          acceptsTerms: true,
        },
      });

      await prisma.readingProgress.create({
        data: {
          userId: extendUser.id,
          testament: "VELHO",
          chapterId: 1,
          verseNumber: 1,
        },
      });
    }

    await prisma.user.update({
      where: { id: extendUser.id },
      data: {
        acceptsNotifications: notification === "Yes" ? true : false,
      },
    });

    return { success: "Configurações salvas. Redirecionando para o painel..." };
  } catch (err: any) {
    return { error: err.message };
  }
};
