# 变更提案：从零搭建企业级 TypeScript 服务端

## Why（为什么）

需要从零搭建一套可在本地运行的企业级 TS 服务端，作为 markdown-lcy 的后端基础。采用主流、较新且可长期维护的技术栈，并遵循「先规格、后实现」的 OpenSpec 流程。

## What（做什么）

- 引入 OpenSpec 流程：建立 `openspec/` 目录、`project.md`、`AGENTS.md`，以及本变更的 proposal / tasks / specs。
- 初始化工程：pnpm、TypeScript 5（strict）、ESLint、Prettier。
- 搭建 NestJS + Fastify 应用：入口、根模块、健康检查接口。
- 集成 Prisma：schema 占位、环境变量、数据库连接与健康检查联动。
- 文档与本地运行：README 与本地开发、启动说明。

## Impact（影响）

- 仓库根目录新增 `package.json`、`tsconfig.json`、`eslint`/`prettier` 配置、`src/`、`prisma/`。
- 新增 `openspec/` 作为规格与变更的单一来源，后续功能按「提案 → tasks → 实现」进行。
- 本地可通过 `pnpm install` 与 `pnpm run dev` 启动服务并访问健康检查接口。
