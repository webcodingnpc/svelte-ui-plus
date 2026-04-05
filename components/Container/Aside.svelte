<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    width?: string
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('aside')
  let {
    width = '300px',
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived([ns.b(), className].filter(Boolean).join(' '))
</script>

<aside class={classes} style="width: {width}">
  {#if children}{@render children()}{/if}
</aside>

<style lang="scss">
  .su-aside {
    box-sizing: border-box;
    flex-shrink: 0;
    overflow: auto;
  }
</style>
