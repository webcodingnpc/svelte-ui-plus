<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 是否显示 */
    visible?: boolean
    /** 层级 */
    zIndex?: number
    /** 遮罩点击事件 */
    onclick?: () => void
    /** 自定义内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('overlay')

  let {
    visible = true,
    zIndex = 2000,
    onclick,
    children,
    class: className = '',
  }: Props = $props()
</script>

{#if visible}
  <div class="{ns.b()} {className}" style="z-index:{zIndex}" onclick={onclick} role="presentation">
    {#if children}
      {@render children()}
    {/if}
  </div>
{/if}

<style lang="scss">
  .su-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
