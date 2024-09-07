import { generateSlug } from "../utils/functions";
import prisma from "./db";

const createChapterSlugs = async () => {
  const chapters = await prisma.chapter.findMany();

  if (!chapters) return;

  for (let chapter of chapters) {
    const newChapter = await prisma.chapter.update({
      where: {
        id: chapter.id,
      },
      data: {
        slug: generateSlug(chapter.name),
      },
    });
    console.log(newChapter.slug);
  }
};

createChapterSlugs();
