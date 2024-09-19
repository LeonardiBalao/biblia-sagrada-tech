import prisma from "@/server/db";
import {
  generateSlug,
  processString,
  removeChapterNumbers,
} from "@/server/utils/functions";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://www.bibliasagrada.tech";

  // Fetch all products
  const verseChapters = await prisma.verse.findMany({
    include: {
      chapter: true,
    },
  });

  // Map through the products to create the sitemap entries
  return verseChapters.map((verse) => ({
    url: `${BASE_URL}/biblia/${verse.chapter.testament.toLocaleLowerCase()}-testamento/${generateSlug(
      removeChapterNumbers(verse.chapter.name)
    )}/${verse.chapter.slug}&versiculo=${verse.number}`,
    lastModified: new Date().toISOString(),
  }));
}
