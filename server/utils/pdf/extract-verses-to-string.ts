import prisma from "@/server/db";
import { TESTAMENT } from "@prisma/client";

const PDFExtract = require("pdf.js-extract").PDFExtract;
const pdfExtract = new PDFExtract();
const fs = require("fs");
const buffer = fs.readFileSync("./biblia.pdf");
const options = {};

interface Verse {
  chapterName: string;
  number: number;
  content: string;
}

pdfExtract.extractBuffer(buffer, options, (err: any, data: any) => {
  let array = [];
  let pages = data.pages.length;

  for (let i = 3; i < pages - 1; i++) {
    array.push(...data.pages[i].content.slice(6).map((o: any) => o.str));
  }

  fs.writeFile("./utils/pdf/total.json", JSON.stringify(array), (err: any) => {
    if (err) {
      console.error(err);
    }
  });
});
