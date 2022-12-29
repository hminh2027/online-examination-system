import prisma from "../database/prisma.js";

export const getModules = async (req, res) => {
  res.send(await prisma.module.findMany());
};
