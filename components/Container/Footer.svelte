<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    height?: string
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('footer')
  let {
    height = '60px',
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived([ns.b(), className].filter(Boolean).join(' '))
</script>

<footer class={classes} style="height: {height}">
  {#if children}{@render children()}{/if}
</footer>

<style lang="scss">
  .su-footer {
    box-sizing: border-box;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
</style>
