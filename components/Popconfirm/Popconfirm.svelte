<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import type { Placement } from '../../utils/types'

  interface Props {
    /** 标题 */
    title?: string
    /** 确认按钮文字 */
    confirmButtonText?: string
    /** 取消按钮文字 */
    cancelButtonText?: string
    /** 图标类型 */
    iconType?: 'info' | 'success' | 'warning' | 'error'
    /** 是否隐藏图标 */
    hideIcon?: boolean
    /** 位置 */
    placement?: Placement
    /** 宽度 */
    width?: number
    /** 确认事件 */
    onconfirm?: () => void
    /** 取消事件 */
    oncancel?: () => void
    /** 触发器内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('popconfirm')

  let {
    title = '确定执行此操作吗？',
    confirmButtonText = '确定',
    cancelButtonText = '取消',
    iconType = 'warning',
    hideIcon = false,
    placement = 'top',
    width = 200,
    onconfirm,
    oncancel,
    children,
    class: className = '',
  }: Props = $props()

  let visible = $state(false)
  let triggerRef: HTMLElement | undefined = $state()

  function show() {
    visible = true
  }

  function hide() {
    visible = false
  }

  function handleConfirm() {
    hide()
    onconfirm?.()
  }

  function handleCancel() {
    hide()
    oncancel?.()
  }

  function handleClickOutside(e: MouseEvent) {
    if (triggerRef && !triggerRef.contains(e.target as Node)) {
      hide()
    }
  }

  $effect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  })

  function getTypeColor(type: string) {
    switch (type) {
      case 'success': return 'var(--su-color-success)'
      case 'warning': return 'var(--su-color-warning)'
      case 'error': return 'var(--su-color-danger)'
      default: return 'var(--su-color-info)'
    }
  }
</script>

<div class="{ns.b()} {className}" bind:this={triggerRef}>
  <div class={ns.e('trigger')} onclick={show}>
    {@render children?.()}
  </div>
  {#if visible}
    <div class="{ns.e('popper')} {ns.em('popper', placement)}" style="width:{width}px">
      <div class={ns.e('body')}>
        {#if !hideIcon}
          <span class={ns.e('icon')} style="color:{getTypeColor(iconType)}">
            <svg viewBox="0 0 1024 1024" width="16" height="16" fill="currentColor">
              <path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z" />
            </svg>
          </span>
        {/if}
        <span class={ns.e('title')}>{title}</span>
      </div>
      <div class={ns.e('footer')}>
        <button class="{ns.e('btn')} {ns.em('btn', 'cancel')}" onclick={handleCancel}>
          {cancelButtonText}
        </button>
        <button class="{ns.e('btn')} {ns.em('btn', 'confirm')}" onclick={handleConfirm}>
          {confirmButtonText}
        </button>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .su-popconfirm {
    position: relative;
    display: inline-block;

    &__trigger {
      display: inline-block;
    }

    &__popper {
      position: absolute;
      z-index: 2000;
      background-color: var(--su-bg-color);
      border-radius: var(--su-border-radius-base);
      box-shadow: var(--su-box-shadow-light);
      border: 1px solid var(--su-border-color-lighter);
      padding: 16px;

      &--top {
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
      }

      &--bottom {
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
      }

      &--left {
        right: calc(100% + 8px);
        top: 50%;
        transform: translateY(-50%);
      }

      &--right {
        left: calc(100% + 8px);
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &__body {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 12px;
    }

    &__icon {
      flex-shrink: 0;
      display: inline-flex;
      margin-top: 1px;
    }

    &__title {
      font-size: 14px;
      color: var(--su-text-color-primary);
      line-height: 1.5;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    &__btn {
      padding: 5px 12px;
      font-size: 12px;
      border-radius: var(--su-border-radius-base);
      cursor: pointer;
      transition: all 0.15s ease;

      &--cancel {
        background-color: var(--su-bg-color);
        border: 1px solid var(--su-border-color);
        color: var(--su-text-color-regular);

        &:hover {
          color: var(--su-color-primary);
          border-color: var(--su-color-primary-light-7);
        }
      }

      &--confirm {
        background-color: var(--su-color-primary);
        border: 1px solid var(--su-color-primary);
        color: #fff;

        &:hover {
          opacity: 0.85;
        }
      }
    }
  }
</style>
