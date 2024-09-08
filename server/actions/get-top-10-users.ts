"use server";
import prisma from "../db";

export const getTop10Users = async () => {
  let users: LeaderboardUser[] = [];
  const top10UserIds = (
    await prisma.points.findMany({
      take: 10,
      orderBy: { points: "desc" },
    })
  ).map((u) => ({ id: u.userId, points: u.points }));

  for (let user of top10UserIds) {
    const userData = await prisma.user.findFirst({ where: { id: user.id } });
    if (!userData || !userData.name) return;
    let username = userData.name.split(" ");
    users.push({
      name: username[0] + " " + username[1][0] + "...",
      points: user.points,
    });
  }

  return users;
};
