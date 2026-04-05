# SvelteUI 组件库

基于 **Svelte 5** (Runes) 的 UI 组件库，为 Svelte 生态提供一套完整的 UI 解决方案。

[English](./README.md)

## 特性

- 基于 **Svelte 5 Runes** 语法（`$state`、`$props`、`$derived`、`$effect`、`$bindable`）
- **78 个组件**覆盖基础、表单、数据展示、反馈、导航、其他六大类
- **CSS 变量主题**系统，轻松定制主题色
- **BEM 命名规范**（`su-*` 前缀），样式隔离
- 支持**全量引用**和**按需引用**，天然 Tree-shaking 友好
- **TypeScript** 完整类型支持
- 每个组件自带 Scoped 样式，无需额外引入组件样式文件
- 内置 **20+ SVG 图标**

## 快速开始

### 安装

```bash
npm install svelte-ui-plus
```

### CDN 使用

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-ui-plus/dist/styles.css" />
<script src="https://cdn.jsdelivr.net/npm/svelte-ui-plus/dist/svelte-ui-plus.iife.js"></script>
```

### 全量引用

```ts
// main.ts 中引入全局样式（CSS 变量 + 基础重置）
import 'svelte-ui-plus/styles/index.scss'
```

```svelte
<script lang="ts">
  import { Button, Input, Dialog, message } from 'svelte-ui-plus'
</script>

<Button type="primary" onclick={() => message.success('Hello!')}>
  点击我
</Button>
```

### 按需引用

```svelte
<script lang="ts">
  // 仅引入需要的组件
  import { Button } from 'svelte-ui-plus/components/Button'
  // 仅引入 CSS 变量（不含全局重置）
  import 'svelte-ui-plus/styles/var.scss'
</script>
```

## 组件列表

### 基础组件 (Basic)

| 组件 | 说明 | 引用路径 |
|------|------|----------|
| `Icon` | SVG 图标 | `svelte-ui-plus/components/Icon` |
| `Button` | 按钮 | `svelte-ui-plus/components/Button` |
| `ButtonGroup` | 按钮组 | `svelte-ui-plus/components/Button` |
| `Link` | 链接 | `svelte-ui-plus/components/Link` |
| `Text` | 文本 | `svelte-ui-plus/components/Text` |
| `Scrollbar` | 滚动条 | `svelte-ui-plus/components/Scrollbar` |
| `Divider` | 分割线 | `svelte-ui-plus/components/Divider` |
| `Space` | 间距 | `svelte-ui-plus/components/Space` |
| `Row` | 行布局 | `svelte-ui-plus/components/Row` |
| `Col` | 列布局 | `svelte-ui-plus/components/Col` |
| `Container` | 布局容器 | `svelte-ui-plus/components/Container` |
| `Header` | 顶部容器 | `svelte-ui-plus/components/Container` |
| `Footer` | 底部容器 | `svelte-ui-plus/components/Container` |
| `Main` | 主内容容器 | `svelte-ui-plus/components/Container` |
| `Aside` | 侧边容器 | `svelte-ui-plus/components/Container` |
| `CheckTag` | 可选标签 | `svelte-ui-plus/components/CheckTag` |
| `ConfigProvider` | 全局配置 | `svelte-ui-plus/components/ConfigProvider` |

### 表单组件 (Form)

| 组件 | 说明 | 引用路径 |
|------|------|----------|
| `Input` | 输入框（含文本域） | `svelte-ui-plus/components/Input` |
| `InputNumber` | 数字输入框 | `svelte-ui-plus/components/InputNumber` |
| `InputTag` | 标签输入 | `svelte-ui-plus/components/InputTag` |
| `Autocomplete` | 自动补全 | `svelte-ui-plus/components/Autocomplete` |
| `Select` | 选择器 | `svelte-ui-plus/components/Select` |
| `TreeSelect` | 树选择器 | `svelte-ui-plus/components/TreeSelect` |
| `Cascader` | 级联选择器 | `svelte-ui-plus/components/Cascader` |
| `Switch` | 开关 | `svelte-ui-plus/components/Switch` |
| `Slider` | 滑块 | `svelte-ui-plus/components/Slider` |
| `Checkbox` | 复选框 | `svelte-ui-plus/components/Checkbox` |
| `CheckboxGroup` | 复选框组 | `svelte-ui-plus/components/Checkbox` |
| `Radio` | 单选框 | `svelte-ui-plus/components/Radio` |
| `RadioGroup` | 单选框组 | `svelte-ui-plus/components/Radio` |
| `Rate` | 评分 | `svelte-ui-plus/components/Rate` |
| `ColorPicker` | 颜色选择器 | `svelte-ui-plus/components/ColorPicker` |
| `DatePicker` | 日期选择器 | `svelte-ui-plus/components/DatePicker` |
| `TimePicker` | 时间选择器 | `svelte-ui-plus/components/TimePicker` |
| `TimeSelect` | 时间选择 | `svelte-ui-plus/components/TimeSelect` |
| `Transfer` | 穿梭框 | `svelte-ui-plus/components/Transfer` |
| `Upload` | 上传 | `svelte-ui-plus/components/Upload` |
| `Form` | 表单 | `svelte-ui-plus/components/Form` |
| `FormItem` | 表单项 | `svelte-ui-plus/components/Form` |
| `Mention` | 提及 | `svelte-ui-plus/components/Mention` |

### 数据展示组件 (Data Display)

| 组件 | 说明 | 引用路径 |
|------|------|----------|
| `Tag` | 标签 | `svelte-ui-plus/components/Tag` |
| `Badge` | 徽章 | `svelte-ui-plus/components/Badge` |
| `Avatar` | 头像 | `svelte-ui-plus/components/Avatar` |
| `Card` | 卡片 | `svelte-ui-plus/components/Card` |
| `Empty` | 空状态 | `svelte-ui-plus/components/Empty` |
| `Progress` | 进度条（线 / 圆） | `svelte-ui-plus/components/Progress` |
| `Skeleton` | 骨架屏 | `svelte-ui-plus/components/Skeleton` |
| `Table` | 表格 | `svelte-ui-plus/components/Table` |
| `Pagination` | 分页 | `svelte-ui-plus/components/Pagination` |
| `Descriptions` | 描述列表 | `svelte-ui-plus/components/Descriptions` |
| `DescriptionsItem` | 描述列表项 | `svelte-ui-plus/components/Descriptions` |
| `Result` | 结果页 | `svelte-ui-plus/components/Result` |
| `Statistic` | 统计数值 | `svelte-ui-plus/components/Statistic` |
| `Countdown` | 倒计时 | `svelte-ui-plus/components/Countdown` |
| `Segmented` | 分段控制器 | `svelte-ui-plus/components/Segmented` |
| `Tree` | 树形控件 | `svelte-ui-plus/components/Tree` |
| `Calendar` | 日历 | `svelte-ui-plus/components/Calendar` |
| `Carousel` | 走马灯 | `svelte-ui-plus/components/Carousel` |
| `CarouselItem` | 走马灯子项 | `svelte-ui-plus/components/Carousel` |
| `Timeline` | 时间线 | `svelte-ui-plus/components/Timeline` |
| `TimelineItem` | 时间线节点 | `svelte-ui-plus/components/Timeline` |
| `Watermark` | 水印 | `svelte-ui-plus/components/Watermark` |
| `Image` | 图片 | `svelte-ui-plus/components/Image` |
| `Collapse` | 折叠面板 | `svelte-ui-plus/components/Collapse` |
| `CollapseItem` | 折叠面板项 | `svelte-ui-plus/components/Collapse` |
| `VirtualList` | 虚拟列表 | `svelte-ui-plus/components/VirtualList` |
| `InfiniteScroll` | 无限滚动 | `svelte-ui-plus/components/InfiniteScroll` |

### 反馈组件 (Feedback)

| 组件 | 说明 | 引用路径 |
|------|------|----------|
| `Alert` | 警告 | `svelte-ui-plus/components/Alert` |
| `Dialog` | 对话框 | `svelte-ui-plus/components/Dialog` |
| `Drawer` | 抽屉 | `svelte-ui-plus/components/Drawer` |
| `Tooltip` | 文字提示 | `svelte-ui-plus/components/Tooltip` |
| `Popover` | 弹出框 | `svelte-ui-plus/components/Popover` |
| `Popconfirm` | 气泡确认框 | `svelte-ui-plus/components/Popconfirm` |
| `Message` | 消息提示（函数式） | `svelte-ui-plus/components/Message` |
| `MessageBox` | 消息弹框 | `svelte-ui-plus/components/MessageBox` |
| `Notification` | 通知 | `svelte-ui-plus/components/Notification` |
| `Loading` | 加载 | `svelte-ui-plus/components/Loading` |
| `Tour` | 漫游式引导 | `svelte-ui-plus/components/Tour` |
| `TourStep` | 引导步骤 | `svelte-ui-plus/components/Tour` |
| `Overlay` | 遮罩层 | `svelte-ui-plus/components/Overlay` |
| `CollapseTransition` | 折叠过渡 | `svelte-ui-plus/components/CollapseTransition` |

### 导航组件 (Navigation)

| 组件 | 说明 | 引用路径 |
|------|------|----------|
| `Tabs` | 标签页 | `svelte-ui-plus/components/Tabs` |
| `Breadcrumb` | 面包屑 | `svelte-ui-plus/components/Breadcrumb` |
| `BreadcrumbItem` | 面包屑项 | `svelte-ui-plus/components/Breadcrumb` |
| `Dropdown` | 下拉菜单 | `svelte-ui-plus/components/Dropdown` |
| `Menu` | 导航菜单 | `svelte-ui-plus/components/Menu` |
| `MenuItem` | 菜单项 | `svelte-ui-plus/components/Menu` |
| `MenuItemGroup` | 菜单分组 | `svelte-ui-plus/components/Menu` |
| `SubMenu` | 子菜单 | `svelte-ui-plus/components/Menu` |
| `PageHeader` | 页头 | `svelte-ui-plus/components/PageHeader` |
| `Steps` | 步骤条 | `svelte-ui-plus/components/Steps` |
| `Step` | 步骤 | `svelte-ui-plus/components/Steps` |
| `Affix` | 固钉 | `svelte-ui-plus/components/Affix` |
| `Backtop` | 回到顶部 | `svelte-ui-plus/components/Backtop` |
| `Anchor` | 锚点 | `svelte-ui-plus/components/Anchor` |
| `AnchorLink` | 锚点链接 | `svelte-ui-plus/components/Anchor` |

### 其他组件 (Other)

| 组件 | 说明 | 引用路径 |
|------|------|----------|
| `Splitter` | 分割面板 | `svelte-ui-plus/components/Splitter` |
| `SplitterPanel` | 分割面板子项 | `svelte-ui-plus/components/Splitter` |

## 使用示例

### Button 按钮

```svelte
<Button
  type="primary | success | warning | danger | info | default"
  size="large | default | small"
  plain={false}
  round={false}
  circle={false}
  disabled={false}
  loading={false}
  icon="search"
  onclick={handler}
>
  按钮文字
</Button>
```

### Input 输入框

```svelte
<Input
  bind:value={text}
  type="text | password | number | email | textarea"
  placeholder="请输入"
  clearable
  showPassword
  disabled={false}
  size="large | default | small"
  maxlength={100}
  showWordLimit
  prefixIcon="search"
/>
```

### Select 选择器

```svelte
<Select
  bind:value={selected}
  options={[
    { label: '选项一', value: 1 },
    { label: '选项二', value: 2 },
    { label: '选项三', value: 3, disabled: true },
  ]}
  placeholder="请选择"
  clearable
  multiple={false}
/>
```

### Dialog 对话框

```svelte
<Dialog bind:open={showDialog} title="提示" width="500px">
  <p>这是一段内容</p>
  {#snippet footer()}
    <Button onclick={() => showDialog = false}>取消</Button>
    <Button type="primary" onclick={confirm}>确定</Button>
  {/snippet}
</Dialog>
```

### Table 表格

```svelte
<Table
  data={tableData}
  columns={[
    { key: 'name', title: '姓名', width: '120px' },
    { key: 'age', title: '年龄', width: '80px', align: 'center' },
    { key: 'email', title: '邮箱' },
  ]}
  stripe
  border
/>
```

### Message 消息提示（函数式）

```ts
import { message } from 'svelte-ui-plus'

message.success('操作成功')
message.error('操作失败')
message.warning('请注意')
message.info('提示信息')

// 高级用法
const { close } = message.success('手动关闭', { duration: 0, showClose: true })
close() // 手动关闭
```

### MessageBox 消息弹框（函数式）

```ts
import { msgAlert, msgConfirm, msgPrompt } from 'svelte-ui-plus'

await msgAlert('提示消息', '标题')

try {
  await msgConfirm('确定要删除吗？', '警告')
} catch { /* 取消 */ }

const { value } = await msgPrompt('请输入名称', '输入')
```

### Notification 通知（函数式）

```ts
import { notify } from 'svelte-ui-plus'

notify({ title: '通知', message: '内容', type: 'success' })
notify.success('操作成功')
notify.error({ title: '错误', message: '失败', duration: 0 })
```

### Form 表单

```svelte
<Form labelWidth="100px" labelPosition="right">
  <FormItem label="用户名" required error={errors.username}>
    <Input bind:value={form.username} />
  </FormItem>
  <FormItem label="密码" required>
    <Input bind:value={form.password} type="password" showPassword />
  </FormItem>
  <FormItem>
    <Button type="primary" onclick={submit}>提交</Button>
  </FormItem>
</Form>
```

## 内置图标

通过 `<Icon name="xxx" />` 使用内置图标：

| 名称 | 说明 | 名称 | 说明 |
|------|------|------|------|
| `close` | 关闭 | `check` | 勾选 |
| `circle-check` | 圆形勾选 | `circle-close` | 圆形关闭 |
| `info` | 信息 | `warning` | 警告 |
| `search` | 搜索 | `loading` | 加载中 |
| `arrow-up` | 向上箭头 | `arrow-down` | 向下箭头 |
| `arrow-left` | 向左箭头 | `arrow-right` | 向右箭头 |
| `eye` | 可见 | `eye-off` | 不可见 |
| `plus` | 加号 | `minus` | 减号 |
| `delete` | 删除 | `edit` | 编辑 |
| `more` | 更多 | `refresh` | 刷新 |
| `setting` | 设置 | `fullscreen` | 全屏 |

```svelte
<Icon name="search" size={20} color="var(--su-color-primary)" />
```

## 主题定制

覆盖 CSS 变量即可自定义主题：

```scss
:root {
  --su-color-primary: #722ed1;       // 品牌色
  --su-color-success: #52c41a;
  --su-color-warning: #faad14;
  --su-color-danger: #ff4d4f;
  --su-border-radius-base: 8px;      // 更圆的圆角
  --su-font-size-base: 15px;         // 更大字号
}
```

## 兼容性

| 格式 | 文件 | 用途 |
|------|------|------|
| ESM | `dist/svelte-ui-plus.mjs` | `import` 语法 |
| CJS | `dist/svelte-ui-plus.cjs` | `require()` 语法 |
| IIFE | `dist/svelte-ui-plus.iife.js` | CDN / `<script>` 标签 |
| CSS | `dist/styles.css` | 全局样式 |
| Svelte 源码 | `index.ts` | Svelte 项目直接引用 |

## 许可证

MIT
