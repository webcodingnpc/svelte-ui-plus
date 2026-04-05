<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { fade, scale } from 'svelte/transition'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    /** 是否显示 */
    open?: boolean
    /** 标题 */
    title?: string
    /** 宽度 */
    width?: string
    /** 是否显示关闭按钮 */
    showClose?: boolean
    /** 点击遮罩关闭 */
    closeOnClickModal?: boolean
    /** ESC 关闭 */
    closeOnEsc?: boolean
    /** 是否居中 */
    center?: boolean
    /** 关闭事件 */
    onclose?: () => void
    /** 头部内容 */
    header?: Snippet
    /** 底部内容 */
    footer?: Snippet
    /** 主体内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('dialog')

  let {
    open = $bindable(false),
    title = '',
    width = '50%',
    showClose = true,
    closeOnClickModal = true,
    closeOnEsc = true,
    center = false,
    onclose,
    header,
    footer,
    children,
    class: className = '',
  }: Props = $props()

  function close() {
    open = false
    onclose?.()
  }

  function handleOverlayClick() {
    if (closeOnClickModal) close()
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && closeOnEsc) close()
  }

  $effect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeydown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = ''
    }
  })
</script>

{#if open}
  <div class="{ns.b()} {className}">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class={ns.e('overlay')} transition:fade={{ duration: 200 }} onclick={handleOverlayClick}></div>

    <div
      class="{ns.e('wrapper')}"
      transition:scale={{ duration: 200, start: 0.9 }}
      style="width: {width}"
      onclick={(e) => e.stopPropagation()}
    >
      <div class="{ns.e('header')} {center ? 'is-center' : ''}">
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
        <div class="{ns.e('footer')} {center ? 'is-center' : ''}">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .su-dialog {
    position: fixed;
    inset: 0;
    z-index: var(--su-z-index-overlay);
    display: flex;
    align-items: center;
    justify-content: center;

    &__overlay {
      position: absolute;
      inset: 0;
      background: var(--su-overlay-color);
    }

    &__wrapper {
      position: relative;
      max-width: calc(100vw - 32px);
      max-height: calc(100vh - 32px);
      background: var(--su-bg-color-overlay);
      border-radius: var(--su-border-radius-base);
      box-shadow: var(--su-box-shadow-dark);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--su-border-color-lighter);

      &.is-center {
        justify-content: center;
        text-align: center;
      }
    }

    &__title {
      font-size: var(--su-font-size-large);
      font-weight: 600;
      color: var(--su-text-color-primary);
      line-height: 1.4;
    }

    &__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--su-text-color-secondary);
      padding: 4px;
      border-radius: var(--su-border-radius-small);
      transition: all var(--su-transition-duration-fast);

      &:hover {
        color: var(--su-color-primary);
        background: var(--su-fill-color-light);
      }
    }

    &__body {
      padding: 20px;
      overflow-y: auto;
      flex: 1;
    }

    &__footer {
      padding: 12px 20px;
      border-top: 1px solid var(--su-border-color-lighter);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;

      &.is-center {
        justify-content: center;
      }
    }
  }
</style>
