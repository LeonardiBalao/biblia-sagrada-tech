const PDFExtract = require("pdf.js-extract").PDFExtract;
const pdfExtract = new PDFExtract();
const fs = require("fs");
const buffer = fs.readFileSync("./biblia.pdf");
const options = {}; /* see below */
pdfExtract.extractBuffer(buffer, options, (err, data) => {
  if (err) return console.log(err);

  const regex = /\(([^)]+)\)/;

  const chapters = data.pages[1].content.slice(10).map((c) => {
    const matches = c.str.match(regex);
    const firstPart = c.str.replace(matches[0], "").trim();
    const secondPart = matches[1].trim();
    return {
      ab: firstPart,
      name: secondPart,
    };
  });

  fs.writeFile(
    "antigo-testamento-capitulos2.json",
    JSON.stringify(chapters),
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
});
