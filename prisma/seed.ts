import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const ADMIN_ID = 'clxx00000000000000000000001';

async function main() {
  const adminPassword = process.env.ADMIN_INIT_PASSWORD ?? 'admin123';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: { passwordHash },
    create: {
      id: ADMIN_ID,
      username: 'admin',
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log('Admin user ready:', admin.username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
