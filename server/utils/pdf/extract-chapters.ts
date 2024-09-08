const PDFExtract = require("pdf.js-extract").PDFExtract;
const pdfExtract = new PDFExtract();
const fs = require("fs");
const buffer = fs.readFileSync("./biblia.pdf");
const options = {}; /* see below */

import { TESTAMENT } from "@prisma/client";

pdfExtract.extractBuffer(buffer, options, (err: any, data: any) => {
  const regex = /\(([^)]+)\)/;

  const chapters = data.pages[1].content.slice(10).map((c: any) => {
    const matches = c.str.match(regex);
    const firstPart = c.str.replace(matches[0], "").trim();
    const secondPart = matches[1].trim();
    return {
      testament: TESTAMENT.VELHO,
      abbreviation: secondPart,
      name: firstPart,
    };
  });

  fs.writeFile(
    "./utils/pdf/velho-testamento-capitulos.ts",
    JSON.stringify(chapters),
    (err: any) => {
      if (err) {
        console.error(err);
      }
    }
  );
});
