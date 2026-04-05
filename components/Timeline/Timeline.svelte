<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    reverse?: boolean
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('timeline')
  let {
    reverse = false,
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.is('reverse', reverse), className]
      .filter(Boolean)
      .join(' ')
  )
</script>

<ul class={classes}>
  {#if children}{@render children()}{/if}
</ul>

<style lang="scss">
  .su-timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: var(--su-font-size-base);

    &.is-reverse {
      display: flex;
      flex-direction: column-reverse;
    }
  }
</style>
