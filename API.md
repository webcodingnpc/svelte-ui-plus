# SvelteUI 组件 API 参考手册

> 本文档覆盖所有 78+ 组件的完整 Props API。类型说明：`ComponentSize = 'large' | 'default' | 'small'`，`ComponentType = 'primary' | 'success' | 'warning' | 'danger' | 'info'`。

---

## 基础组件 (Basic)

### Icon 图标

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | — | 图标名称（内置 293 个图标） |
| size | number \| string | 16 | 图标尺寸（px） |
| color | string | '' | 图标颜色 |
| class | string | '' | 自定义 class |

```svelte
<Icon name="search" size={20} color="var(--su-color-primary)" />
```

### Button 按钮

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | ComponentType \| 'default' | 'default' | 按钮类型 |
| size | ComponentSize | 'default' | 按钮尺寸 |
| plain | boolean | false | 朴素按钮 |
| round | boolean | false | 圆角按钮 |
| circle | boolean | false | 圆形按钮 |
| disabled | boolean | false | 禁用 |
| loading | boolean | false | 加载状态 |
| icon | string | '' | 图标名称 |
| onclick | (e: MouseEvent) => void | — | 点击事件 |
| class | string | '' | 自定义 class |

### ButtonGroup 按钮组

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | ComponentSize | — | 统一子按钮尺寸 |
| children | Snippet | — | 按钮插槽 |
| class | string | '' | 自定义 class |

### Link 链接

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | ComponentType \| 'default' | 'default' | 链接类型 |
| underline | boolean | true | 是否下划线 |
| disabled | boolean | false | 禁用 |
| href | string | '' | 跳转地址 |
| target | string | '_self' | 打开方式 |
| icon | string | '' | 图标名称 |
| onclick | (e: MouseEvent) => void | — | 点击事件 |
| class | string | '' | 自定义 class |

### Text 文本

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | ComponentType \| 'default' | 'default' | 文本类型 |
| size | ComponentSize \| 'large' | 'default' | 文字尺寸 |
| tag | string | 'span' | 渲染标签 |
| truncated | boolean | false | 是否截断 |
| lineClamp | number | — | 多行截断行数 |
| class | string | '' | 自定义 class |

### Scrollbar 滚动条

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| height | string | '' | 容器高度 |
| maxHeight | string | '' | 最大高度 |
| native | boolean | false | 使用原生滚动条 |
| wrapClass | string | '' | 包裹层 class |
| viewClass | string | '' | 内容层 class |
| always | boolean | false | 始终显示滚动条 |
| class | string | '' | 自定义 class |

### Divider 分割线

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 方向 |
| contentPosition | 'left' \| 'center' \| 'right' | 'center' | 文字位置 |
| borderStyle | 'solid' \| 'dashed' \| 'dotted' | 'solid' | 边框样式 |
| class | string | '' | 自定义 class |

```svelte
<Divider contentPosition="left">标题</Divider>
<Divider direction="vertical" />
```

### Space 间距

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 排列方向 |
| size | ComponentSize \| number | 'default' | 间距大小 |
| wrap | boolean | false | 是否换行 |
| align | 'start' \| 'center' \| 'end' \| 'baseline' | 'center' | 对齐方式 |
| class | string | '' | 自定义 class |

### CheckTag 可选标签

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| checked | boolean | false | 是否选中（$bindable） |
| type | ComponentType | 'primary' | 类型 |
| onchange | (checked: boolean) => void | — | 变化回调 |
| class | string | '' | 自定义 class |

### ConfigProvider 全局配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | ComponentSize | 'default' | 全局组件尺寸 |
| zIndex | number | 2000 | 全局 z-index |
| namespace | string | 'su' | BEM 命名空间 |
| class | string | '' | 自定义 class |

---

## 布局组件 (Layout)

### Row 行

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| gutter | number | 0 | 列间距（px） |
| justify | 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly' | 'start' | 水平排列方式 |
| align | 'top' \| 'middle' \| 'bottom' | 'top' | 垂直对齐方式 |
| class | string | '' | 自定义 class |

### Col 列

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| span | number | 24 | 占据列数（总 24 列） |
| offset | number | 0 | 左侧偏移列数 |
| push | number | 0 | 向右移动列数 |
| pull | number | 0 | 向左移动列数 |
| class | string | '' | 自定义 class |

```svelte
<Row gutter={20}>
  <Col span={8}><div>col-8</div></Col>
  <Col span={8}><div>col-8</div></Col>
  <Col span={8}><div>col-8</div></Col>
</Row>
```

### Container / Header / Footer / Main / Aside

| 组件 | 属性 | 类型 | 默认值 | 说明 |
|------|------|------|--------|------|
| Container | direction | 'horizontal' \| 'vertical' | auto | 排列方向 |
| Header | height | string | '60px' | 顶部高度 |
| Footer | height | string | '60px' | 底部高度 |
| Main | — | — | — | 主内容区（无额外属性） |
| Aside | width | string | '300px' | 侧栏宽度 |

```svelte
<Container>
  <Header height="80px">Header</Header>
  <Container>
    <Aside width="240px">Sidebar</Aside>
    <Main>Content</Main>
  </Container>
  <Footer>Footer</Footer>
</Container>
```

---

## 表单组件 (Form)

### Input 输入框

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string | '' | 输入值（$bindable） |
| type | 'text' \| 'password' \| 'number' \| 'email' \| 'textarea' | 'text' | 类型 |
| placeholder | string | '' | 占位文字 |
| clearable | boolean | false | 可清空 |
| showPassword | boolean | false | 显示密码切换 |
| disabled | boolean | false | 禁用 |
| readonly | boolean | false | 只读 |
| size | ComponentSize | 'default' | 尺寸 |
| maxlength | number | — | 最大长度 |
| showWordLimit | boolean | false | 显示字数统计 |
| prefixIcon | string | '' | 前置图标 |
| suffixIcon | string | '' | 后置图标 |
| rows | number | 3 | textarea 行数 |
| oninput | (val: string) => void | — | 输入事件 |
| onenter | () => void | — | 回车事件 |
| onfocus | () => void | — | 聚焦事件 |
| onblur | () => void | — | 失焦事件 |
| class | string | '' | 自定义 class |

### InputNumber 数字输入框

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | number | undefined | 当前值（$bindable） |
| min | number | -Infinity | 最小值 |
| max | number | Infinity | 最大值 |
| step | number | 1 | 步长 |
| stepStrictly | boolean | false | 严格步数 |
| precision | number | — | 精度（小数位） |
| size | ComponentSize | 'default' | 尺寸 |
| disabled | boolean | false | 禁用 |
| controls | boolean | true | 显示控制按钮 |
| controlsPosition | '' \| 'right' | '' | 按钮位置 |
| placeholder | string | '' | 占位文字 |
| readonly | boolean | false | 只读 |
| oninput | (val) => void | — | 输入事件 |
| onchange | (val) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### InputTag 标签输入

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string[] | [] | 标签数组（$bindable） |
| size | ComponentSize | 'default' | 尺寸 |
| placeholder | string | '' | 占位文字 |
| disabled | boolean | false | 禁用 |
| readonly | boolean | false | 只读 |
| max | number | — | 最大标签数 |
| trigger | 'space' \| 'enter' | 'enter' | 添加触发方式 |
| closable | boolean | true | 标签可关闭 |
| clearable | boolean | false | 一键清空 |
| oninput | (val) => void | — | 输入事件 |
| onchange | (val) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### Autocomplete 自动补全

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string | '' | 当前值（$bindable） |
| size | ComponentSize | 'default' | 尺寸 |
| placeholder | string | '' | 占位文字 |
| disabled | boolean | false | 禁用 |
| clearable | boolean | false | 可清空 |
| fetchSuggestions | (query: string) => Promise\<string[]\> \| string[] | — | 获取建议列表 |
| triggerOnFocus | boolean | true | 聚焦时触发 |
| debounce | number | 300 | 防抖延时（ms） |
| oninput | (val) => void | — | 输入事件 |
| onselect | (val) => void | — | 选择事件 |
| class | string | '' | 自定义 class |

### Select 选择器

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | any | '' | 当前值（$bindable） |
| options | { label, value, disabled? }[] | [] | 选项列表 |
| placeholder | string | '请选择' | 占位文字 |
| clearable | boolean | false | 可清空 |
| multiple | boolean | false | 多选 |
| disabled | boolean | false | 禁用 |
| size | ComponentSize | 'default' | 尺寸 |
| filterable | boolean | false | 可搜索 |
| onchange | (val) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### TreeSelect 树选择器

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string \| string[] | '' | 选中值（$bindable） |
| data | TreeNode[] | [] | 树形数据 |
| multiple | boolean | false | 多选 |
| placeholder | string | '请选择' | 占位文字 |
| disabled | boolean | false | 禁用 |
| clearable | boolean | false | 可清空 |
| filterable | boolean | false | 可搜索 |
| onchange | (value) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### Cascader 级联选择器

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | (string \| number)[] | [] | 选中值路径（$bindable） |
| options | CascaderOption[] | [] | 选项数据 |
| size | ComponentSize | 'default' | 尺寸 |
| placeholder | string | '请选择' | 占位文字 |
| disabled | boolean | false | 禁用 |
| clearable | boolean | true | 可清空 |
| showAllLevels | boolean | true | 显示完整路径 |
| separator | string | ' / ' | 分隔符 |
| filterable | boolean | false | 可搜索 |
| props | { expandTrigger?, multiple?, checkStrictly? } | {} | 配置项 |
| oninput | (val) => void | — | 输入事件 |
| onchange | (val) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### Switch 开关

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | boolean | false | 当前值（$bindable） |
| activeText | string | '' | 开启文字 |
| inactiveText | string | '' | 关闭文字 |
| activeColor | string | '' | 开启颜色 |
| inactiveColor | string | '' | 关闭颜色 |
| disabled | boolean | false | 禁用 |
| size | ComponentSize | 'default' | 尺寸 |
| onchange | (val: boolean) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### Slider 滑块

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | number | 0 | 当前值（$bindable） |
| min | number | 0 | 最小值 |
| max | number | 100 | 最大值 |
| step | number | 1 | 步长 |
| disabled | boolean | false | 禁用 |
| showInput | boolean | false | 显示输入框 |
| showInputControls | boolean | true | 输入框显示控制按钮 |
| size | ComponentSize | 'default' | 尺寸 |
| showStops | boolean | false | 显示间隔点 |
| showTooltip | boolean | true | 显示提示 |
| range | boolean | false | 范围选择 |
| vertical | boolean | false | 纵向模式 |
| height | string | '200px' | 纵向模式高度 |
| marks | Record\<number, string\> | — | 标记点 |
| oninput | (val) => void | — | 输入事件 |
| onchange | (val) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### Checkbox 复选框

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| checked | boolean | false | 是否选中（$bindable） |
| label | string | '' | 标签文字 |
| disabled | boolean | false | 禁用 |
| size | ComponentSize | 'default' | 尺寸 |
| indeterminate | boolean | false | 半选状态 |
| onchange | (checked: boolean) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### CheckboxGroup 复选框组

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | (string \| number)[] | [] | 选中值数组（$bindable） |
| disabled | boolean | false | 统一禁用 |
| size | ComponentSize | 'default' | 统一尺寸 |
| onchange | (value) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### Radio 单选框

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string \| number \| boolean | '' | 当前值（$bindable） |
| label | string \| number \| boolean | '' | 选项值 |
| text | string | '' | 显示文字 |
| disabled | boolean | false | 禁用 |
| size | ComponentSize | 'default' | 尺寸 |
| onchange | (value) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### RadioGroup 单选框组

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string \| number \| boolean | '' | 当前选中值（$bindable） |
| disabled | boolean | false | 统一禁用 |
| size | ComponentSize | 'default' | 统一尺寸 |
| onchange | (value) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### Rate 评分

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | number | 0 | 当前分值（$bindable） |
| max | number | 5 | 最大分值 |
| size | ComponentSize | 'default' | 尺寸 |
| disabled | boolean | false | 禁用 |
| allowHalf | boolean | false | 允许半选 |
| lowThreshold | number | 2 | 低 → 中阈值 |
| highThreshold | number | 4 | 中 → 高阈值 |
| colors | string[] \| Record\<number, string\> | ['#f7ba2a','#f7ba2a','#f7ba2a'] | 颜色数组 |
| voidColor | string | '#c6d1de' | 未选中颜色 |
| showText | boolean | false | 显示辅助文字 |
| showScore | boolean | false | 显示分数 |
| texts | string[] | ['极差','失望','一般','满意','惊喜'] | 辅助文字 |
| scoreTemplate | string | '{value}' | 分数模板 |
| clearable | boolean | false | 可清空 |
| oninput | (val) => void | — | 输入事件 |
| onchange | (val) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### ColorPicker 颜色选择器

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string | '#409eff' | 颜色值（$bindable） |
| size | ComponentSize | 'default' | 尺寸 |
| disabled | boolean | false | 禁用 |
| showAlpha | boolean | false | 显示透明度 |
| colorFormat | 'hex' \| 'rgb' \| 'hsl' | 'hex' | 颜色格式 |
| predefine | string[] | [] | 预定义颜色 |
| oninput | (val) => void | — | 输入事件 |
| onchange | (val) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### DatePicker 日期选择器

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string | '' | 日期值（$bindable） |
| type | 'date' \| 'datetime' \| 'week' \| 'month' \| 'year' \| 'daterange' | 'date' | 类型 |
| size | ComponentSize | 'default' | 尺寸 |
| placeholder | string | '选择日期' | 占位文字 |
| startPlaceholder | string | '开始日期' | 范围模式开始占位 |
| endPlaceholder | string | '结束日期' | 范围模式结束占位 |
| format | string | — | 日期格式 |
| disabled | boolean | false | 禁用 |
| clearable | boolean | true | 可清空 |
| readonly | boolean | false | 只读 |
| rangeSeparator | string | '至' | 范围分隔符 |
| oninput | (val) => void | — | 输入事件 |
| onchange | (val) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### TimePicker 时间选择器

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string | '' | 时间值（$bindable） |
| size | ComponentSize | 'default' | 尺寸 |
| placeholder | string | '选择时间' | 占位文字 |
| disabled | boolean | false | 禁用 |
| clearable | boolean | true | 可清空 |
| readonly | boolean | false | 只读 |
| isRange | boolean | false | 范围选择 |
| rangeSeparator | string | '至' | 范围分隔符 |
| startPlaceholder | string | '开始时间' | 范围开始占位 |
| endPlaceholder | string | '结束时间' | 范围结束占位 |
| oninput | (val) => void | — | 输入事件 |
| onchange | (val) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### TimeSelect 时间选择

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string | '' | 时间值（$bindable） |
| size | ComponentSize | 'default' | 尺寸 |
| placeholder | string | '选择时间' | 占位文字 |
| disabled | boolean | false | 禁用 |
| clearable | boolean | true | 可清空 |
| start | string | '09:00' | 开始时间 |
| end | string | '18:00' | 结束时间 |
| step | string | '00:30' | 时间步长 |
| oninput | (val) => void | — | 输入事件 |
| onchange | (val) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### Transfer 穿梭框

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | TransferItem[] | [] | 数据源 |
| value | (string \| number)[] | [] | 右侧列表值（$bindable） |
| filterable | boolean | false | 可搜索 |
| filterPlaceholder | string | '请输入搜索内容' | 搜索占位 |
| titles | [string, string] | ['列表 1', '列表 2'] | 列表标题 |
| buttonTexts | [string, string] | ['', ''] | 按钮文字 |
| onchange | (val, direction, movedKeys) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### Upload 上传

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| action | string | '' | 上传地址 |
| headers | Record\<string, string\> | — | 请求头 |
| multiple | boolean | false | 多文件上传 |
| data | Record\<string, string\> | — | 额外参数 |
| name | string | 'file' | 文件字段名 |
| withCredentials | boolean | false | 携带 cookie |
| accept | string | '' | 接受文件类型 |
| limit | number | — | 最大上传数 |
| disabled | boolean | false | 禁用 |
| drag | boolean | false | 拖拽上传 |
| listType | 'text' \| 'picture' \| 'picture-card' | 'text' | 文件列表类型 |
| autoUpload | boolean | true | 自动上传 |
| fileList | UploadFile[] | [] | 文件列表（$bindable） |
| showFileList | boolean | true | 显示文件列表 |
| beforeUpload | (file: File) => boolean \| Promise | — | 上传前钩子 |
| onsuccess | (response, file) => void | — | 成功回调 |
| onerror | (error, file) => void | — | 失败回调 |
| onchange | (file) => void | — | 文件变化回调 |
| onremove | (file) => void | — | 移除回调 |
| onexceed | (files) => void | — | 超出限制回调 |
| tip | Snippet | — | 提示文字插槽 |
| class | string | '' | 自定义 class |

### Form 表单

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| labelWidth | string | '' | 标签宽度 |
| labelPosition | 'left' \| 'right' \| 'top' | 'right' | 标签对齐方式 |
| size | ComponentSize | 'default' | 统一尺寸 |
| disabled | boolean | false | 统一禁用 |
| children | Snippet | — | 表单内容 |
| class | string | '' | 自定义 class |

### FormItem 表单项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | string | '' | 标签文字 |
| required | boolean | false | 必填标识 |
| error | string | '' | 错误提示 |
| children | Snippet | — | 表单控件插槽 |
| class | string | '' | 自定义 class |

### Mention 提及

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string | '' | 输入值（$bindable） |
| size | ComponentSize | 'default' | 尺寸 |
| placeholder | string | '' | 占位文字 |
| disabled | boolean | false | 禁用 |
| prefix | string | '@' | 触发前缀 |
| options | MentionOption[] | [] | 候选列表 |
| loading | boolean | false | 加载状态 |
| oninput | (val) => void | — | 输入事件 |
| onchange | (val) => void | — | 变化事件 |
| onsearch | (query) => void | — | 搜索事件 |
| onselect | (option) => void | — | 选择事件 |
| class | string | '' | 自定义 class |

---

## 数据展示组件 (Data Display)

### Tag 标签

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | ComponentType \| 'default' | 'default' | 类型 |
| size | ComponentSize | 'default' | 尺寸 |
| closable | boolean | false | 可关闭 |
| effect | 'dark' \| 'light' \| 'plain' | 'light' | 主题 |
| round | boolean | false | 圆角 |
| onclose | () => void | — | 关闭事件 |
| class | string | '' | 自定义 class |

### Badge 徽章

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string \| number | '' | 显示值 |
| max | number | 99 | 最大值 |
| isDot | boolean | false | 小圆点模式 |
| hidden | boolean | false | 隐藏徽章 |
| type | ComponentType | 'danger' | 类型 |
| class | string | '' | 自定义 class |

### Avatar 头像

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | string | — | 图片地址 |
| alt | string | '' | 替代文字 |
| size | number \| 'large' \| 'default' \| 'small' | 'default' | 尺寸 |
| shape | 'circle' \| 'square' | 'circle' | 形状 |
| icon | string | — | 图标名称 |
| onerror | () => void | — | 加载失败回调 |
| class | string | '' | 自定义 class |

### Card 卡片

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| header | Snippet | — | 标题插槽 |
| shadow | 'always' \| 'hover' \| 'never' | 'always' | 阴影模式 |
| bodyStyle | string | '' | 内容区样式 |
| class | string | '' | 自定义 class |

### Empty 空状态

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| description | string | '暂无数据' | 描述文字 |
| imageSrc | string | — | 自定义图片 |
| imageSize | number | 160 | 图片尺寸 |
| image | Snippet | — | 图片插槽 |
| class | string | '' | 自定义 class |

### Progress 进度条

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| percentage | number | 0 | 百分比（0-100） |
| type | 'line' \| 'circle' \| 'dashboard' | 'line' | 类型 |
| strokeWidth | number | 6 | 进度条宽度 |
| status | 'success' \| 'warning' \| 'danger' | — | 状态 |
| showText | boolean | true | 显示百分比 |
| color | string | — | 自定义颜色 |
| width | number | 126 | 环形进度条直径 |
| class | string | '' | 自定义 class |

### Skeleton 骨架屏

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| loading | boolean | true | 是否显示骨架 |
| rows | number | 3 | 段落行数 |
| animated | boolean | true | 动画效果 |
| avatar | boolean | false | 显示头像 |
| class | string | '' | 自定义 class |

### Table 表格

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | any[] | [] | 表格数据 |
| columns | TableColumn[] | [] | 列定义 |
| stripe | boolean | false | 斑马纹 |
| border | boolean | false | 边框 |
| size | ComponentSize | 'default' | 尺寸 |
| emptyText | string | '暂无数据' | 空数据文字 |
| height | string | — | 固定高度 |
| onrowclick | (row, index) => void | — | 行点击事件 |
| class | string | '' | 自定义 class |

**TableColumn：**

| 属性 | 类型 | 说明 |
|------|------|------|
| key | string | 数据字段名 |
| title | string | 列标题 |
| width | string | 列宽 |
| align | 'left' \| 'center' \| 'right' | 对齐方式 |
| sortable | boolean | 可排序 |
| render | Snippet | 自定义渲染 |

### Pagination 分页

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| total | number | 0 | 总记录数 |
| currentPage | number | 1 | 当前页（$bindable） |
| pageSize | number | 10 | 每页数量 |
| showTotal | boolean | false | 显示总数 |
| showJumper | boolean | false | 显示跳转 |
| onchange | (page: number) => void | — | 页码变化事件 |
| class | string | '' | 自定义 class |

### Descriptions 描述列表

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | '' | 标题 |
| column | number | 3 | 列数 |
| border | boolean | false | 带边框 |
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 排列方向 |
| size | ComponentSize | 'default' | 尺寸 |
| class | string | '' | 自定义 class |

### DescriptionsItem 描述列表项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | string | '' | 标签 |
| span | number | 1 | 列跨度 |
| class | string | '' | 自定义 class |

### Result 结果页

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | '' | 标题 |
| subTitle | string | '' | 副标题 |
| icon | 'success' \| 'warning' \| 'info' \| 'error' \| '404' \| '403' \| '500' | 'info' | 图标类型 |
| extra | Snippet | — | 底部操作区插槽 |
| class | string | '' | 自定义 class |

### Statistic 统计数值

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | number \| string | 0 | 数值 |
| precision | number | — | 小数精度 |
| decimalSeparator | string | '.' | 小数分隔符 |
| groupSeparator | string | ',' | 千分位分隔符 |
| title | string | '' | 标题 |
| prefix | string \| Snippet | — | 前缀 |
| suffix | string \| Snippet | — | 后缀 |
| class | string | '' | 自定义 class |

### Countdown 倒计时

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | number | — | 目标时间戳（必填） |
| format | string | 'HH:mm:ss' | 时间格式 |
| title | string | '' | 标题 |
| prefix | string \| Snippet | — | 前缀 |
| suffix | string \| Snippet | — | 后缀 |
| onfinish | () => void | — | 倒计时结束回调 |
| class | string | '' | 自定义 class |

### Segmented 分段控制器

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string \| number | '' | 当前值（$bindable） |
| options | (string \| SegmentedOption)[] | [] | 选项列表 |
| size | ComponentSize | 'default' | 尺寸 |
| disabled | boolean | false | 禁用 |
| block | boolean | false | 撑满容器 |
| onchange | (val) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### Tree 树形控件

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| data | TreeNode[] | [] | 树形数据 |
| showCheckbox | boolean | false | 显示复选框 |
| defaultExpandAll | boolean | false | 默认展开所有 |
| expandOnClickNode | boolean | true | 点击节点展开 |
| checkOnClickNode | boolean | false | 点击节点选中 |
| accordion | boolean | false | 手风琴模式 |
| indent | number | 18 | 缩进（px） |
| highlightCurrent | boolean | false | 高亮当前节点 |
| emptyText | string | '暂无数据' | 空数据文字 |
| checkedKeys | (string \| number)[] | [] | 选中节点 key（$bindable） |
| expandedKeys | (string \| number)[] | [] | 展开节点 key（$bindable） |
| oncheck | (keys, node) => void | — | 选中事件 |
| onnodeclick | (node) => void | — | 节点点击事件 |
| onnodeexpand | (node) => void | — | 节点展开事件 |
| class | string | '' | 自定义 class |

### Calendar 日历

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | Date | new Date() | 当前日期（$bindable） |
| range | [Date, Date] | — | 日期范围 |
| onchange | (date: Date) => void | — | 日期变化事件 |
| class | string | '' | 自定义 class |

### Carousel 走马灯

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| initialIndex | number | 0 | 初始索引 |
| height | string | '300px' | 高度 |
| trigger | 'hover' \| 'click' | 'hover' | 指示器触发方式 |
| autoplay | boolean | true | 自动播放 |
| interval | number | 3000 | 切换间隔（ms） |
| indicatorPosition | '' \| 'outside' \| 'none' | '' | 指示器位置 |
| arrow | 'always' \| 'hover' \| 'never' | 'hover' | 箭头显示 |
| type | '' \| 'card' | '' | 类型 |
| loop | boolean | true | 循环播放 |
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 方向 |
| pauseOnHover | boolean | true | 悬停暂停 |
| onchange | (current, prev) => void | — | 切换事件 |
| class | string | '' | 自定义 class |

### CarouselItem 走马灯子项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | '' | 名称 |
| label | string | '' | 标签 |
| class | string | '' | 自定义 class |

### Timeline 时间线

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| reverse | boolean | false | 逆序 |
| class | string | '' | 自定义 class |

### TimelineItem 时间线节点

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| timestamp | string | '' | 时间戳文字 |
| hideTimestamp | boolean | false | 隐藏时间戳 |
| center | boolean | false | 居中 |
| placement | 'top' \| 'bottom' | 'bottom' | 时间戳位置 |
| type | ComponentType | 'primary' | 节点类型 |
| color | string | '' | 自定义颜色 |
| size | 'normal' \| 'large' | 'normal' | 节点尺寸 |
| hollow | boolean | false | 空心 |
| dot | Snippet | — | 自定义节点插槽 |
| class | string | '' | 自定义 class |

### Image 图片

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | string | '' | 图片地址 |
| alt | string | '' | 替代文字 |
| fit | 'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down' | 'fill' | 填充方式 |
| lazy | boolean | false | 懒加载 |
| previewSrcList | string[] | — | 预览图片列表 |
| initialIndex | number | 0 | 预览初始索引 |
| zIndex | number | 2000 | 预览 z-index |
| hideOnClickModal | boolean | false | 点击遮罩关闭预览 |
| loading | 'eager' \| 'lazy' | — | 原生 loading |
| placeholder | Snippet | — | 加载中占位插槽 |
| error | Snippet | — | 加载失败插槽 |
| class | string | '' | 自定义 class |

### Watermark 水印

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| content | string | '' | 水印文字 |
| fontSize | number | 16 | 字号 |
| rotate | number | -22 | 旋转角度 |
| width | number | 120 | 水印宽度 |
| height | number | 64 | 水印高度 |
| gap | [number, number] | [100, 100] | 间距 |
| color | string | 'rgba(0,0,0,.15)' | 颜色 |
| zIndex | number | 9 | z-index |
| class | string | '' | 自定义 class |

### Collapse 折叠面板

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| activeKeys | string[] | [] | 展开项 key（$bindable） |
| accordion | boolean | false | 手风琴模式 |
| onchange | (keys: string[]) => void | — | 变化事件 |
| class | string | '' | 自定义 class |

### CollapseItem 折叠面板项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| key | string | '' | 唯一标识 |
| title | string | '' | 标题 |
| disabled | boolean | false | 禁用 |
| open | boolean | false | 是否展开（$bindable） |
| ontoggle | (open: boolean) => void | — | 切换事件 |
| header | Snippet | — | 自定义标题插槽 |
| class | string | '' | 自定义 class |

### VirtualList 虚拟列表

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | any[] | [] | 数据列表 |
| height | number | 300 | 容器高度 |
| itemHeight | number | 40 | 每项高度 |
| overscan | number | 5 | 上下缓冲区数量 |
| item | Snippet\<{ item, index }\> | — | 渲染模板插槽 |
| class | string | '' | 自定义 class |

### InfiniteScroll 无限滚动

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| loading | boolean | false | 加载中（$bindable） |
| noMore | boolean | false | 没有更多数据 |
| distance | number | 50 | 触发距离（px） |
| onload | () => void | — | 加载回调 |
| class | string | '' | 自定义 class |

---

## 反馈组件 (Feedback)

### Alert 警告

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | ComponentType | 'info' | 类型 |
| title | string | '' | 标题 |
| description | string | '' | 描述 |
| closable | boolean | true | 可关闭 |
| showIcon | boolean | false | 显示图标 |
| center | boolean | false | 居中 |
| effect | 'light' \| 'dark' | 'light' | 主题 |
| onclose | () => void | — | 关闭事件 |
| class | string | '' | 自定义 class |

### Dialog 对话框

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| open | boolean | false | 是否显示（$bindable） |
| title | string | '' | 标题 |
| width | string | '50%' | 宽度 |
| top | string | '15vh' | 距顶距离 |
| modal | boolean | true | 显示遮罩 |
| closeOnClickModal | boolean | true | 点击遮罩关闭 |
| showClose | boolean | true | 显示关闭按钮 |
| footer | Snippet | — | 底部插槽 |
| onclose | () => void | — | 关闭事件 |
| class | string | '' | 自定义 class |

### Drawer 抽屉

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| open | boolean | false | 是否显示（$bindable） |
| title | string | '' | 标题 |
| direction | 'rtl' \| 'ltr' \| 'ttb' \| 'btt' | 'rtl' | 打开方向 |
| size | string | '30%' | 尺寸 |
| modal | boolean | true | 显示遮罩 |
| closeOnClickModal | boolean | true | 点击遮罩关闭 |
| showClose | boolean | true | 显示关闭按钮 |
| onclose | () => void | — | 关闭事件 |
| class | string | '' | 自定义 class |

### Tooltip 文字提示

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| content | string | '' | 提示内容 |
| placement | Placement | 'top' | 弹出位置 |
| disabled | boolean | false | 禁用 |
| offset | number | 8 | 偏移量 |
| showDelay | number | 0 | 显示延时（ms） |
| hideDelay | number | 200 | 隐藏延时（ms） |
| class | string | '' | 自定义 class |

> Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'

### Popover 弹出框

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | '' | 标题 |
| content | string | '' | 内容 |
| placement | Placement | 'top' | 弹出位置 |
| trigger | 'click' \| 'hover' \| 'focus' | 'click' | 触发方式 |
| width | string \| number | 200 | 宽度 |
| contentSlot | Snippet | — | 内容插槽 |
| class | string | '' | 自定义 class |

### Popconfirm 气泡确认框

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | '' | 确认文字 |
| confirmButtonText | string | '确定' | 确认按钮文字 |
| cancelButtonText | string | '取消' | 取消按钮文字 |
| confirmButtonType | ComponentType | 'primary' | 确认按钮类型 |
| icon | string | 'info-filled' | 图标名称 |
| iconColor | string | '#e6a23c' | 图标颜色 |
| onconfirm | () => void | — | 确认回调 |
| oncancel | () => void | — | 取消回调 |
| class | string | '' | 自定义 class |

### Message 消息提示（函数式）

```ts
import { message } from 'svelte-ui'

message.success('操作成功')
message.error('操作失败')
message.warning('请注意')
message.info('提示信息')

// 高级配置
const { close } = message.success('手动关闭', { duration: 0, showClose: true })
close() // 手动关闭

// 配置项
message(text, { type, duration, showClose, center })
```

### MessageBox 消息弹框（函数式）

```ts
import { msgAlert, msgConfirm, msgPrompt } from 'svelte-ui'

await msgAlert('提示消息', '标题')
await msgConfirm('确定删除吗？', '警告')
const { value } = await msgPrompt('请输入名称', '输入')
```

### Notification 通知（函数式）

```ts
import { notify } from 'svelte-ui'

notify({ title: '通知', message: '内容', type: 'success' })
notify.success('操作成功')
notify.error({ title: '错误', message: '失败', duration: 0 })
```

### Loading 加载

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| loading | boolean | true | 是否显示 |
| text | string | '' | 加载文字 |
| fullscreen | boolean | false | 全屏 |
| background | string | 'rgba(255,255,255,0.9)' | 遮罩颜色 |
| class | string | '' | 自定义 class |

### Overlay 遮罩层

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| visible | boolean | true | 是否显示 |
| zIndex | number | 2000 | z-index |
| onclick | () => void | — | 点击事件 |
| class | string | '' | 自定义 class |

### CollapseTransition 折叠过渡

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| expanded | boolean | false | 是否展开 |
| class | string | '' | 自定义 class |

---

## 导航组件 (Navigation)

### Menu 导航菜单

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| activeKey | string | '' | 激活菜单 key |
| openKeys | string[] | [] | 展开子菜单 |
| mode | 'horizontal' \| 'vertical' | 'vertical' | 模式 |
| collapse | boolean | false | 折叠 |
| backgroundColor | string | '' | 背景色 |
| textColor | string | '' | 文字颜色 |
| activeTextColor | string | '' | 激活文字颜色 |
| class | string | '' | 自定义 class |

### MenuItem 菜单项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| index | string | '' | 唯一标识 |
| disabled | boolean | false | 禁用 |
| icon | string | — | 图标名称 |
| class | string | '' | 自定义 class |

### SubMenu 子菜单

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| index | string | '' | 唯一标识 |
| title | Snippet | — | 标题插槽 |
| class | string | '' | 自定义 class |

### MenuItemGroup 菜单分组

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | '' | 分组标题 |
| class | string | '' | 自定义 class |

### Tabs 标签页

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| activeKey | string | — | 当前标签 key（$bindable） |
| items | TabItem[] | [] | 标签配置 |
| type | '' \| 'card' \| 'border-card' | '' | 样式类型 |
| closable | boolean | false | 可关闭 |
| addable | boolean | false | 可新增 |
| beforeLeave | (newKey, oldKey) => boolean | — | 切换前钩子 |
| onchange | (key: string) => void | — | 切换事件 |
| ontabremove | (key: string) => void | — | 关闭事件 |
| ontabadd | () => void | — | 新增事件 |
| children | Snippet\<activeKey\> | — | 内容插槽 |
| class | string | '' | 自定义 class |

### Breadcrumb 面包屑

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| separator | string | '/' | 分隔符 |
| class | string | '' | 自定义 class |

### BreadcrumbItem 面包屑项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| href | string | — | 链接地址 |
| class | string | '' | 自定义 class |

### Dropdown 下拉菜单

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | DropdownItem[] | [] | 菜单项 |
| trigger | 'click' \| 'hover' | 'hover' | 触发方式 |
| placement | Placement | 'bottom' | 弹出位置 |
| oncommand | (key: string) => void | — | 菜单选择事件 |
| class | string | '' | 自定义 class |

### PageHeader 页头

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | '' | 标题 |
| content | string | '' | 内容 |
| icon | Snippet | — | 图标插槽 |
| extra | Snippet | — | 操作区插槽 |
| onback | () => void | — | 返回事件 |
| class | string | '' | 自定义 class |

### Steps 步骤条

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| active | number | 0 | 当前步骤索引 |
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 方向 |
| processStatus | 'wait' \| 'process' \| 'finish' \| 'success' \| 'error' | 'process' | 当前步骤状态 |
| finishStatus | 'wait' \| 'process' \| 'finish' \| 'success' \| 'error' | 'finish' | 已完成的状态 |
| simple | boolean | false | 简洁模式 |
| class | string | '' | 自定义 class |

### Step 步骤

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| stepIndex | number | — | 步骤索引（必填） |
| title | string | '' | 标题 |
| description | string | '' | 描述 |
| icon | string | — | 图标 |
| class | string | '' | 自定义 class |

### Affix 固钉

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| offset | number | 0 | 偏移量（px） |
| position | 'top' \| 'bottom' | 'top' | 固定位置 |
| target | string | — | 容器选择器 |
| zIndex | number | 100 | z-index |
| onchange | (fixed: boolean) => void | — | 状态变化事件 |
| class | string | '' | 自定义 class |

### Backtop 回到顶部

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| target | string | — | 滚动容器选择器 |
| visibilityHeight | number | 200 | 显示高度阈值 |
| right | number | 40 | 距右（px） |
| bottom | number | 40 | 距底（px） |
| onclick | () => void | — | 点击事件 |
| class | string | '' | 自定义 class |

### Anchor 锚点

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | 'vertical' \| 'horizontal' | 'vertical' | 方向 |
| onclick | (e, link) => void | — | 点击事件 |
| onchange | (href: string) => void | — | 锚点变化事件 |
| class | string | '' | 自定义 class |

### AnchorLink 锚点链接

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| href | string | — | 锚点地址（必填） |
| title | string | '' | 标题 |
| class | string | '' | 自定义 class |

---

## 其他组件 (Other)

### Splitter 分割面板

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 分割方向 |
| class | string | '' | 自定义 class |

### SplitterPanel 分割面板子项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | string | '' | 初始尺寸 |
| min | string | '0' | 最小尺寸 |
| max | string | '100%' | 最大尺寸 |
| resizable | boolean | true | 可调整大小 |
| class | string | '' | 自定义 class |

---

## 工具函数

### useNamespace(block)

BEM 命名空间工具，返回 `b()` / `e(element)` / `m(modifier)` / `be(block, element)` 等方法。

```ts
import { useNamespace } from 'svelte-ui'
const ns = useNamespace('button')
ns.b()      // 'su-button'
ns.e('icon') // 'su-button__icon'
ns.m('primary') // 'su-button--primary'
ns.is('disabled', true) // 'is-disabled'
```

### iconSvgContent

内置 293 个 SVG 图标的路径数据字典，用于 `<Icon>` 组件。

```ts
import { iconSvgContent } from 'svelte-ui/utils/icons'
Object.keys(iconSvgContent) // 获取所有图标名称
```
