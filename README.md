# svelte-ui-plus

A comprehensive UI component library built on **Svelte 5** (Runes), providing 78+ components for the Svelte ecosystem.

[中文文档](./README.zh-CN.md)

## Features

- Built on **Svelte 5 Runes** syntax (`$state`, `$props`, `$derived`, `$effect`, `$bindable`)
- **78+ components** covering Basic, Form, Data Display, Feedback, Navigation, and Other categories
- **CSS variable theming** system for easy theme customization
- **BEM naming convention** (`su-*` prefix) for style isolation
- Supports both **full import** and **tree-shakable on-demand import**
- Full **TypeScript** support
- Each component includes scoped styles — no extra style imports needed
- Built-in **20+ SVG icons**

## Installation

```bash
npm install svelte-ui-plus
```

## CDN Usage

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-ui-plus/dist/styles.css" />
<script src="https://cdn.jsdelivr.net/npm/svelte-ui-plus/dist/svelte-ui-plus.iife.js"></script>
```

## Quick Start

### Full Import

```ts
// Import global styles (CSS variables + base reset) in main.ts
import 'svelte-ui-plus/styles/index.scss'
```

```svelte
<script lang="ts">
  import { Button, Input, Dialog, message } from 'svelte-ui-plus'
</script>

<Button type="primary" onclick={() => message.success('Hello!')}>
  Click Me
</Button>
```

### On-Demand Import

```svelte
<script lang="ts">
  // Import only what you need
  import { Button } from 'svelte-ui-plus/components/Button'
  // Import only CSS variables (without global reset)
  import 'svelte-ui-plus/styles/var.scss'
</script>
```

## Component List

### Basic Components

| Component | Description | Import Path |
|-----------|-------------|-------------|
| `Icon` | SVG icons | `svelte-ui-plus/components/Icon` |
| `Button` | Button | `svelte-ui-plus/components/Button` |
| `ButtonGroup` | Button group | `svelte-ui-plus/components/Button` |
| `Link` | Link | `svelte-ui-plus/components/Link` |
| `Text` | Text | `svelte-ui-plus/components/Text` |
| `Scrollbar` | Scrollbar | `svelte-ui-plus/components/Scrollbar` |
| `Divider` | Divider | `svelte-ui-plus/components/Divider` |
| `Space` | Space | `svelte-ui-plus/components/Space` |
| `Row` | Row layout | `svelte-ui-plus/components/Row` |
| `Col` | Column layout | `svelte-ui-plus/components/Col` |
| `Container` | Layout container | `svelte-ui-plus/components/Container` |
| `Header` | Header container | `svelte-ui-plus/components/Container` |
| `Footer` | Footer container | `svelte-ui-plus/components/Container` |
| `Main` | Main content container | `svelte-ui-plus/components/Container` |
| `Aside` | Sidebar container | `svelte-ui-plus/components/Container` |
| `CheckTag` | Selectable tag | `svelte-ui-plus/components/CheckTag` |
| `ConfigProvider` | Global configuration | `svelte-ui-plus/components/ConfigProvider` |

### Form Components

| Component | Description | Import Path |
|-----------|-------------|-------------|
| `Input` | Input (includes textarea) | `svelte-ui-plus/components/Input` |
| `InputNumber` | Number input | `svelte-ui-plus/components/InputNumber` |
| `InputTag` | Tag input | `svelte-ui-plus/components/InputTag` |
| `Autocomplete` | Autocomplete | `svelte-ui-plus/components/Autocomplete` |
| `Select` | Select | `svelte-ui-plus/components/Select` |
| `TreeSelect` | Tree select | `svelte-ui-plus/components/TreeSelect` |
| `Cascader` | Cascader | `svelte-ui-plus/components/Cascader` |
| `Switch` | Switch | `svelte-ui-plus/components/Switch` |
| `Slider` | Slider | `svelte-ui-plus/components/Slider` |
| `Checkbox` | Checkbox | `svelte-ui-plus/components/Checkbox` |
| `CheckboxGroup` | Checkbox group | `svelte-ui-plus/components/Checkbox` |
| `Radio` | Radio | `svelte-ui-plus/components/Radio` |
| `RadioGroup` | Radio group | `svelte-ui-plus/components/Radio` |
| `Rate` | Rating | `svelte-ui-plus/components/Rate` |
| `ColorPicker` | Color picker | `svelte-ui-plus/components/ColorPicker` |
| `DatePicker` | Date picker | `svelte-ui-plus/components/DatePicker` |
| `TimePicker` | Time picker | `svelte-ui-plus/components/TimePicker` |
| `TimeSelect` | Time select | `svelte-ui-plus/components/TimeSelect` |
| `Transfer` | Transfer | `svelte-ui-plus/components/Transfer` |
| `Upload` | Upload | `svelte-ui-plus/components/Upload` |
| `Form` | Form | `svelte-ui-plus/components/Form` |
| `FormItem` | Form item | `svelte-ui-plus/components/Form` |
| `Mention` | Mention | `svelte-ui-plus/components/Mention` |

### Data Display Components

| Component | Description | Import Path |
|-----------|-------------|-------------|
| `Tag` | Tag | `svelte-ui-plus/components/Tag` |
| `Badge` | Badge | `svelte-ui-plus/components/Badge` |
| `Avatar` | Avatar | `svelte-ui-plus/components/Avatar` |
| `Card` | Card | `svelte-ui-plus/components/Card` |
| `Empty` | Empty state | `svelte-ui-plus/components/Empty` |
| `Progress` | Progress bar (line / circle) | `svelte-ui-plus/components/Progress` |
| `Skeleton` | Skeleton | `svelte-ui-plus/components/Skeleton` |
| `Table` | Table | `svelte-ui-plus/components/Table` |
| `Pagination` | Pagination | `svelte-ui-plus/components/Pagination` |
| `Descriptions` | Descriptions list | `svelte-ui-plus/components/Descriptions` |
| `DescriptionsItem` | Descriptions item | `svelte-ui-plus/components/Descriptions` |
| `Result` | Result | `svelte-ui-plus/components/Result` |
| `Statistic` | Statistic | `svelte-ui-plus/components/Statistic` |
| `Countdown` | Countdown | `svelte-ui-plus/components/Countdown` |
| `Segmented` | Segmented control | `svelte-ui-plus/components/Segmented` |
| `Tree` | Tree | `svelte-ui-plus/components/Tree` |
| `Calendar` | Calendar | `svelte-ui-plus/components/Calendar` |
| `Carousel` | Carousel | `svelte-ui-plus/components/Carousel` |
| `CarouselItem` | Carousel item | `svelte-ui-plus/components/Carousel` |
| `Timeline` | Timeline | `svelte-ui-plus/components/Timeline` |
| `TimelineItem` | Timeline item | `svelte-ui-plus/components/Timeline` |
| `Watermark` | Watermark | `svelte-ui-plus/components/Watermark` |
| `Image` | Image | `svelte-ui-plus/components/Image` |
| `Collapse` | Collapse | `svelte-ui-plus/components/Collapse` |
| `CollapseItem` | Collapse item | `svelte-ui-plus/components/Collapse` |
| `VirtualList` | Virtual list | `svelte-ui-plus/components/VirtualList` |
| `InfiniteScroll` | Infinite scroll | `svelte-ui-plus/components/InfiniteScroll` |

### Feedback Components

| Component | Description | Import Path |
|-----------|-------------|-------------|
| `Alert` | Alert | `svelte-ui-plus/components/Alert` |
| `Dialog` | Dialog | `svelte-ui-plus/components/Dialog` |
| `Drawer` | Drawer | `svelte-ui-plus/components/Drawer` |
| `Tooltip` | Tooltip | `svelte-ui-plus/components/Tooltip` |
| `Popover` | Popover | `svelte-ui-plus/components/Popover` |
| `Popconfirm` | Popconfirm | `svelte-ui-plus/components/Popconfirm` |
| `Message` | Message (imperative) | `svelte-ui-plus/components/Message` |
| `MessageBox` | Message box | `svelte-ui-plus/components/MessageBox` |
| `Notification` | Notification | `svelte-ui-plus/components/Notification` |
| `Loading` | Loading | `svelte-ui-plus/components/Loading` |
| `Tour` | Tour guide | `svelte-ui-plus/components/Tour` |
| `TourStep` | Tour step | `svelte-ui-plus/components/Tour` |
| `Overlay` | Overlay | `svelte-ui-plus/components/Overlay` |
| `CollapseTransition` | Collapse transition | `svelte-ui-plus/components/CollapseTransition` |

### Navigation Components

| Component | Description | Import Path |
|-----------|-------------|-------------|
| `Tabs` | Tabs | `svelte-ui-plus/components/Tabs` |
| `Breadcrumb` | Breadcrumb | `svelte-ui-plus/components/Breadcrumb` |
| `BreadcrumbItem` | Breadcrumb item | `svelte-ui-plus/components/Breadcrumb` |
| `Dropdown` | Dropdown | `svelte-ui-plus/components/Dropdown` |
| `Menu` | Menu | `svelte-ui-plus/components/Menu` |
| `MenuItem` | Menu item | `svelte-ui-plus/components/Menu` |
| `MenuItemGroup` | Menu item group | `svelte-ui-plus/components/Menu` |
| `SubMenu` | Sub menu | `svelte-ui-plus/components/Menu` |
| `PageHeader` | Page header | `svelte-ui-plus/components/PageHeader` |
| `Steps` | Steps | `svelte-ui-plus/components/Steps` |
| `Step` | Step | `svelte-ui-plus/components/Steps` |
| `Affix` | Affix | `svelte-ui-plus/components/Affix` |
| `Backtop` | Back to top | `svelte-ui-plus/components/Backtop` |
| `Anchor` | Anchor | `svelte-ui-plus/components/Anchor` |
| `AnchorLink` | Anchor link | `svelte-ui-plus/components/Anchor` |

### Other Components

| Component | Description | Import Path |
|-----------|-------------|-------------|
| `Splitter` | Splitter | `svelte-ui-plus/components/Splitter` |
| `SplitterPanel` | Splitter panel | `svelte-ui-plus/components/Splitter` |

## Usage Examples

### Button

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
  Button Text
</Button>
```

### Input

```svelte
<Input
  bind:value={text}
  type="text | password | number | email | textarea"
  placeholder="Please enter"
  clearable
  showPassword
  disabled={false}
  size="large | default | small"
  maxlength={100}
  showWordLimit
  prefixIcon="search"
/>
```

### Select

```svelte
<Select
  bind:value={selected}
  options={[
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3, disabled: true },
  ]}
  placeholder="Please select"
  clearable
  multiple={false}
/>
```

### Dialog

```svelte
<Dialog bind:open={showDialog} title="Notice" width="500px">
  <p>Dialog content here</p>
  {#snippet footer()}
    <Button onclick={() => showDialog = false}>Cancel</Button>
    <Button type="primary" onclick={confirm}>OK</Button>
  {/snippet}
</Dialog>
```

### Table

```svelte
<Table
  data={tableData}
  columns={[
    { key: 'name', title: 'Name', width: '120px' },
    { key: 'age', title: 'Age', width: '80px', align: 'center' },
    { key: 'email', title: 'Email' },
  ]}
  stripe
  border
/>
```

### Message (Imperative)

```ts
import { message } from 'svelte-ui-plus'

message.success('Operation successful')
message.error('Operation failed')
message.warning('Warning')
message.info('Info')

// Advanced
const { close } = message.success('Manual close', { duration: 0, showClose: true })
close()
```

### Form

```svelte
<Form labelWidth="100px" labelPosition="right">
  <FormItem label="Username" required error={errors.username}>
    <Input bind:value={form.username} />
  </FormItem>
  <FormItem label="Password" required>
    <Input bind:value={form.password} type="password" showPassword />
  </FormItem>
  <FormItem>
    <Button type="primary" onclick={submit}>Submit</Button>
  </FormItem>
</Form>
```

## Built-in Icons

Use icons via `<Icon name="xxx" />`:

| Name | Description | Name | Description |
|------|-------------|------|-------------|
| `close` | Close | `check` | Check |
| `circle-check` | Circle check | `circle-close` | Circle close |
| `info` | Info | `warning` | Warning |
| `search` | Search | `loading` | Loading | 
| `arrow-up` | Arrow up | `arrow-down` | Arrow down |
| `arrow-left` | Arrow left | `arrow-right` | Arrow right |
| `eye` | Visible | `eye-off` | Hidden |
| `plus` | Plus | `minus` | Minus |
| `delete` | Delete | `edit` | Edit |
| `more` | More | `refresh` | Refresh |
| `setting` | Settings | `fullscreen` | Fullscreen |

```svelte
<Icon name="search" size={20} color="var(--su-color-primary)" />
```

## Theme Customization

Override CSS variables to customize the theme:

```scss
:root {
  --su-color-primary: #722ed1;
  --su-color-success: #52c41a;
  --su-color-warning: #faad14;
  --su-color-danger: #ff4d4f;
  --su-border-radius-base: 8px;
  --su-font-size-base: 15px;
}
```

## Compatibility

| Format | File | Usage |
|--------|------|-------|
| ESM | `dist/svelte-ui-plus.mjs` | `import` syntax |
| CJS | `dist/svelte-ui-plus.cjs` | `require()` syntax |
| IIFE | `dist/svelte-ui-plus.iife.js` | CDN / `<script>` tag |
| CSS | `dist/styles.css` | Global styles |
| Svelte Source | `index.ts` | Direct Svelte project import |

## License

MIT
