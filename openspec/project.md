# 项目上下文 (markdown-lcy-backend)

## 项目简介

lcy 自己的 .md 服务端：企业级 TypeScript 后端，用于 Markdown 相关能力（编辑、存储、渲染等）的 API 服务。

## 技术栈约定

- **运行时**: Node.js 20 LTS
- **语言**: TypeScript 5.x，strict 模式
- **包管理**: pnpm
- **框架**: NestJS + Fastify 适配器（兼顾企业级架构与性能）
- **ORM**: Prisma
- **校验**: Zod
- **日志**: Pino（通过 Nest 或 Fastify 集成）
- **配置**: 环境变量 + dotenv，启动时校验
- **测试**: Vitest + Supertest
- **代码质量**: ESLint + Prettier
- **API 文档**: OpenAPI (Swagger)

## 目录约定

- `src/` 应用源码
- `prisma/` Prisma schema 与迁移
- `openspec/` OpenSpec 规格与变更提案

## 规范

- 先写/更新 OpenSpec 变更提案与 tasks，再实现
- 实现时按 `tasks.md` 顺序执行，并在完成时勾选任务
