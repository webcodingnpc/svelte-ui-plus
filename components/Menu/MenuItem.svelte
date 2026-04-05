<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { getContext } from 'svelte'

  interface Props {
    /** 唯一标识 */
    index: string
    /** 是否禁用 */
    disabled?: boolean
    /** 图标 */
    icon?: Snippet
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('menu-item')

  let {
    index,
    disabled = false,
    icon,
    children,
    class: className = '',
  }: Props = $props()

  const menu = getContext<any>('su-menu')

  let isActive = $derived(menu?.activeKey === index)

  function handleClick() {
    if (disabled) return
    menu?.handleSelect(index)
  }

  let classes = $derived(
    [ns.b(), isActive && ns.is('active'), disabled && ns.is('disabled'), className]
      .filter(Boolean)
      .join(' '),
  )
</script>

<li class={classes} role="menuitem" onclick={handleClick}>
  {#if icon}
    <span class={ns.e('icon')}>
      {@render icon()}
    </span>
  {/if}
  <span class={ns.e('title')}>
    {@render children?.()}
  </span>
</li>

<style lang="scss">
  .su-menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 20px;
    height: 56px;
    line-height: 56px;
    cursor: pointer;
    color: var(--su-text-color-primary);
    transition: all 0.15s ease;
    white-space: nowrap;
    overflow: hidden;

    &:hover {
      color: var(--su-menu-active-color, var(--su-color-primary));
      background-color: var(--su-color-primary-light-9);
    }

    &.is-active {
      color: var(--su-menu-active-color, var(--su-color-primary));
      font-weight: 500;
    }

    &.is-disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    &__icon {
      display: inline-flex;
      align-items: center;
      font-size: 18px;
      width: 24px;
      flex-shrink: 0;
    }

    &__title {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
