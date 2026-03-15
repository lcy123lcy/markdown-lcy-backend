import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { UserInfo } from '../auth/auth.service';

@Controller('api/documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  async findAll(@CurrentUser() user: UserInfo) {
    return this.documentsService.findAll(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: UserInfo) {
    return this.documentsService.findOne(id, user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() user: UserInfo,
    @Body() body: { title?: string; content?: string },
  ) {
    return this.documentsService.create(
      body.title ?? '未命名文档',
      body.content ?? '',
      user.id,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @CurrentUser() user: UserInfo,
    @Body() body: { title?: string; content?: string },
  ) {
    return this.documentsService.update(id, user, body.title, body.content);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: UserInfo) {
    await this.documentsService.remove(id, user);
  }
}
