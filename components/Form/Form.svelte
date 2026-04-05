<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 标签宽度 */
    labelWidth?: string
    /** 标签位置 */
    labelPosition?: 'left' | 'right' | 'top'
    /** 是否行内表单 */
    inline?: boolean
    /** 尺寸 */
    size?: 'large' | 'default' | 'small'
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('form')

  let {
    labelWidth = '80px',
    labelPosition = 'right',
    inline = false,
    size = 'default',
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [
      ns.b(),
      ns.m(`label-${labelPosition}`),
      ns.is('inline', inline),
      className,
    ]
      .filter(Boolean)
      .join(' '),
  )
</script>

<form class={classes} style="--su-form-label-width: {labelWidth}" onsubmit={(e) => e.preventDefault()}>
  {@render children?.()}
</form>

<style lang="scss">
  .su-form {
    &.is-inline {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: flex-start;
    }
  }
</style>
