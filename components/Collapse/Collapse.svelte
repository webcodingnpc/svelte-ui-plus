<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 当前展开项的 key 数组 */
    activeKeys?: string[]
    /** 是否手风琴模式（只展开一个） */
    accordion?: boolean
    /** 切换事件 */
    onchange?: (keys: string[]) => void
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('collapse')

  let {
    activeKeys = $bindable([]),
    accordion = false,
    onchange,
    children,
    class: className = '',
  }: Props = $props()
</script>

<div class="{ns.b()} {className}" role="tablist">
  {@render children?.()}
</div>

<style lang="scss">
  .su-collapse {
    border-top: 1px solid var(--su-border-color-lighter);
    border-bottom: 1px solid var(--su-border-color-lighter);
  }
</style>
