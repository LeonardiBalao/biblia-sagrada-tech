import prisma from "../server/db";
import { newB } from "./pdf/novo-testamento-capitulos";
import { TESTAMENT } from "@prisma/client";

const importChapters = async () => {
  const chapters = await prisma.chapter.createMany({
    data: newB.map((chapter) => ({
      ...chapter,
      testament: TESTAMENT[chapter.testament as keyof typeof TESTAMENT],
    })),
  });
  if (chapters) return chapters.count;
};

importChapters();
