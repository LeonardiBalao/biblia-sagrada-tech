import { ReadingProgress } from "@prisma/client";

interface verses {
  number: number;
  content: string;
}

declare global {
  type ProgressHelper = {
    slug: string;
    chapterName: string;
    verses: verses[];
  };
  type UserProgress = ProgressHelper & ReadingProgress;

  interface LeaderboardUser {
    name: string;
    points: number;
  }
}

export default global;
