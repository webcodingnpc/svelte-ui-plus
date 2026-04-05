# SvelteUI 组件�?

基于 **Svelte 5** (Runes) �?UI 组件库，�?Svelte 生态提供一套完整的 UI 解决方案�?

## 特�?

- 基于 **Svelte 5 Runes** 语法（`$state`、`$props`、`$derived`、`$effect`、`$bindable`�?
- **78 个组�?*覆盖基础、表单、数据展示、反馈、导航、其他六大类
- **CSS 变量主题**系统，轻松定制主题色
- **BEM 命名规范**（`su-*` 前缀），样式隔离
- 支持**全量引用**�?*按需引用**，天�?Tree-shaking 友好
- **TypeScript** 完整类型支持
- 每个组件自带 Scoped 样式，无需额外引入组件样式文件
- 内置 **20+ SVG 图标**

## 快速开�?

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
// main.ts 中引入全局样式（CSS 变量 + 基础重置�?
import 'svelte-ui-plus/styles/index.scss'
```

```svelte
<script lang="ts">
  import { Button, Input, Dialog, message } from 'svelte-ui-plus'
</script>

<Button type="primary" onclick={() => message.success('Hello!')}>
  点击�?
</Button>
```

### 按需引用

```svelte
<script lang="ts">
  // 仅引入需要的组件
  import { Button } from 'svelte-ui-plus/components/Button'
  // 仅引�?CSS 变量（不含全局重置�?
  import 'svelte-ui-plus/styles/var.scss'
</script>
```

## 组件列表

### 基础组件 (Basic)

| 组件 | 说明 | 引用路径 |
|------|------|----------|
| `Icon` | SVG 图标 | `svelte-ui-plus/components/Icon` |
| `Button` | 按钮 | `svelte-ui-plus/components/Button` |
| `ButtonGroup` | 按钮�?| `svelte-ui-plus/components/Button` |
| `Link` | 链接 | `svelte-ui-plus/components/Link` |
| `Text` | 文本 | `svelte-ui-plus/components/Text` |
| `Scrollbar` | 滚动�?| `svelte-ui-plus/components/Scrollbar` |
| `Divider` | 分割�?| `svelte-ui-plus/components/Divider` |
| `Space` | 间距 | `svelte-ui-plus/components/Space` |
| `Row` | 行布局 | `svelte-ui-plus/components/Row` |
| `Col` | 列布局 | `svelte-ui-plus/components/Col` |
| `Container` | 布局容器 | `svelte-ui-plus/components/Container` |
| `Header` | 顶部容器 | `svelte-ui-plus/components/Container` |
| `Footer` | 底部容器 | `svelte-ui-plus/components/Container` |
| `Main` | 主内容容�?| `svelte-ui-plus/components/Container` |
| `Aside` | 侧边容器 | `svelte-ui-plus/components/Container` |
| `CheckTag` | 可选标�?| `svelte-ui-plus/components/CheckTag` |
| `ConfigProvider` | 全局配置 | `svelte-ui-plus/components/ConfigProvider` |

### 表单组件 (Form)

| 组件 | 说明 | 引用路径 |
|------|------|----------|
| `Input` | 输入框（含文本域�?| `svelte-ui-plus/components/Input` |
| `InputNumber` | 数字输入�?| `svelte-ui-plus/components/InputNumber` |
| `InputTag` | 标签输入 | `svelte-ui-plus/components/InputTag` |
| `Autocomplete` | 自动补全 | `svelte-ui-plus/components/Autocomplete` |
| `Select` | 选择�?| `svelte-ui-plus/components/Select` |
| `TreeSelect` | 树选择�?| `svelte-ui-plus/components/TreeSelect` |
| `Cascader` | 级联选择�?| `svelte-ui-plus/components/Cascader` |
| `Switch` | 开�?| `svelte-ui-plus/components/Switch` |
| `Slider` | 滑块 | `svelte-ui-plus/components/Slider` |
| `Checkbox` | 复选框 | `svelte-ui-plus/components/Checkbox` |
| `CheckboxGroup` | 复选框�?| `svelte-ui-plus/components/Checkbox` |
| `Radio` | 单选框 | `svelte-ui-plus/components/Radio` |
| `RadioGroup` | 单选框�?| `svelte-ui-plus/components/Radio` |
| `Rate` | 评分 | `svelte-ui-plus/components/Rate` |
| `ColorPicker` | 颜色选择�?| `svelte-ui-plus/components/ColorPicker` |
| `DatePicker` | 日期选择�?| `svelte-ui-plus/components/DatePicker` |
| `TimePicker` | 时间选择�?| `svelte-ui-plus/components/TimePicker` |
| `TimeSelect` | 时间选择 | `svelte-ui-plus/components/TimeSelect` |
| `Transfer` | 穿梭�?| `svelte-ui-plus/components/Transfer` |
| `Upload` | 上传 | `svelte-ui-plus/components/Upload` |
| `Form` | 表单 | `svelte-ui-plus/components/Form` |
| `FormItem` | 表单�?| `svelte-ui-plus/components/Form` |
| `Mention` | 提及 | `svelte-ui-plus/components/Mention` |

### 数据展示组件 (Data Display)

| 组件 | 说明 | 引用路径 |
|------|------|----------|
| `Tag` | 标签 | `svelte-ui-plus/components/Tag` |
| `Badge` | 徽章 | `svelte-ui-plus/components/Badge` |
| `Avatar` | 头像 | `svelte-ui-plus/components/Avatar` |
| `Card` | 卡片 | `svelte-ui-plus/components/Card` |
| `Empty` | 空状�?| `svelte-ui-plus/components/Empty` |
| `Progress` | 进度条（�?/ 圆） | `svelte-ui-plus/components/Progress` |
| `Skeleton` | 骨架�?| `svelte-ui-plus/components/Skeleton` |
| `Table` | 表格 | `svelte-ui-plus/components/Table` |
| `Pagination` | 分页 | `svelte-ui-plus/components/Pagination` |
| `Descriptions` | 描述列表 | `svelte-ui-plus/components/Descriptions` |
| `DescriptionsItem` | 描述列表�?| `svelte-ui-plus/components/Descriptions` |
| `Result` | 结果�?| `svelte-ui-plus/components/Result` |
| `Statistic` | 统计数�?| `svelte-ui-plus/components/Statistic` |
| `Countdown` | 倒计�?| `svelte-ui-plus/components/Countdown` |
| `Segmented` | 分段控制�?| `svelte-ui-plus/components/Segmented` |
| `Tree` | 树形控件 | `svelte-ui-plus/components/Tree` |
| `Calendar` | 日历 | `svelte-ui-plus/components/Calendar` |
| `Carousel` | 走马�?| `svelte-ui-plus/components/Carousel` |
| `CarouselItem` | 走马灯子�?| `svelte-ui-plus/components/Carousel` |
| `Timeline` | 时间�?| `svelte-ui-plus/components/Timeline` |
| `TimelineItem` | 时间线节�?| `svelte-ui-plus/components/Timeline` |
| `Watermark` | 水印 | `svelte-ui-plus/components/Watermark` |
| `Image` | 图片 | `svelte-ui-plus/components/Image` |
| `Collapse` | 折叠面板 | `svelte-ui-plus/components/Collapse` |
| `CollapseItem` | 折叠面板�?| `svelte-ui-plus/components/Collapse` |
| `VirtualList` | 虚拟列表 | `svelte-ui-plus/components/VirtualList` |
| `InfiniteScroll` | 无限滚动 | `svelte-ui-plus/components/InfiniteScroll` |

### 反馈组件 (Feedback)

| 组件 | 说明 | 引用路径 |
|------|------|----------|
| `Alert` | 警告 | `svelte-ui-plus/components/Alert` |
| `Dialog` | 对话�?| `svelte-ui-plus/components/Dialog` |
| `Drawer` | 抽屉 | `svelte-ui-plus/components/Drawer` |
| `Tooltip` | 文字提示 | `svelte-ui-plus/components/Tooltip` |
| `Popover` | 弹出�?| `svelte-ui-plus/components/Popover` |
| `Popconfirm` | 气泡确认�?| `svelte-ui-plus/components/Popconfirm` |
| `Message` | 消息提示（函数式�?| `svelte-ui-plus/components/Message` |
| `MessageBox` | 消息弹框 | `svelte-ui-plus/components/MessageBox` |
| `Notification` | 通知 | `svelte-ui-plus/components/Notification` |
| `Loading` | 加载 | `svelte-ui-plus/components/Loading` |
| `Tour` | 漫游式引�?| `svelte-ui-plus/components/Tour` |
| `TourStep` | 引导步骤 | `svelte-ui-plus/components/Tour` |
| `Overlay` | 遮罩�?| `svelte-ui-plus/components/Overlay` |
| `CollapseTransition` | 折叠过渡 | `svelte-ui-plus/components/CollapseTransition` |

### 导航组件 (Navigation)

| 组件 | 说明 | 引用路径 |
|------|------|----------|
| `Tabs` | 标签�?| `svelte-ui-plus/components/Tabs` |
| `Breadcrumb` | 面包�?| `svelte-ui-plus/components/Breadcrumb` |
| `BreadcrumbItem` | 面包屑项 | `svelte-ui-plus/components/Breadcrumb` |
| `Dropdown` | 下拉菜单 | `svelte-ui-plus/components/Dropdown` |
| `Menu` | 导航菜单 | `svelte-ui-plus/components/Menu` |
| `MenuItem` | 菜单�?| `svelte-ui-plus/components/Menu` |
| `MenuItemGroup` | 菜单分组 | `svelte-ui-plus/components/Menu` |
| `SubMenu` | 子菜�?| `svelte-ui-plus/components/Menu` |
| `PageHeader` | 页头 | `svelte-ui-plus/components/PageHeader` |
| `Steps` | 步骤�?| `svelte-ui-plus/components/Steps` |
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

## 组件 API

> 以下列出新增组件的核�?API，原有组�?API 见下方�?

### Menu 导航菜单

```svelte
<Menu bind:activeKey mode="vertical" collapse={false}>
  <MenuItem index="home">首页</MenuItem>
  <SubMenu index="settings">
    {#snippet title()}设置{/snippet}
    <MenuItem index="profile">个人设置</MenuItem>
    <MenuItem index="system">系统设置</MenuItem>
  </SubMenu>
  <MenuItemGroup title="其他">
    <MenuItem index="about">关于</MenuItem>
  </MenuItemGroup>
</Menu>
```

| 属�?| 类型 | 默认�?| 说明 |
|------|------|--------|------|
| activeKey | string | '' | 当前激活菜�?key |
| openKeys | string[] | [] | 展开的子菜单 |
| mode | 'horizontal' \| 'vertical' | 'vertical' | 菜单模式 |
| collapse | boolean | false | 是否折叠 |
| backgroundColor | string | '' | 背景�?|
| textColor | string | '' | 文字颜色 |
| activeTextColor | string | '' | 激活文字颜�?|

### Steps 步骤�?

```svelte
<Steps active={1} direction="horizontal">
  <Step stepIndex={0} title="完成" description="第一�? />
  <Step stepIndex={1} title="进行�? description="第二�? />
  <Step stepIndex={2} title="等待" description="第三�? />
</Steps>
```

### Affix 固钉

```svelte
<Affix offset={100} position="top" onchange={(fixed) => console.log(fixed)}>
  <Button>固定在顶�?/Button>
</Affix>
```

### Popconfirm 气泡确认�?

```svelte
<Popconfirm title="确认删除�? onconfirm={handleDelete}>
  <Button type="danger">删除</Button>
</Popconfirm>
```

### MessageBox 消息弹框（函数式�?

```ts
import { msgAlert, msgConfirm, msgPrompt } from 'svelte-ui-plus'

await msgAlert('提示消息', '标题')

try {
  await msgConfirm('确定要删除吗�?, '警告')
} catch { /* 取消 */ }

const { value } = await msgPrompt('请输入名�?, '输入')
```

### Notification 通知（函数式�?

```ts
import { notify } from 'svelte-ui-plus'

notify({ title: '通知', message: '内容', type: 'success' })
notify.success('操作成功')
notify.error({ title: '错误', message: '失败', duration: 0 })
```

### Tour 漫游式引�?

```svelte
<Tour bind:open bind:current onfinish={handleFinish}>
  <TourStep title="步骤一" description="欢迎使用" />
  <TourStep title="步骤�? description="功能介绍" />
</Tour>
```

### Descriptions 描述列表

```svelte
<Descriptions title="用户信息" column={3} border>
  <DescriptionsItem label="姓名">张三</DescriptionsItem>
  <DescriptionsItem label="电话">13800138000</DescriptionsItem>
</Descriptions>
```

### Watermark 水印

```svelte
<Watermark content="机密文档" fontSize={16} rotate={-22}>
  <!-- 内容 -->
</Watermark>
```

### VirtualList 虚拟列表

```svelte
<VirtualList items={bigList} height={400} itemHeight={40}>
  {#snippet item({ item, index })}
    <div>�?{index} �? {item.name}</div>
  {/snippet}
</VirtualList>
```

### InfiniteScroll 无限滚动

```svelte
<InfiniteScroll bind:loading noMore={noMore} onload={loadMore}>
  {#each list as item}
    <div>{item.name}</div>
  {/each}
</InfiniteScroll>
```

---

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

### Input 输入�?

```svelte
<Input
  bind:value={text}
  type="text | password | number | email | textarea"
  placeholder="请输�?
  clearable
  showPassword
  disabled={false}
  size="large | default | small"
  maxlength={100}
  showWordLimit
  prefixIcon="search"
  oninput={(val) => console.log(val)}
  onenter={() => console.log('enter')}
/>
```

### Select 选择�?

```svelte
<Select
  bind:value={selected}
  options={[
    { label: '选项一', value: 1 },
    { label: '选项�?, value: 2 },
    { label: '选项�?, value: 3, disabled: true },
  ]}
  placeholder="请选择"
  clearable
  multiple={false}
  onchange={(val) => console.log(val)}
/>
```

### Switch 开�?

```svelte
<Switch
  bind:value={checked}
  activeText="开"
  inactiveText="�?
  activeColor="#13ce66"
  inactiveColor="#ff4949"
/>
```

### Dialog 对话�?

```svelte
<Dialog bind:open={showDialog} title="提示" width="500px">
  <p>这是一段内�?/p>

  {#snippet footer()}
    <Button onclick={() => showDialog = false}>取消</Button>
    <Button type="primary" onclick={confirm}>确定</Button>
  {/snippet}
</Dialog>
```

### Drawer 抽屉

```svelte
<Drawer bind:open={showDrawer} title="抽屉" direction="rtl" size="400px">
  <p>抽屉内容</p>
</Drawer>
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
  onrowclick={(row, idx) => console.log(row)}
/>
```

### Tabs 标签�?

```svelte
<Tabs
  bind:activeKey
  items={[
    { key: 'tab1', label: '用户管理' },
    { key: 'tab2', label: '角色管理' },
    { key: 'tab3', label: '权限配置', disabled: true },
  ]}
  type="card"
>
  {#snippet children(activeKey)}
    {#if activeKey === 'tab1'}
      <p>用户管理内容</p>
    {:else if activeKey === 'tab2'}
      <p>角色管理内容</p>
    {/if}
  {/snippet}
</Tabs>
```

### Pagination 分页

```svelte
<Pagination
  total={100}
  bind:currentPage
  pageSize={10}
  showTotal
  showJumper
  onchange={(page) => loadData(page)}
/>
```

### Message 消息提示（函数式�?

```ts
import { message } from 'svelte-ui-plus'

message.success('操作成功')
message.error('操作失败')
message.warning('请注�?)
message.info('提示信息')

// 高级用法
const { close } = message.success('手动关闭', { duration: 0, showClose: true })
close() // 手动关闭
```

### Form 表单

```svelte
<Form labelWidth="100px" labelPosition="right">
  <FormItem label="用户�? required error={errors.username}>
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

通过 `<Icon name="xxx" />` 使用内置图标�?

| 名称 | 说明 | 名称 | 说明 |
|------|------|------|------|
| `close` | 关闭 | `check` | 勾�?|
| `circle-check` | 圆形勾�?| `circle-close` | 圆形关闭 |
| `info` | 信息 | `warning` | 警告 |
| `search` | 搜索 | `loading` | 加载�?|
| `arrow-up` | 向上箭头 | `arrow-down` | 向下箭头 |
| `arrow-left` | 向左箭头 | `arrow-right` | 向右箭头 |
| `eye` | 可见 | `eye-off` | 不可�?|
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
  --su-color-primary: #722ed1;       // 品牌�?
  --su-color-success: #52c41a;
  --su-color-warning: #faad14;
  --su-color-danger: #ff4d4f;
  --su-border-radius-base: 8px;      // 更圆的圆�?
  --su-font-size-base: 15px;         // 更大字号
}
```

## 技术架�?

```
svelte-ui-plus/
├── package.json          # 包配�?
├── index.ts              # 全量引用入口
├── README.md             # 组件库文�?
├── components/           # 组件目录�?8 个组件）
�?  ├── index.ts          # 组件统一导出
�?  ├── Affix/            # 固钉
�?  ├── Alert/            # 警告
�?  ├── Anchor/           # 锚点 + AnchorLink
�?  ├── Autocomplete/     # 自动补全
�?  ├── Avatar/           # 头像
�?  ├── Backtop/          # 回到顶部
�?  ├── Badge/            # 徽章
�?  ├── Breadcrumb/       # 面包�?+ BreadcrumbItem
�?  ├── Button/           # 按钮 + ButtonGroup
�?  ├── Calendar/         # 日历
�?  ├── Card/             # 卡片
�?  ├── Carousel/         # 走马�?+ CarouselItem
�?  ├── Cascader/         # 级联选择�?
�?  ├── Checkbox/         # 复选框 + CheckboxGroup
�?  ├── CheckTag/         # 可选标�?
�?  ├── Col/              # 列布局
�?  ├── Collapse/         # 折叠面板 + CollapseItem
�?  ├── CollapseTransition/ # 折叠过渡
�?  ├── ColorPicker/      # 颜色选择�?
�?  ├── ConfigProvider/   # 全局配置
�?  ├── Container/        # 布局容器 + Header/Footer/Main/Aside
�?  ├── Countdown/        # 倒计�?
�?  ├── DatePicker/       # 日期选择�?
�?  ├── Descriptions/     # 描述列表 + DescriptionsItem
�?  ├── Dialog/           # 对话�?
�?  ├── Divider/          # 分割�?
�?  ├── Drawer/           # 抽屉
�?  ├── Dropdown/         # 下拉菜单
�?  ├── Empty/            # 空状�?
�?  ├── Form/             # 表单 + FormItem
�?  ├── Icon/             # 图标
�?  ├── Image/            # 图片
�?  ├── InfiniteScroll/   # 无限滚动
�?  ├── Input/            # 输入�?
�?  ├── InputNumber/      # 数字输入
�?  ├── InputTag/         # 标签输入
�?  ├── Link/             # 链接
�?  ├── Loading/          # 加载
�?  ├── Mention/          # 提及
�?  ├── Menu/             # 菜单 + MenuItem/MenuItemGroup/SubMenu
�?  ├── Message/          # 消息提示
�?  ├── MessageBox/       # 消息弹框
�?  ├── Notification/     # 通知
�?  ├── Overlay/          # 遮罩�?
�?  ├── PageHeader/       # 页头
�?  ├── Pagination/       # 分页
�?  ├── Popconfirm/       # 气泡确认�?
�?  ├── Popover/          # 弹出�?
�?  ├── Progress/         # 进度�?
�?  ├── Radio/            # 单选框 + RadioGroup
�?  ├── Rate/             # 评分
�?  ├── Result/           # 结果�?
�?  ├── Row/              # 行布局
�?  ├── Scrollbar/        # 滚动�?
�?  ├── Segmented/        # 分段控制�?
�?  ├── Select/           # 选择�?
�?  ├── Skeleton/         # 骨架�?
�?  ├── Slider/           # 滑块
�?  ├── Space/            # 间距
�?  ├── Splitter/         # 分割面板 + SplitterPanel
�?  ├── Statistic/        # 统计数�?
�?  ├── Steps/            # 步骤�?+ Step
�?  ├── Switch/           # 开�?
�?  ├── Table/            # 表格
�?  ├── Tabs/             # 标签�?
�?  ├── Tag/              # 标签
�?  ├── Text/             # 文本
�?  ├── Timeline/         # 时间�?+ TimelineItem
�?  ├── TimePicker/       # 时间选择�?
�?  ├── TimeSelect/       # 时间选择
�?  ├── Tooltip/          # 文字提示
�?  ├── Tour/             # 漫游引导 + TourStep
�?  ├── Transfer/         # 穿梭�?
�?  ├── Tree/             # 树形控件
�?  ├── TreeSelect/       # 树选择�?
�?  ├── Upload/           # 上传
�?  ├── VirtualList/      # 虚拟列表
�?  └── Watermark/        # 水印
├── styles/
�?  ├── index.scss        # 全局样式入口
�?  └── var.scss          # CSS 变量定义
└── utils/
    ├── types.ts          # 公共类型
    ├── bem.ts            # BEM 命名工具
    └── icons.ts          # 内置图标数据
```

### 设计思想

1. **组件丰富**：组�?API 设计简洁、BEM 命名规范、主题系统完�?
2. **Svelte 5 原生**：使�?Runes 语法，支�?`$bindable` 双向绑定，使�?Snippet 替代 Slot
3. **样式内聚**：每�?`.svelte` 文件内含 scoped 样式，无需单独引入 CSS
4. **TypeScript 优先**：所�?Props 定义�?TypeScript 接口，IDE 智能提示友好
5. **轻量无依�?*：仅依赖 `svelte` 核心，无第三方运行时依赖

## 完整 API 参�?

所�?78+ 组件的完�?Props 文档�?[API.md](./API.md)�?

## 在线展示

运行 `npm run build:docs` 生成独立展示�?`docs/index.html`，可直接部署�?GitHub Pages�?
