/**
 * SvelteUI — 基于 Svelte 5 的 UI 组件库
 *
 * 全量引用:
 *   import { Button, Input, Dialog, message } from 'svelte-ui'
 *   import 'svelte-ui/styles/index.scss'
 *
 * 按需引用:
 *   import { Button } from 'svelte-ui/components/Button'
 *   import 'svelte-ui/styles/var.scss'
 */

// 导出所有组件
export {
    // 基础 (Basic)
    Icon,
    Button,
    ButtonGroup,
    Link,
    Text,
    Scrollbar,
    Divider,
    Space,
    Row,
    Col,
    Container,
    Header,
    Footer,
    Main,
    Aside,
    CheckTag,
    ConfigProvider,
    // 表单 (Form)
    Input,
    InputNumber,
    InputTag,
    Autocomplete,
    Select,
    TreeSelect,
    Cascader,
    Switch,
    Slider,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Rate,
    ColorPicker,
    DatePicker,
    TimePicker,
    TimeSelect,
    Transfer,
    Upload,
    Form,
    FormItem,
    Mention,
    // 数据展示 (Data Display)
    Tag,
    Badge,
    Avatar,
    Card,
    Empty,
    Progress,
    Skeleton,
    Table,
    Pagination,
    Descriptions,
    DescriptionsItem,
    Result,
    Statistic,
    Countdown,
    Segmented,
    Tree,
    Calendar,
    Carousel,
    CarouselItem,
    Timeline,
    TimelineItem,
    Watermark,
    Image,
    Collapse,
    CollapseItem,
    VirtualList,
    InfiniteScroll,
    // 反馈 (Feedback)
    Alert,
    Dialog,
    Drawer,
    Tooltip,
    Popover,
    Popconfirm,
    Message,
    message,
    MessageBox,
    msgAlert,
    msgConfirm,
    msgPrompt,
    Notification,
    notify,
    Loading,
    Tour,
    TourStep,
    Overlay,
    CollapseTransition,
    // 导航 (Navigation)
    Tabs,
    Breadcrumb,
    BreadcrumbItem,
    Dropdown,
    Menu,
    MenuItem,
    MenuItemGroup,
    SubMenu,
    PageHeader,
    Steps,
    Step,
    Affix,
    Backtop,
    Anchor,
    AnchorLink,
    // 其他 (Other)
    Splitter,
    SplitterPanel,
} from './components'

// 导出工具
export { useNamespace } from './utils/bem'

// 导出类型
export type {
    ComponentSize,
    ComponentType,
    Placement,
    Direction,
    TriggerType,
} from './utils/types'

export type { MessageOptions } from './components/Message'
