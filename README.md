# markdown-lcy-backend

lcy 自己的 .md 服务端：企业级 TypeScript 后端，提供 Markdown 相关能力的 API 服务。

## 技术栈

- **运行时**: Node.js 20+
- **语言**: TypeScript 5（strict）
- **框架**: NestJS + Fastify
- **ORM**: Prisma
- **校验**: Zod
- **配置**: 环境变量 + `@nestjs/config`
- **包管理**: pnpm

## 本地开发

### 前置

- Node.js >= 20
- pnpm（`npm i -g pnpm`）

### 安装与启动

```bash
# 安装依赖
pnpm install

# 复制环境变量（按需修改）
cp .env.example .env

# 生成 Prisma Client
pnpm prisma:generate

# 执行数据库迁移（含 User、RefreshToken、Document.userId）
pnpm prisma:migrate

# 创建/更新管理员账号（用户名 admin，密码见 .env ADMIN_INIT_PASSWORD，默认 admin123）
pnpm prisma db seed

# 开发模式（热重载）
pnpm dev
```

默认监听 `http://0.0.0.0:3001`，可通过 `.env` 中 `PORT`、`HOST` 修改。

### 健康检查

服务启动后：

```bash
curl http://localhost:3001/health
```

返回示例：

```json
{
  "status": "ok",
  "timestamp": "2025-03-01T12:00:00.000Z",
  "service": "markdown-lcy-backend",
  "db": "ok"
}
```

`db` 为数据库连通性检查结果（`ok` / `error`）。

### 常用脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 开发模式（watch） |
| `pnpm build` | 构建 |
| `pnpm start` | 生产启动（需先 build） |
| `pnpm lint` | ESLint 检查 |
| `pnpm format` | Prettier 格式化 |
| `pnpm test` | Vitest 测试 |
| `pnpm prisma:generate` | 生成 Prisma Client |
| `pnpm prisma:migrate` | 执行迁移（开发） |
| `pnpm prisma:studio` | 打开 Prisma Studio |

## OpenSpec（OPSX 工作流）

本项目使用 [OpenSpec-cn](https://github.com/studyzy/OpenSpec-cn)（OPSX 工作流）做规格驱动开发：

- **配置**：`openspec/config.yaml`（项目上下文、制品规则、schema: spec-driven）
- **当前规格**：`openspec/specs/`（归档后的「当前真相」）
- **进行中变更**：`openspec/changes/<变更名>/`（proposal、specs、design、tasks）

### 常用命令（在 Cursor 中用斜杠触发）

| 命令 | 说明 |
|------|------|
| `/opsx:propose "想法"` | 开始新变更或探索想法 |
| `/opsx:explore` | 深入思考、调查问题、明确需求 |
| `/opsx:apply` | 按 tasks.md 实施任务并勾选 |
| `/opsx:archive` | 完成后归档并同步规格到主线 |

安装与升级：`npm install -g @studyzy/openspec-cn@latest`，在项目内执行 `openspec-cn init --tools cursor` 可重新生成 Cursor 技能与命令。详见 [OPSX 工作流文档](https://github.com/studyzy/OpenSpec-cn/blob/main/docs/opsx.md)。

## License

见 [LICENSE](./LICENSE)。
