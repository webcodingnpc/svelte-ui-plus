<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ComponentType } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    type?: ComponentType | 'default'
    underline?: boolean
    disabled?: boolean
    href?: string
    target?: string
    icon?: string
    children?: Snippet
    onclick?: (e: MouseEvent) => void
    class?: string
  }

  const ns = useNamespace('link')
  let {
    type = 'default',
    underline = true,
    disabled = false,
    href = '',
    target = '_self',
    icon = '',
    children,
    onclick,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.m(type !== 'default' ? type : undefined), ns.is('disabled', disabled), ns.is('underline', underline && !disabled), className]
      .filter(Boolean)
      .join(' ')
  )

  function handleClick(e: MouseEvent) {
    if (disabled) {
      e.preventDefault()
      return
    }
    onclick?.(e)
  }
</script>

<a class={classes} {href} {target} onclick={handleClick}>
  {#if icon}
    <Icon name={icon} size={14} class={ns.e('icon')} />
  {/if}
  {#if children}
    <span class={ns.e('inner')}>
      {@render children()}
    </span>
  {/if}
</a>

<style lang="scss">
  .su-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--su-font-size-base);
    color: var(--su-text-color-regular);
    cursor: pointer;
    text-decoration: none;
    transition: color var(--su-transition-duration-fast) ease;

    &:hover {
      color: var(--su-color-primary);
    }

    &.is-underline:hover {
      text-decoration: underline;
    }

    &.is-disabled {
      color: var(--su-text-color-disabled);
      cursor: not-allowed;
      pointer-events: none;
    }

    @each $type in primary, success, warning, danger, info {
      &--#{$type} {
        color: var(--su-color-#{$type});

        &:hover {
          color: var(--su-color-#{$type}-light-3);
        }

        &.is-disabled {
          color: var(--su-color-#{$type}-light-5);
        }
      }
    }
  }
</style>
