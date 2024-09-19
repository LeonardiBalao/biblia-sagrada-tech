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
  const chapters = await prisma.chapter.findMany();

  // Map through the products to create the sitemap entries
  return chapters.map((chapter) => ({
    url: `${BASE_URL}/biblia/${chapter.testament.toLocaleLowerCase()}-testamento/${generateSlug(
      removeChapterNumbers(chapter.name)
    )}/${chapter.slug}`,
    lastModified: new Date().toISOString(),
  }));
}
