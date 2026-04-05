<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { fade, fly } from 'svelte/transition'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    /** 是否显示 */
    open?: boolean
    /** 标题 */
    title?: string
    /** 方向 */
    direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
    /** 尺寸（宽/高） */
    size?: string
    /** 是否显示关闭按钮 */
    showClose?: boolean
    /** 点击遮罩关闭 */
    closeOnClickModal?: boolean
    /** 关闭事件 */
    onclose?: () => void
    /** 头部插槽 */
    header?: Snippet
    /** 底部插槽 */
    footer?: Snippet
    /** 主体内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('drawer')

  let {
    open = $bindable(false),
    title = '',
    direction = 'rtl',
    size = '30%',
    showClose = true,
    closeOnClickModal = true,
    onclose,
    header,
    footer,
    children,
    class: className = '',
  }: Props = $props()

  const flyParams: Record<string, { x?: number; y?: number }> = {
    rtl: { x: 300 },
    ltr: { x: -300 },
    ttb: { y: -300 },
    btt: { y: 300 },
  }

  function close() {
    open = false
    onclose?.()
  }

  function handleOverlayClick() {
    if (closeOnClickModal) close()
  }

  let drawerStyle = $derived(() => {
    const isH = direction === 'ltr' || direction === 'rtl'
    return isH ? `width: ${size}` : `height: ${size}`
  })

  $effect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  })
</script>

{#if open}
  <div class="{ns.b()} {ns.m(direction)} {className}">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class={ns.e('overlay')} transition:fade={{ duration: 200 }} onclick={handleOverlayClick}></div>

    <div
      class={ns.e('wrapper')}
      style={drawerStyle()}
      transition:fly={{ ...flyParams[direction], duration: 300 }}
    >
      <div class={ns.e('header')}>
        {#if header}
          {@render header()}
        {:else}
          <span class={ns.e('title')}>{title}</span>
        {/if}
        {#if showClose}
          <button class={ns.e('close')} onclick={close}>
            <Icon name="close" size={16} />
          </button>
        {/if}
      </div>

      <div class={ns.e('body')}>
        {@render children?.()}
      </div>

      {#if footer}
        <div class={ns.e('footer')}>
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .su-drawer {
    position: fixed;
    inset: 0;
    z-index: var(--su-z-index-overlay);

    &__overlay {
      position: absolute;
      inset: 0;
      background: var(--su-overlay-color);
    }

    &__wrapper {
      position: absolute;
      display: flex;
      flex-direction: column;
      background: var(--su-bg-color-overlay);
      box-shadow: var(--su-box-shadow-dark);
      overflow: hidden;
    }

    // 方向定位
    &--rtl .su-drawer__wrapper {
      top: 0;
      right: 0;
      bottom: 0;
    }

    &--ltr .su-drawer__wrapper {
      top: 0;
      left: 0;
      bottom: 0;
    }

    &--ttb .su-drawer__wrapper {
      top: 0;
      left: 0;
      right: 0;
    }

    &--btt .su-drawer__wrapper {
      bottom: 0;
      left: 0;
      right: 0;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--su-border-color-lighter);
    }

    &__title {
      font-size: var(--su-font-size-large);
      font-weight: 600;
      color: var(--su-text-color-primary);
    }

    &__close {
      display: inline-flex;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--su-text-color-secondary);
      padding: 4px;
      border-radius: var(--su-border-radius-small);

      &:hover {
        color: var(--su-color-primary);
        background: var(--su-fill-color-light);
      }
    }

    &__body {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }

    &__footer {
      padding: 12px 20px;
      border-top: 1px solid var(--su-border-color-lighter);
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
  }
</style>
