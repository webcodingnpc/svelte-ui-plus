<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { getContext } from 'svelte'

  interface Props {
    /** 唯一标识 */
    index: string
    /** 标题 */
    title?: Snippet
    /** 是否禁用 */
    disabled?: boolean
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('sub-menu')

  let {
    index,
    title,
    disabled = false,
    children,
    class: className = '',
  }: Props = $props()

  const menu = getContext<any>('su-menu')

  let isOpen = $derived(menu?.openKeys?.includes(index))

  function handleToggle() {
    if (disabled) return
    menu?.handleToggleSub(index)
  }

  let classes = $derived(
    [ns.b(), isOpen && ns.is('opened'), disabled && ns.is('disabled'), className]
      .filter(Boolean)
      .join(' '),
  )
</script>

<li class={classes} role="menuitem">
  <div class={ns.e('title')} onclick={handleToggle}>
    {@render title?.()}
    <svg class={ns.e('arrow')} viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor">
      <path d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 533.376a30.592 30.592 0 0 0 0-42.752L382.592 149.312a29.12 29.12 0 0 0-41.728 0z" />
    </svg>
  </div>
  {#if isOpen}
    <ul class={ns.e('content')}>
      {@render children?.()}
    </ul>
  {/if}
</li>

<style lang="scss">
  .su-sub-menu {
    list-style: none;

    &__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      height: 56px;
      line-height: 56px;
      cursor: pointer;
      color: var(--su-text-color-primary);
      transition: all 0.15s ease;

      &:hover {
        color: var(--su-color-primary);
        background-color: var(--su-color-primary-light-9);
      }
    }

    &__arrow {
      transition: transform 0.3s ease;
      flex-shrink: 0;
    }

    &.is-opened > .su-sub-menu__title .su-sub-menu__arrow {
      transform: rotate(90deg);
    }

    &.is-disabled > .su-sub-menu__title {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    &__content {
      list-style: none;
      padding: 0;
      margin: 0;
      padding-left: 20px;
    }
  }
</style>
