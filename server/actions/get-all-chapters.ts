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
    let array = chaptersOld.map((c) => c.name);
    // Remove numbers and brackets
    const cleanedChapters = array.map((chapter) =>
      chapter.replace(/\s*\[\d+\]/, "")
    );
    // Get unique chapter names
    const uniqueChapters = Array.from(new Set(cleanedChapters));

    console.log(uniqueChapters);
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
