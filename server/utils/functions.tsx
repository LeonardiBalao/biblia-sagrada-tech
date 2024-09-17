import { AlarmSmoke, Church } from "lucide-react";

export function processString(input: string) {
  // Split the input string into parts
  let parts = input.split(" ");

  // Process each part
  for (let i = 0; i < parts.length; i++) {
    if (
      i === 0 &&
      (parts[0] === "I" ||
        parts[0] === "II" ||
        parts[0] === "III" ||
        parts[0] === "IV" ||
        parts[0] === "V")
    ) {
      parts[0] = parts[0].toUpperCase();
    } else if (
      parts[i] === "DE" &&
      parts[i] === "DO" &&
      parts[i] === "DOS" &&
      parts[i] === "DAS"
    ) {
      // Lowercase the words in the middle, except "DE" and "DO"
      parts[i] = parts[i].toLowerCase();
    } else {
      parts[i] = parts[i][0] + parts[i].slice(1).toLowerCase();
    }
  }

  // Join the parts back into a single string
  return parts.join(" ");
}

export function createVerses(length: number, start: number): number[] {
  return Array.from({ length }, (_, index) => start + index);
}

export function getRandomQuizz(length: number): number {
  return Math.floor(Math.random() * length);
}

export const mapIcon = async (icon: string) => {
  switch (icon) {
    case "noviço":
      return <Church />;
    default:
      return <AlarmSmoke />;
  }
};

export const treatTestamentSlug = (slug: string) => {
  return slug.split("-")[0].toUpperCase();
};

export function generateSlug(text: string): string {
  const accentsMap = new Map<string, string>([
    ["á", "a"],
    ["à", "a"],
    ["ã", "a"],
    ["â", "a"],
    ["ä", "a"],
    ["é", "e"],
    ["è", "e"],
    ["ê", "e"],
    ["ë", "e"],
    ["í", "i"],
    ["ì", "i"],
    ["î", "i"],
    ["ï", "i"],
    ["ó", "o"],
    ["ò", "o"],
    ["õ", "o"],
    ["ô", "o"],
    ["ö", "o"],
    ["ú", "u"],
    ["ù", "u"],
    ["û", "u"],
    ["ü", "u"],
    ["ç", "c"],
    ["ñ", "n"],
    ["Á", "A"],
    ["À", "A"],
    ["Ã", "A"],
    ["Â", "A"],
    ["Ä", "A"],
    ["É", "E"],
    ["È", "E"],
    ["Ê", "E"],
    ["Ë", "E"],
    ["Í", "I"],
    ["Ì", "I"],
    ["Î", "I"],
    ["Ï", "I"],
    ["Ó", "O"],
    ["Ò", "O"],
    ["Õ", "O"],
    ["Ô", "O"],
    ["Ö", "O"],
    ["Ú", "U"],
    ["Ù", "U"],
    ["Û", "U"],
    ["Ü", "U"],
    ["Ç", "C"],
    ["Ñ", "N"],
  ]);

  const slug = text
    .split("")
    .map((char) => accentsMap.get(char) || char) // Use the original character if not found in the map
    .join("")
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
    .trim() // Trim spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
    .slice(0, 50); // Limit to 50 characters
  return slug;
}
