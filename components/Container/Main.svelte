<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('main')
  let {
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived([ns.b(), className].filter(Boolean).join(' '))
</script>

<main class={classes}>
  {#if children}{@render children()}{/if}
</main>

<style lang="scss">
  .su-main {
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
    box-sizing: border-box;
    padding: 20px;
  }
</style>
