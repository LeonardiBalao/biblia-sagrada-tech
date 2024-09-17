"use server";

import prisma from "../db";
import { cleanChapters } from "../utils/functions";

export const getAllChapters = async () => {
  try {
    // OLD CHAPTERS
    const chaptersOld = await prisma.chapter.findMany({
      where: {
        testament: "VELHO",
      },
      orderBy: { id: "asc" },
    });

    if (!chaptersOld) return { error: "Nenhum capítulo encontrado." };

    let oldChaptersNames = chaptersOld.map((c) => c.name);

    // Remove numbers and brackets
    const cleanedOld = cleanChapters(oldChaptersNames);

    const uniqueOldChapters = Array.from(new Set(cleanedOld));

    // NEW CHAPTERS
    const chaptersNew = await prisma.chapter.findMany({
      where: {
        testament: "NOVO",
      },
      orderBy: { id: "asc" },
    });
    if (!chaptersNew) return { error: "Nenhum capítulo encontrado." };

    let newChaptersName = chaptersNew.map((c) => c.name);

    // Remove numbers and brackets
    const cleanedNew = cleanChapters(newChaptersName);
    const uniqueNewChapters = Array.from(new Set(cleanedNew));

    return {
      success: {
        old: { chaptersOld, uniqueOldChapters },
        new: { chaptersNew, uniqueNewChapters },
      },
    };
  } catch (err: any) {
    return { error: err.message };
  }
};
