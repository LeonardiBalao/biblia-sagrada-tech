import { Chapter, TESTAMENT } from "@prisma/client";
import { bible } from "./total";
import prisma from "@/server/db";
import { generateSlug } from "../functions";

interface Verse {
  chapterId: number;
  number: number;
  content: string;
}
type ChapterProps = Chapter | null;
let chapter: ChapterProps = null;
const importBible = async () => {
  const verses: Verse[] = [];
  let currentChapter = "";
  let currentVerse: Verse | null = null;
  for (let line of bible) {
    if (line.startsWith("»")) {
      currentChapter = line.replace("»", "").trim();
      if (bible.length < 50279) {
        chapter = await prisma.chapter.create({
          data: {
            name: currentChapter,
            abbreviation: currentChapter.slice(0, 2),
            testament: TESTAMENT.VELHO,
            slug: generateSlug(currentChapter),
          },
        });
      }
      if (bible.length >= 50279) {
        chapter = await prisma.chapter.create({
          data: {
            name: currentChapter,
            abbreviation: currentChapter.slice(0, 2),
            testament: TESTAMENT.NOVO,
            slug: generateSlug(currentChapter),
          },
        });
      }
    } else {
      const verseMatch = line.match(/^(\d+)\s+(.*)/);
      if (verseMatch) {
        if (currentVerse) {
          verses.push(currentVerse);
        }
        currentVerse = {
          chapterId: chapter!.id,
          number: parseInt(verseMatch[1], 10),
          content: verseMatch[2],
        };
      } else if (currentVerse) {
        currentVerse.content += " " + line.trim();
      }
    }

    if (currentVerse) {
      await prisma.verse.create({
        data: currentVerse,
      });
    }
  }
};

importBible();
