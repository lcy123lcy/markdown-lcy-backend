# 能力：backend-bootstrap（服务端引导）

本变更为首次搭建，以下均为新增。

## ADDED Requirements

### Requirement: 可本地启动的 HTTP 服务

系统 SHALL 在本地通过单一命令（如 `pnpm run dev`）启动 HTTP 服务，并对外提供至少一个健康检查端点。

#### Scenario: 健康检查返回成功

- **GIVEN** 服务已启动
- **WHEN** 客户端请求健康检查端点（如 `GET /health`）
- **THEN** 返回 HTTP 200 及表示运行中的状态信息

### Requirement: 企业级技术栈基线

系统 SHALL 使用以下技术栈并可在本地无外部密钥下运行：

- NestJS + Fastify 作为 HTTP 层
- TypeScript 5 严格模式
- Prisma 作为 ORM，配置与迁移位于 `prisma/`
- 环境变量通过 `.env` 与 `.env.example` 管理，含 `DATABASE_URL`

### Requirement: 代码质量工具链

系统 SHALL 提供 ESLint 与 Prettier 配置，并可通过脚本执行 lint 与 format；构建脚本产出可在 Node 下运行的产物。

### Requirement: OpenSpec 流程就绪

项目 SHALL 包含 `openspec/` 目录：`project.md`、`AGENTS.md`、以及本变更的 `proposal.md`、`tasks.md` 与 `specs/` 下的 Delta 规格，供后续变更按「提案 → tasks → 实现」执行。
