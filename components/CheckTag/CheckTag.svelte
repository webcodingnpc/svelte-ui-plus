<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    checked?: boolean
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
    children?: Snippet
    onchange?: (checked: boolean) => void
    class?: string
  }

  const ns = useNamespace('check-tag')
  let {
    checked = $bindable(false),
    type = 'primary',
    children,
    onchange,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.is('checked', checked), ns.m(type), className]
      .filter(Boolean)
      .join(' ')
  )

  function handleClick() {
    checked = !checked
    onchange?.(checked)
  }
</script>

<span class={classes} role="checkbox" aria-checked={checked} tabindex="0" onclick={handleClick} onkeydown={(e) => e.key === 'Enter' && handleClick()}>
  {#if children}{@render children()}{/if}
</span>

<style lang="scss">
  .su-check-tag {
    display: inline-flex;
    align-items: center;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    font-size: var(--su-font-size-small);
    border-radius: var(--su-border-radius-base);
    background-color: var(--su-fill-color);
    color: var(--su-text-color-regular);
    cursor: pointer;
    user-select: none;
    transition: all var(--su-transition-duration-fast) ease;

    &:hover {
      background-color: var(--su-color-primary-light-9);
      color: var(--su-color-primary);
    }

    &.is-checked {
      background-color: var(--su-color-primary);
      color: #fff;

      &:hover {
        background-color: var(--su-color-primary-dark-2);
        color: #fff;
      }
    }

    @each $type in success, warning, danger, info {
      &--#{$type}.is-checked {
        background-color: var(--su-color-#{$type});
        &:hover {
          background-color: var(--su-color-#{$type}-dark-2);
        }
      }
      &--#{$type}:not(.is-checked):hover {
        background-color: var(--su-color-#{$type}-light-9);
        color: var(--su-color-#{$type});
      }
    }
  }
</style>
