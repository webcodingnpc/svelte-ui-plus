/**
 * 公共类型定义
 */

// 组件尺寸
export type ComponentSize = 'large' | 'default' | 'small'

// 组件主题类型
export type ComponentType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

// 弹出层位置
export type Placement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'

// 方向
export type Direction = 'horizontal' | 'vertical'

// 触发方式
export type TriggerType = 'click' | 'hover' | 'focus'
