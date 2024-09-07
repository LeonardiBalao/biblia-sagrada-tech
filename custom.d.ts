import { ReadingProgress } from "@prisma/client";

interface verses {
  id: number;
  content: string;
}

declare global {
  type ProgressHelper = {
    slug: string;
    chapterName: string;
    verses: verses[];
  };
  type UserProgress = ProgressHelper & ReadingProgress;
}

export default global;
