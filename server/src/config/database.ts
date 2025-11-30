import { PrismaClient } from '@prisma/client';
import { config } from '../config';

// Create a singleton instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: config.IS_DEVELOPMENT ? ['query', 'error', 'warn'] : ['error'],
  });
};

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (config.IS_DEVELOPMENT) {
  globalThis.prismaGlobal = prisma;
}

// Graceful shutdown
export const disconnectDatabase = async (): Promise<void> => {
  await prisma.$disconnect();
};
