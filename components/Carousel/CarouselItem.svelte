<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    name?: string
    label?: string
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('carousel-item')
  let {
    name = '',
    label = '',
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived([ns.b(), className].filter(Boolean).join(' '))
</script>

<div class={classes}>
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .su-carousel-item {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
</style>
