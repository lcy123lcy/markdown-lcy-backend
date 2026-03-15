import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('health')
  async health() {
    let db: 'ok' | 'error' = 'ok';
    try {
      await this.prisma.$queryRawUnsafe('SELECT 1');
    } catch {
      db = 'error';
    }
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'markdown-lcy-backend',
      db,
    };
  }
}
