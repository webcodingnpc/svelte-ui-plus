<script lang="ts" module>
  import type { ComponentType } from 'svelte'

  export interface MessageBoxOptions {
    /** 标题 */
    title?: string
    /** 消息内容 */
    message?: string
    /** 类型 */
    type?: 'info' | 'success' | 'warning' | 'error'
    /** 是否显示输入框 */
    showInput?: boolean
    /** 输入框占位文本 */
    inputPlaceholder?: string
    /** 输入框默认值 */
    inputValue?: string
    /** 确认按钮文字 */
    confirmButtonText?: string
    /** 取消按钮文字 */
    cancelButtonText?: string
    /** 是否显示取消按钮 */
    showCancelButton?: boolean
    /** 是否可通过点击遮罩关闭 */
    closeOnClickModal?: boolean
    /** 是否可通过 ESC 关闭 */
    closeOnPressEscape?: boolean
  }

  interface MessageBoxResult {
    action: 'confirm' | 'cancel'
    value?: string
  }

  let currentResolve: ((value: MessageBoxResult) => void) | null = null
  let currentReject: ((reason?: any) => void) | null = null
  let currentOptions: MessageBoxOptions | null = $state(null)
  let visible = $state(false)
  let inputVal = $state('')

  function showMessageBox(options: MessageBoxOptions): Promise<MessageBoxResult> {
    return new Promise((resolve, reject) => {
      currentResolve = resolve
      currentReject = reject
      currentOptions = options
      inputVal = options.inputValue ?? ''
      visible = true
    })
  }

  function handleConfirm() {
    visible = false
    currentResolve?.({ action: 'confirm', value: inputVal })
    currentResolve = null
    currentReject = null
  }

  function handleCancel() {
    visible = false
    currentReject?.({ action: 'cancel' })
    currentResolve = null
    currentReject = null
  }

  function handleOverlayClick() {
    if (currentOptions?.closeOnClickModal !== false) {
      handleCancel()
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && currentOptions?.closeOnPressEscape !== false) {
      handleCancel()
    }
  }

  /** alert 弹框 */
  export function msgAlert(message: string, title = '提示', options?: Partial<MessageBoxOptions>) {
    return showMessageBox({ title, message, showCancelButton: false, type: 'info', ...options })
  }

  /** confirm 确认框 */
  export function msgConfirm(message: string, title = '提示', options?: Partial<MessageBoxOptions>) {
    return showMessageBox({ title, message, showCancelButton: true, type: 'warning', ...options })
  }

  /** prompt 输入框 */
  export function msgPrompt(message: string, title = '提示', options?: Partial<MessageBoxOptions>) {
    return showMessageBox({ title, message, showInput: true, showCancelButton: true, ...options })
  }
</script>

<script lang="ts">
  import { useNamespace } from '../../utils/bem'

  const ns = useNamespace('message-box')
</script>

<svelte:window onkeydown={handleKeydown} />

{#if visible && currentOptions}
  <div class={ns.e('overlay')} onclick={handleOverlayClick}></div>
  <div class={ns.b()} role="dialog" aria-modal="true">
    <div class={ns.e('header')}>
      <span class={ns.e('title')}>{currentOptions.title || '提示'}</span>
      <button class={ns.e('close')} onclick={handleCancel} aria-label="关闭">
        <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
          <path d="M557.312 512l209.664-209.664a32 32 0 0 0-45.312-45.312L512 466.688 302.336 257.024a32 32 0 0 0-45.312 45.312L466.688 512 257.024 721.664a32 32 0 0 0 45.312 45.312L512 557.312l209.664 209.664a32 32 0 0 0 45.312-45.312L557.312 512z" />
        </svg>
      </button>
    </div>
    <div class={ns.e('body')}>
      {#if currentOptions.type}
        <span class="{ns.e('icon')} {ns.em('icon', currentOptions.type)}">
          {#if currentOptions.type === 'success'}
            <svg viewBox="0 0 1024 1024" width="24" height="24" fill="currentColor"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.272 54.336l126.72 126.72a38.272 38.272 0 0 0 54.272 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z" /></svg>
          {:else if currentOptions.type === 'warning'}
            <svg viewBox="0 0 1024 1024" width="24" height="24" fill="currentColor"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z" /></svg>
          {:else if currentOptions.type === 'error'}
            <svg viewBox="0 0 1024 1024" width="24" height="24" fill="currentColor"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" /></svg>
          {:else}
            <svg viewBox="0 0 1024 1024" width="24" height="24" fill="currentColor"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm32 664V468a32 32 0 0 0-64 0v260a32 32 0 0 0 64 0zm-32-404a40 40 0 1 0 0-80 40 40 0 0 0 0 80z" /></svg>
          {/if}
        </span>
      {/if}
      <p class={ns.e('message')}>{currentOptions.message || ''}</p>
      {#if currentOptions.showInput}
        <input
          class={ns.e('input')}
          bind:value={inputVal}
          placeholder={currentOptions.inputPlaceholder || ''}
        />
      {/if}
    </div>
    <div class={ns.e('footer')}>
      {#if currentOptions.showCancelButton}
        <button class="{ns.e('btn')} {ns.em('btn', 'cancel')}" onclick={handleCancel}>
          {currentOptions.cancelButtonText || '取消'}
        </button>
      {/if}
      <button class="{ns.e('btn')} {ns.em('btn', 'confirm')}" onclick={handleConfirm}>
        {currentOptions.confirmButtonText || '确定'}
      </button>
    </div>
  </div>
{/if}

<style lang="scss">
  .su-message-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2001;
    width: 420px;
    max-width: calc(100vw - 32px);
    background-color: var(--su-bg-color);
    border-radius: var(--su-border-radius-base);
    box-shadow: var(--su-box-shadow);
    overflow: hidden;

    &__overlay {
      position: fixed;
      inset: 0;
      z-index: 2000;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
    }

    &__title {
      font-size: 18px;
      font-weight: 500;
      color: var(--su-text-color-primary);
    }

    &__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--su-text-color-regular);
      padding: 4px;
      border-radius: 4px;

      &:hover {
        color: var(--su-color-primary);
        background-color: var(--su-fill-color-light);
      }
    }

    &__body {
      padding: 12px 20px 20px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    &__icon {
      flex-shrink: 0;

      &--success { color: var(--su-color-success); }
      &--warning { color: var(--su-color-warning); }
      &--error { color: var(--su-color-danger); }
      &--info { color: var(--su-color-info); }
    }

    &__message {
      margin: 0;
      font-size: 14px;
      color: var(--su-text-color-regular);
      line-height: 1.6;
      flex: 1;
    }

    &__input {
      display: block;
      width: 100%;
      margin-top: 12px;
      padding: 8px 12px;
      font-size: 14px;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      outline: none;
      transition: border-color 0.15s ease;

      &:focus {
        border-color: var(--su-color-primary);
      }
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 12px 20px;
    }

    &__btn {
      padding: 8px 20px;
      font-size: 14px;
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
          background-color: var(--su-color-primary-light-9);
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
