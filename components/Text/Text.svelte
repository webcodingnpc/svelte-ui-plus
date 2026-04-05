<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ComponentSize, ComponentType } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    type?: ComponentType | 'default'
    size?: ComponentSize | 'large'
    tag?: string
    truncated?: boolean
    lineClamp?: number
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('text')
  let {
    type = 'default',
    size = 'default',
    tag = 'span',
    truncated = false,
    lineClamp,
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.m(type !== 'default' ? type : undefined), ns.m(size !== 'default' ? size : undefined), ns.is('truncated', truncated), className]
      .filter(Boolean)
      .join(' ')
  )

  let lineClampStyle = $derived(
    lineClamp ? `display: -webkit-box; -webkit-line-clamp: ${lineClamp}; -webkit-box-orient: vertical; overflow: hidden;` : ''
  )
</script>

{#if tag === 'p'}
  <p class={classes} style={lineClampStyle}>
    {#if children}{@render children()}{/if}
  </p>
{:else if tag === 'div'}
  <div class={classes} style={lineClampStyle}>
    {#if children}{@render children()}{/if}
  </div>
{:else}
  <span class={classes} style={lineClampStyle}>
    {#if children}{@render children()}{/if}
  </span>
{/if}

<style lang="scss">
  .su-text {
    font-size: var(--su-font-size-base);
    color: var(--su-text-color-regular);
    line-height: var(--su-line-height);

    &--large {
      font-size: var(--su-font-size-large);
    }

    &--small {
      font-size: var(--su-font-size-small);
    }

    &.is-truncated {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @each $type in primary, success, warning, danger, info {
      &--#{$type} {
        color: var(--su-color-#{$type});
      }
    }
  }
</style>
