// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "./generated/client";
import { singleton } from "../utils";

const prisma = singleton("prisma", () => {
  // if (process.env.PRISMA_OPTIMIZE === "true") {
  //   return new PrismaClient().$extends(withOptimize());
  // } else {
  // }
  return new PrismaClient();
});
prisma.$connect();
export { prisma };
