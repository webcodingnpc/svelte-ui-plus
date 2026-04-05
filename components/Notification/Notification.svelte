<script lang="ts" module>
  export interface NotificationOptions {
    /** 标题 */
    title?: string
    /** 消息内容 */
    message?: string
    /** 类型 */
    type?: 'info' | 'success' | 'warning' | 'error'
    /** 显示时长（ms），0 表示不自动关闭 */
    duration?: number
    /** 位置 */
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    /** 偏移量 */
    offset?: number
    /** 是否显示关闭按钮 */
    showClose?: boolean
    /** 关闭回调 */
    onclose?: () => void
  }

  interface NotificationInstance {
    id: string
    options: NotificationOptions
    timer?: ReturnType<typeof setTimeout>
  }

  let instances: NotificationInstance[] = $state([])
  let seed = 0

  function addNotification(options: NotificationOptions): { close: () => void } {
    const id = `su-notification-${seed++}`
    const duration = options.duration ?? 4500
    const instance: NotificationInstance = { id, options }

    if (duration > 0) {
      instance.timer = setTimeout(() => {
        removeNotification(id)
        options.onclose?.()
      }, duration)
    }

    instances = [...instances, instance]
    return {
      close: () => removeNotification(id),
    }
  }

  function removeNotification(id: string) {
    const inst = instances.find((i) => i.id === id)
    if (inst?.timer) clearTimeout(inst.timer)
    instances = instances.filter((i) => i.id !== id)
    inst?.options.onclose?.()
  }

  /** 通知 */
  export function notify(options: NotificationOptions | string) {
    const opts = typeof options === 'string' ? { message: options } : options
    return addNotification(opts)
  }

  notify.success = (options: NotificationOptions | string) => {
    const opts = typeof options === 'string' ? { message: options } : options
    return addNotification({ ...opts, type: 'success' })
  }
  notify.warning = (options: NotificationOptions | string) => {
    const opts = typeof options === 'string' ? { message: options } : options
    return addNotification({ ...opts, type: 'warning' })
  }
  notify.error = (options: NotificationOptions | string) => {
    const opts = typeof options === 'string' ? { message: options } : options
    return addNotification({ ...opts, type: 'error' })
  }
  notify.info = (options: NotificationOptions | string) => {
    const opts = typeof options === 'string' ? { message: options } : options
    return addNotification({ ...opts, type: 'info' })
  }
</script>

<script lang="ts">
  import { useNamespace } from '../../utils/bem'

  const ns = useNamespace('notification')

  function getPositionInstances(pos: string) {
    return instances.filter((i) => (i.options.position || 'top-right') === pos)
  }

  function getTypeColor(type?: string) {
    switch (type) {
      case 'success': return 'var(--su-color-success)'
      case 'warning': return 'var(--su-color-warning)'
      case 'error': return 'var(--su-color-danger)'
      case 'info': return 'var(--su-color-info)'
      default: return 'var(--su-color-primary)'
    }
  }

  const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left']
</script>

{#each positions as pos}
  {@const posInstances = getPositionInstances(pos)}
  {#if posInstances.length > 0}
    <div
      class="{ns.b()} {ns.m(pos)}"
      style="{pos.includes('right') ? 'right:16px' : 'left:16px'};{pos.includes('top') ? 'top:16px' : 'bottom:16px'}"
    >
      {#each posInstances as inst, i (inst.id)}
        <div
          class={ns.e('item')}
          style="margin-{pos.includes('top') ? 'top' : 'bottom'}:{i > 0 ? 12 : 0}px"
        >
          {#if inst.options.type}
            <span class={ns.e('icon')} style="color:{getTypeColor(inst.options.type)}">
              {#if inst.options.type === 'success'}
                <svg viewBox="0 0 1024 1024" width="24" height="24" fill="currentColor"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.272 54.336l126.72 126.72a38.272 38.272 0 0 0 54.272 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z" /></svg>
              {:else if inst.options.type === 'warning'}
                <svg viewBox="0 0 1024 1024" width="24" height="24" fill="currentColor"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z" /></svg>
              {:else if inst.options.type === 'error'}
                <svg viewBox="0 0 1024 1024" width="24" height="24" fill="currentColor"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" /></svg>
              {:else}
                <svg viewBox="0 0 1024 1024" width="24" height="24" fill="currentColor"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm32 664V468a32 32 0 0 0-64 0v260a32 32 0 0 0 64 0zm-32-404a40 40 0 1 0 0-80 40 40 0 0 0 0 80z" /></svg>
              {/if}
            </span>
          {/if}
          <div class={ns.e('content')}>
            {#if inst.options.title}
              <div class={ns.e('title')}>{inst.options.title}</div>
            {/if}
            <div class={ns.e('message')}>{inst.options.message || ''}</div>
          </div>
          {#if inst.options.showClose !== false}
            <button class={ns.e('close')} onclick={() => removeNotification(inst.id)}>
              <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
                <path d="M557.312 512l209.664-209.664a32 32 0 0 0-45.312-45.312L512 466.688 302.336 257.024a32 32 0 0 0-45.312 45.312L466.688 512 257.024 721.664a32 32 0 0 0 45.312 45.312L512 557.312l209.664 209.664a32 32 0 0 0 45.312-45.312L557.312 512z" />
              </svg>
            </button>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
{/each}

<style lang="scss">
  .su-notification {
    position: fixed;
    z-index: 2050;
    display: flex;
    flex-direction: column;

    &--top-right,
    &--top-left {
      flex-direction: column;
    }

    &--bottom-right,
    &--bottom-left {
      flex-direction: column-reverse;
    }

    &__item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      width: 330px;
      padding: 14px 20px;
      background-color: var(--su-bg-color);
      border-radius: var(--su-border-radius-base);
      box-shadow: var(--su-box-shadow-light);
      border: 1px solid var(--su-border-color-lighter);
      transition: all 0.3s ease;
    }

    &__icon {
      flex-shrink: 0;
      display: inline-flex;
    }

    &__content {
      flex: 1;
      min-width: 0;
    }

    &__title {
      font-size: 16px;
      font-weight: 500;
      color: var(--su-text-color-primary);
      margin-bottom: 4px;
    }

    &__message {
      font-size: 14px;
      color: var(--su-text-color-regular);
      line-height: 1.6;
      word-break: break-word;
    }

    &__close {
      flex-shrink: 0;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--su-text-color-placeholder);
      padding: 2px;
      border-radius: 4px;

      &:hover {
        color: var(--su-text-color-primary);
        background-color: var(--su-fill-color-light);
      }
    }
  }
</style>
