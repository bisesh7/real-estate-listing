import { PrismaClient } from "@prisma/client";

// Create a single Prisma Client instance
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"], // Optional: logs all queries for debugging
});

export default prisma;
