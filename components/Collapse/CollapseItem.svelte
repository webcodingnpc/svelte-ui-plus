<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { slide } from 'svelte/transition'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    /** 唯一标识 */
    key?: string
    /** 标题 */
    title?: string
    /** 是否禁用 */
    disabled?: boolean
    /** 是否展开 */
    open?: boolean
    /** 切换事件 */
    ontoggle?: (open: boolean) => void
    /** 标题插槽 */
    header?: Snippet
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('collapse-item')

  let {
    key = '',
    title = '',
    disabled = false,
    open = $bindable(false),
    ontoggle,
    header,
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.is('active', open), ns.is('disabled', disabled), className]
      .filter(Boolean)
      .join(' '),
  )

  function toggle() {
    if (disabled) return
    open = !open
    ontoggle?.(open)
  }
</script>

<div class={classes}>
  <button
    class={ns.e('header')}
    onclick={toggle}
    disabled={disabled}
    role="tab"
    aria-expanded={open}
  >
    <span class="{ns.e('arrow')}" class:is-active={open}>
      <Icon name="arrow-right" size={12} />
    </span>
    {#if header}
      {@render header()}
    {:else}
      <span class={ns.e('title')}>{title}</span>
    {/if}
  </button>

  {#if open}
    <div class={ns.e('content')} transition:slide={{ duration: 200 }} role="tabpanel">
      <div class={ns.e('body')}>
        {@render children?.()}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .su-collapse-item {
    border-bottom: 1px solid var(--su-border-color-lighter);

    &:last-child {
      border-bottom: none;
    }

    &__header {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 12px 0;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-primary);
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      transition: color var(--su-transition-duration-fast);

      &:hover {
        color: var(--su-color-primary);
      }

      &:disabled {
        color: var(--su-text-color-disabled);
        cursor: not-allowed;
      }
    }

    &__arrow {
      display: inline-flex;
      transition: transform var(--su-transition-duration-fast);
      color: var(--su-text-color-secondary);

      &.is-active {
        transform: rotate(90deg);
      }
    }

    &__title {
      flex: 1;
      font-weight: 500;
    }

    &__content {
      overflow: hidden;
    }

    &__body {
      padding: 0 0 16px;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      line-height: 1.7;
    }
  }
</style>
