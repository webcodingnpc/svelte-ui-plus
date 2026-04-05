<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface TabItem {
    key: string
    label: string
    disabled?: boolean
  }

  interface Props {
    /** 当前激活的 tab key */
    activeKey?: string
    /** 标签页列表 */
    items?: TabItem[]
    /** 类型 */
    type?: 'line' | 'card' | 'border-card'
    /** 是否可关闭 */
    closable?: boolean
    /** 切换事件 */
    onchange?: (key: string) => void
    /** 关闭事件 */
    onclose?: (key: string) => void
    /** 面板内容插槽 */
    children?: Snippet<[string]>
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('tabs')

  let {
    activeKey = $bindable(''),
    items = [],
    type = 'line',
    closable = false,
    onchange,
    onclose,
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.m(type), className].filter(Boolean).join(' '),
  )

  function selectTab(key: string, disabled?: boolean) {
    if (disabled) return
    activeKey = key
    onchange?.(key)
  }

  function closeTab(e: MouseEvent, key: string) {
    e.stopPropagation()
    onclose?.(key)
  }

  // 默认激活第一个
  $effect(() => {
    if (!activeKey && items.length > 0) {
      activeKey = items[0].key
    }
  })
</script>

<div class={classes}>
  <div class={ns.e('header')}>
    {#each items as item}
      <div
        class="{ns.e('item')} {activeKey === item.key ? 'is-active' : ''} {item.disabled ? 'is-disabled' : ''}"
        onclick={() => selectTab(item.key, item.disabled)}
        role="tab"
        aria-selected={activeKey === item.key}
        tabindex={item.disabled ? -1 : 0}
      >
        <span>{item.label}</span>
        {#if closable && !item.disabled}
          <span class={ns.e('close')} onclick={(e) => closeTab(e, item.key)}>
            <Icon name="close" size={12} />
          </span>
        {/if}
      </div>
    {/each}
  </div>

  <div class={ns.e('content')}>
    {#if children}
      {@render children(activeKey)}
    {/if}
  </div>
</div>

<style lang="scss">
  .su-tabs {
    &__header {
      display: flex;
      position: relative;
    }

    &__item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0 20px;
      height: 40px;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      cursor: pointer;
      transition: all var(--su-transition-duration-fast);
      white-space: nowrap;
      outline: none;

      &:hover {
        color: var(--su-color-primary);
      }

      &.is-active {
        color: var(--su-color-primary);
      }

      &.is-disabled {
        color: var(--su-text-color-disabled);
        cursor: not-allowed;
      }
    }

    &__close {
      display: inline-flex;
      border-radius: 50%;
      padding: 2px;
      transition: all var(--su-transition-duration-fast);

      &:hover {
        background: var(--su-text-color-placeholder);
        color: #fff;
      }
    }

    &__content {
      padding: 16px 0;
    }

    // 线条类型
    &--line {
      .su-tabs__header {
        border-bottom: 2px solid var(--su-border-color-light);
      }

      .su-tabs__item {
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;

        &.is-active {
          border-bottom-color: var(--su-color-primary);
        }
      }
    }

    // 卡片类型
    &--card {
      .su-tabs__header {
        border-bottom: 1px solid var(--su-border-color-light);
      }

      .su-tabs__item {
        border: 1px solid transparent;
        border-bottom: none;
        border-radius: var(--su-border-radius-base) var(--su-border-radius-base) 0 0;
        margin-bottom: -1px;

        &.is-active {
          background: var(--su-fill-color-blank);
          border-color: var(--su-border-color-light);
          border-bottom-color: var(--su-fill-color-blank);
        }
      }
    }

    // 边框卡片类型
    &--border-card {
      border: 1px solid var(--su-border-color-light);
      border-radius: var(--su-border-radius-base);
      box-shadow: var(--su-box-shadow-lighter);
      overflow: hidden;

      .su-tabs__header {
        background: var(--su-fill-color-light);
        border-bottom: 1px solid var(--su-border-color-light);
      }

      .su-tabs__item {
        margin-bottom: -1px;

        &.is-active {
          background: var(--su-fill-color-blank);
          border-bottom: 1px solid var(--su-fill-color-blank);
        }
      }

      .su-tabs__content {
        padding: 16px;
      }
    }
  }
</style>
