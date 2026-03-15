# 项目规则 (project_rule.md)

## 一、项目定位

markdown-lcy-backend 是 lcy 个人的 Markdown 服务端，采用企业级 TypeScript 技术栈，提供 Markdown 编辑、存储、渲染等能力的 RESTful API。项目面向本地开发与长期维护，遵循规格驱动、迭代式开发。

## 二、技术栈约定

- **运行时**：Node.js 20 LTS 及以上
- **语言**：TypeScript 5.x，启用 strict 模式
- **包管理**：pnpm（禁止混用 npm/yarn）
- **框架**：NestJS + Fastify 适配器（兼顾模块化架构与高性能）
- **数据层**：Prisma ORM，schema 与迁移位于 `prisma/`
- **校验**：Zod 做请求体与配置校验
- **测试**：Vitest 单元测试，Supertest 接口测试
- **代码质量**：ESLint + Prettier，提交前需通过 `pnpm lint` 与 `pnpm format:check`
- **API 文档**：OpenAPI (Swagger)，随接口变更同步更新

## 三、目录结构

- `src/`：应用源码，按 NestJS 模块组织（controller、service、module）
- `prisma/`：Prisma schema、迁移文件及生成产物
- `openspec/`：OpenSpec 规格、变更提案、config.yaml
- `test/`：测试用例

新增模块应置于 `src/` 下对应子目录，遵循单一职责与依赖注入。

## 四、开发流程（OpenSpec OPSX）

1. **先规格，后实现**：新功能或重构前，在 `openspec/changes/<变更名>/` 下创建 proposal、specs、design、tasks。
2. **按 tasks 执行**：实现时严格按 `tasks.md` 顺序推进，每完成一项勾选 `[x]`。
3. **不发明需求**：未在 OpenSpec 变更中定义的需求不得擅自实现。
4. **归档同步**：变更完成后执行 `/opsx:archive`，将规格合并到 `openspec/specs/` 主线。

在 Cursor 中可使用 `/opsx:propose`、`/opsx:apply`、`/opsx:archive` 等斜杠命令。

## 五、代码风格

- 使用单引号、尾逗号、分号（Prettier 默认）；接口与类型用 `interface`，复杂校验用 Zod
- 异步统一 `async/await`；业务异常用 `HttpException`，底层错误需包装后抛出

## 六、环境与配置

- 敏感配置仅通过 `.env` 管理，禁止硬编码；提供 `.env.example` 模板
- 本地默认 SQLite，生产可切换 PostgreSQL

## 七、提交与协作

- 提交信息建议约定式提交（type(scope): subject）；单次提交聚焦单一变更
- 合并前确保 `pnpm build`、`pnpm test`、`pnpm lint` 通过

---

*本规则与 `openspec/config.yaml` 保持一致，作为 AI 助手与开发者的共同约束。*
