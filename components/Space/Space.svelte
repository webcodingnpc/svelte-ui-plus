<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 方向 */
    direction?: 'horizontal' | 'vertical'
    /** 间距大小 */
    size?: ComponentSize | number
    /** 是否自动换行 */
    wrap?: boolean
    /** 对齐方式 */
    align?: 'start' | 'center' | 'end' | 'baseline'
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('space')

  let {
    direction = 'horizontal',
    size = 'default',
    wrap = false,
    align = 'center',
    children,
    class: className = '',
  }: Props = $props()

  let gapSize = $derived(
    typeof size === 'number' ? `${size}px` : { large: '16px', default: '12px', small: '8px' }[size],
  )

  let classes = $derived(
    [ns.b(), ns.m(direction), className].filter(Boolean).join(' '),
  )
</script>

<div
  class={classes}
  style="gap: {gapSize}; align-items: {align}; flex-wrap: {wrap ? 'wrap' : 'nowrap'}"
>
  {@render children?.()}
</div>

<style lang="scss">
  .su-space {
    display: inline-flex;

    &--horizontal {
      flex-direction: row;
    }

    &--vertical {
      flex-direction: column;
    }
  }
</style>
