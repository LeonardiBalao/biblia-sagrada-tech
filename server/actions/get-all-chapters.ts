"use server";

import { Chapter } from "@prisma/client";
import prisma from "../db";

export const getAllChapters = async () => {
  try {
    const regex = /^[^\s]+/;
    const chaptersOld = await prisma.chapter.findMany({
      where: {
        testament: "VELHO",
      },
      orderBy: { id: "asc" },
    });
    if (!chaptersOld) return { error: "Nenhum capítulo encontrado." };

    const chaptersNew = await prisma.chapter.findMany({
      where: {
        testament: "NOVO",
      },
      orderBy: { id: "asc" },
    });
    if (!chaptersNew) return { error: "Nenhum capítulo encontrado." };

    return { success: { old: chaptersOld, new: chaptersNew } };
  } catch (err: any) {
    return { error: err.message };
  }
};
