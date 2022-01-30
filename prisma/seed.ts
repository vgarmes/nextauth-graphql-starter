import { PrismaClient } from '@prisma/client';
import { posts } from '../mock-data/posts';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: `testemail@gmail.com`,
      password: `secret`,
      role: 'ADMIN',
    },
  });

  await prisma.link.createMany({
    data: posts,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
