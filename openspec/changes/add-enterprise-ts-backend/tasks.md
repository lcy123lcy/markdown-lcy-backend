# 实现任务清单：从零搭建企业级 TS 服务端

按顺序执行，完成一项勾选一项。

- [x] **Task 1** 创建 `package.json` 与依赖：pnpm、TypeScript、NestJS、Fastify 适配器、Prisma、Zod、Pino、Vitest、ESLint、Prettier、OpenAPI；定义 scripts（build、dev、start、lint、format、test、prisma:generate 等）。
- [x] **Task 2** 配置 TypeScript（`tsconfig.json` 与 `tsconfig.build.json`）、ESLint（含 TS 与 Prettier 兼容）、Prettier；根目录保留 `.prettierrc`/`.eslintrc` 或等效配置。
- [x] **Task 3** 搭建 NestJS 应用：`src/main.ts` 使用 Fastify 适配器并监听约定端口；`src/app.module.ts` 根模块；实现健康检查接口（如 `GET /health` 或 `GET /`）返回 200 与简单状态。
- [x] **Task 4** 配置 Prisma：`prisma/schema.prisma` 占位（如单个占位 model 或空）；`.env.example` 含 `DATABASE_URL`；应用内 PrismaModule/PrismaService 与健康检查中可选的 DB 连通性检查。
- [x] **Task 5** 编写 README：项目简介、技术栈、本地开发前置（Node/pnpm）、安装与启动命令、健康检查验证方式；注明 OpenSpec 流程（见 `openspec/`）。
