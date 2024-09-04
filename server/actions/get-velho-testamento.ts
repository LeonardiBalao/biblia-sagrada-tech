"use server";

import { TESTAMENT } from "@prisma/client";
import prisma from "../db";

export const getVelhoTestamento = async () => {
  const capitulosVelhoTestamento = await prisma.chapter.findMany({
    where: { testament: TESTAMENT.VELHO },
  });
  if (!capitulosVelhoTestamento) return;
  return capitulosVelhoTestamento;
};
