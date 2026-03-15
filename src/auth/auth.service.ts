import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { randomBytes } from 'crypto';

export interface JwtPayload {
  sub: string;
  username: string;
  role: Role;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserInfo {
  id: string;
  username: string;
  role: Role;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserInfo | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }

  async register(username: string, password: string): Promise<AuthTokens> {
    const existing = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existing) {
      throw new ConflictException('用户名已存在');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { username, passwordHash, role: 'USER' },
    });
    return this.generateTokens(user.id, user.username, user.role);
  }

  async login(user: UserInfo): Promise<AuthTokens> {
    return this.generateTokens(user.id, user.username, user.role);
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    const stored = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });
    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('刷新令牌无效或已过期');
    }
    await this.prisma.refreshToken.delete({
      where: { id: stored.id },
    });
    return this.generateTokens(
      stored.user.id,
      stored.user.username,
      stored.user.role,
    );
  }

  async logout(refreshToken: string | undefined): Promise<void> {
    if (refreshToken) {
      await this.prisma.refreshToken.deleteMany({
        where: { token: refreshToken },
      });
    }
  }

  async findUserById(id: string): Promise<UserInfo | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    return {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }

  private async generateTokens(
    userId: string,
    username: string,
    role: Role,
  ): Promise<AuthTokens> {
    const payload: JwtPayload = { sub: userId, username, role };
    const accessExpires = this.config.get<string>('JWT_EXPIRES_IN', '15m');
    const refreshExpires = this.config.get<string>(
      'REFRESH_EXPIRES_IN',
      '7d',
    );
    const accessExpiresMs = this.parseExpiresMs(accessExpires);
    const refreshExpiresMs = this.parseExpiresMs(refreshExpires);

    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_SECRET'),
      expiresIn: accessExpires,
    });

    const refreshTokenValue = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + refreshExpiresMs);

    await this.prisma.refreshToken.create({
      data: {
        userId,
        token: refreshTokenValue,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken: refreshTokenValue,
      expiresIn: Math.floor(accessExpiresMs / 1000),
    };
  }

  private parseExpiresMs(exp: string): number {
    const match = exp.match(/^(\d+)([smhd])$/);
    if (!match) return 15 * 60 * 1000;
    const [, num, unit] = match;
    const n = parseInt(num!, 10);
    const multipliers: Record<string, number> = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };
    return n * (multipliers[unit] ?? 1000);
  }
}
