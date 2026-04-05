<script lang="ts">
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'
  import { fly, fade } from 'svelte/transition'

  interface Props {
    /** 消息类型 */
    type?: 'success' | 'warning' | 'info' | 'danger'
    /** 消息内容 */
    message?: string
    /** 偏移量（从顶部） */
    offset?: number
    /** 是否显示关闭按钮 */
    showClose?: boolean
    /** 关闭回调 */
    onclose?: () => void
  }

  const ns = useNamespace('message')

  let {
    type = 'info',
    message = '',
    offset = 20,
    showClose = false,
    onclose,
  }: Props = $props()

  const iconMap: Record<string, string> = {
    success: 'circle-check',
    warning: 'warning',
    danger: 'circle-close',
    info: 'info',
  }
</script>

<div
  class="{ns.b()} {ns.m(type)}"
  style="top: {offset}px"
  role="alert"
  transition:fly={{ y: -40, duration: 300 }}
>
  <span class={ns.e('icon')}>
    <Icon name={iconMap[type]} size={18} />
  </span>
  <span class={ns.e('content')}>{message}</span>
  {#if showClose}
    <button class={ns.e('close')} onclick={onclose}>
      <Icon name="close" size={14} />
    </button>
  {/if}
</div>

<style lang="scss">
  .su-message {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border-radius: var(--su-border-radius-base);
    box-shadow: var(--su-box-shadow-light);
    pointer-events: auto;
    min-width: 200px;
    max-width: 80vw;

    @each $type in success, warning, danger, info {
      &--#{$type} {
        background: var(--su-color-#{$type}-light-9);
        border: 1px solid var(--su-color-#{$type}-light-7);
        color: var(--su-color-#{$type});
      }
    }

    &__icon {
      display: inline-flex;
      flex-shrink: 0;
    }

    &__content {
      font-size: var(--su-font-size-base);
      line-height: 1.5;
      flex: 1;
    }

    &__close {
      display: inline-flex;
      background: none;
      border: none;
      cursor: pointer;
      color: inherit;
      opacity: 0.6;
      padding: 2px;

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
