<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    direction?: 'horizontal' | 'vertical'
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('container')
  let {
    direction,
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.is('vertical', direction === 'vertical'), className]
      .filter(Boolean)
      .join(' ')
  )
</script>

<section class={classes}>
  {#if children}{@render children()}{/if}
</section>

<style lang="scss">
  .su-container {
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;

    &.is-vertical {
      flex-direction: column;
    }
  }
</style>
