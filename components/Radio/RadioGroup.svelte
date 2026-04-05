<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 绑定值 */
    value?: string | number | boolean
    /** 是否禁用 */
    disabled?: boolean
    /** 尺寸 */
    size?: ComponentSize
    /** 变更事件 */
    onchange?: (value: string | number | boolean) => void
    /** 子内容（Radio 组件） */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('radio-group')

  let {
    value = $bindable(''),
    disabled = false,
    size = 'default',
    onchange,
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), className].filter(Boolean).join(' '),
  )
</script>

<div class={classes} role="radiogroup">
  {@render children?.()}
</div>

<style lang="scss">
  .su-radio-group {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
  }
</style>
