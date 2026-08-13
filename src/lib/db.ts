// src/lib/db.ts

// Purpose: creates one shared Prisma Client instance for the whole app
// In Next.js dev mode, files can reload frequently without this pattern,
// it accidentally spawns a new database connection on every file save
// and quickly exhaust the connection pool

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}