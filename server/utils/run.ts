import prisma from "../db";

// const moveVersesToChapter = async (
//   chapterId: number,
//   targetChapterId: number
// ) => {
//   await prisma.verse.updateMany({
//     where: {
//       chapterId,
//     },
//     data: {
//       chapterId: targetChapterId,
//     },
//   });
// };

// moveVersesToChapter(42, 41);

// const decrementChapterId = async (amount: number) => {
//   const chapters = (
//     await prisma.chapter.findMany({
//       orderBy: {
//         id: "asc",
//       },
//     })
//   ).slice(41);

//   for (let c of chapters) {
//     const newId = await prisma.chapter.update({
//       where: {
//         id: c.id,
//       },
//       data: {
//         id: {
//           decrement: amount,
//         },
//       },
//     });
//   }
// };

// decrementChapterId(1);

const resetVerseNumber = async (chapterId: number) => {
  const verses = await prisma.verse.findMany({
    where: {
      chapterId,
    },
    orderBy: {
      id: "asc",
    },
  });

  let i = 0;

  for (let v of verses) {
    i++;
    let newV = await prisma.verse.update({
      where: { id: v.id },
      data: {
        number: i,
      },
    });
  }
};

resetVerseNumber(41);
