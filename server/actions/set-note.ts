"use server";

import { off } from "process";
import prisma from "../db";

export const setNote = async (
  verseId: number,
  progress: UserProgress,
  content: string
) => {
  try {
    if (content === "") {
      await prisma.note.delete({
        where: {
          userId_verseId: {
            userId: progress.userId,
            verseId: verseId,
          },
        },
      });
      return { error: "Nota excluída." };
    }

    const note = await prisma.note.upsert({
      where: {
        userId_verseId: {
          userId: progress.userId,
          verseId: verseId,
        },
      },
      update: {
        content,
      },
      create: {
        userId: progress.userId,
        verseId,
        content,
      },
    });

    console.log(note);

    if (note.createdAt.getTime() === note.updatedAt.getTime())
      return { success: "Nota de texto criada." };

    return { success: "Nota de texto editada." };
  } catch (err: any) {
    return { error: "Nota já existente." };
  }
};
