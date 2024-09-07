"use server";

import { Note, Verse } from "@prisma/client";
import prisma from "../db";

export const getNote = async (userId: string, verseId: number) => {
  const note = (await prisma.note.findFirst({
    where: { userId, verseId },
  })) as Note;

  if (!note) return null;
  return note;
};
