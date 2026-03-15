import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { UserInfo } from '../auth/auth.service';
import { Role } from '@prisma/client';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(user: UserInfo) {
    const where: Prisma.DocumentWhereInput =
      user.role === Role.ADMIN ? {} : { userId: user.id };
    return this.prisma.document.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string, user: UserInfo) {
    const doc = await this.prisma.document.findUnique({
      where: { id },
    });
    if (!doc) {
      throw new NotFoundException(`文档 ${id} 不存在`);
    }
    if (user.role !== Role.ADMIN && doc.userId !== user.id) {
      throw new ForbiddenException('无权访问该文档');
    }
    return doc;
  }

  async create(title: string, content: string, userId: string) {
    return this.prisma.document.create({
      data: { title, content, userId },
    });
  }

  async update(
    id: string,
    user: UserInfo,
    title?: string,
    content?: string,
  ) {
    await this.findOne(id, user);
    return this.prisma.document.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
      },
    });
  }

  async remove(id: string, user: UserInfo) {
    await this.findOne(id, user);
    await this.prisma.document.delete({
      where: { id },
    });
  }
}
