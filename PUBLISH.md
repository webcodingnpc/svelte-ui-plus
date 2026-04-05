# svelte-ui 发布到 npm 操作文档

## 前置条件

1. 安装 Node.js（≥ 18）
2. 拥有 npm 账号（没有则去 https://www.npmjs.com/signup 注册）

---

## 一、确认包名可用

npm 包名全局唯一，`svelte-ui` 大概率已被占用。先检查：

```bash
npm view svelte-ui
```

- **如果已被占用**：需要换名字。两种方案：
  - **方案 A — scope 包**（推荐）：改为 `@你的用户名/svelte-ui`，例如 `@zhangsan/svelte-ui`
  - **方案 B — 换名**：改为 `svelteui-components` 等未被占用的名字

- **如果未被占用**：直接使用 `svelte-ui`

修改 `package.json` 中的 `name` 字段：

```json
{
    "name": "@你的用户名/svelte-ui"
}
```

> 使用 scope 包时，`unpkg` 和 `jsdelivr` 字段的 CDN 地址也会变为 `https://cdn.jsdelivr.net/npm/@你的用户名/svelte-ui/dist/svelte-ui.iife.js`

---

## 二、补全 package.json 信息

发布前确认以下字段已填写：

```json
{
    "author": "你的名字或 GitHub 用户名",
    "repository": {
        "type": "git",
        "url": "https://github.com/你的用户名/你的仓库名"
    }
}
```

---

## 三、构建产物

```bash
cd svelte-ui
npm run build
```

确认 `dist/` 目录包含以下文件：

```
dist/
├── svelte-ui.mjs          # ESM 格式
├── svelte-ui.cjs          # CJS 格式
├── svelte-ui.iife.js      # IIFE/CDN 格式
├── styles.css             # 全局样式
└── types/                 # 类型声明
```

---

## 四、登录 npm

```bash
npm login
```

按提示输入用户名、密码、邮箱、OTP 验证码（如果开启了 2FA）。

验证登录状态：

```bash
npm whoami
```

---

## 五、预检：查看将要发布的文件

```bash
npm pack --dry-run
```

确认输出的文件列表符合预期（应包含 `dist/`、`components/`、`styles/`、`utils/`、`index.ts`、`README.md`），不应包含 `node_modules/`、`scripts/`、`docs/` 等开发文件。

如需进一步确认，可以生成本地 tarball 并解压查看：

```bash
npm pack
# 会生成 svelte-ui-0.1.0.tgz，可用解压工具查看内容
```

---

## 六、发布

### 普通包（非 scope）

```bash
npm publish
```

### scope 包（@用户名/svelte-ui）

scope 包默认为私有，需要加 `--access public` 才能免费发布：

```bash
npm publish --access public
```

---

## 七、验证发布成功

```bash
# 查看已发布的包信息
npm view @你的用户名/svelte-ui

# 在另一个项目中试装
npm install @你的用户名/svelte-ui
```

在浏览器访问：
- npm 页面：`https://www.npmjs.com/package/@你的用户名/svelte-ui`
- CDN：`https://cdn.jsdelivr.net/npm/@你的用户名/svelte-ui/dist/svelte-ui.iife.js`

---

## 八、后续版本更新

每次发布新版本前：

```bash
# 1. 修改版本号（三选一）
npm version patch   # 0.1.0 → 0.1.1（修复）
npm version minor   # 0.1.0 → 0.2.0（新功能）
npm version major   # 0.1.0 → 1.0.0（重大变更）

# 2. 重新构建
npm run build

# 3. 发布
npm publish --access public
```

---

## 常见问题

### Q: 提示 `You must be logged in to publish packages`
A: 运行 `npm login` 重新登录。

### Q: 提示 `Package name too similar to existing packages`
A: npm 有相似名称保护，换一个更有辨识度的包名。

### Q: 提示 `You do not have permission to publish`
A: 该包名已被其他人占用，需要换名（建议用 scope 包 `@用户名/xxx`）。

### Q: 提示 `This package requires a paid plan`
A: scope 包默认私有，加 `--access public` 参数即可免费发布。

### Q: 发布后 CDN 没有生效
A: jsdelivr 通常在发布后几分钟内自动同步，也可手动刷新：`https://purge.jsdelivr.net/npm/@你的用户名/svelte-ui`

### Q: 想撤回已发布的版本
A: 72 小时内可以撤回：`npm unpublish @你的用户名/svelte-ui@0.1.0`，超过 72 小时需联系 npm 支持。

### Q: 使用了淘宝镜像导致 publish 失败
A: 发布时必须使用官方 registry：
```bash
npm publish --access public --registry https://registry.npmjs.org
```
