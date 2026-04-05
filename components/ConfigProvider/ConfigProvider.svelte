<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    size?: ComponentSize
    zIndex?: number
    namespace?: string
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('config-provider')
  let {
    size = 'default',
    zIndex = 2000,
    namespace = 'su',
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived([ns.b(), className].filter(Boolean).join(' '))
</script>

<div class={classes} style="--su-namespace: {namespace}; --su-z-index-popup: {zIndex};">
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .su-config-provider {
    display: contents;
  }
</style>
