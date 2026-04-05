<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 初始大小（百分比或像素） */
    size?: string
    /** 最小尺寸 */
    min?: string
    /** 最大尺寸 */
    max?: string
    /** 是否可调整大小 */
    resizable?: boolean
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('splitter-panel')

  let {
    size = '',
    min = '0',
    max = '100%',
    resizable = true,
    children,
    class: className = '',
  }: Props = $props()

  let style = $derived(
    [
      size ? `flex:0 0 ${size}` : 'flex:1',
      `min-width:${min}`,
      `max-width:${max}`,
    ].join(';'),
  )
</script>

<div class="{ns.b()} {className}" {style}>
  {@render children?.()}
</div>

<style lang="scss">
  .su-splitter-panel {
    overflow: auto;
  }
</style>
