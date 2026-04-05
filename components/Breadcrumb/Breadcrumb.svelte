<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 分隔符 */
    separator?: string
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('breadcrumb')

  let { separator = '/', children, class: className = '' }: Props = $props()
</script>

<nav class="{ns.b()} {className}" aria-label="breadcrumb" style="--su-breadcrumb-separator: '{separator}'">
  {@render children?.()}
</nav>

<style lang="scss">
  .su-breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: var(--su-font-size-base);
    color: var(--su-text-color-regular);
    line-height: 1.5;
  }
</style>
