<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ComponentType } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    /** 类型 */
    type?: ComponentType
    /** 标题 */
    title?: string
    /** 描述（详细内容） */
    description?: string
    /** 是否可关闭 */
    closable?: boolean
    /** 是否显示图标 */
    showIcon?: boolean
    /** 是否居中 */
    center?: boolean
    /** 主题 */
    effect?: 'light' | 'dark'
    /** 关闭事件 */
    onclose?: () => void
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('alert')

  let {
    type = 'info',
    title = '',
    description = '',
    closable = true,
    showIcon = false,
    center = false,
    effect = 'light',
    onclose,
    class: className = '',
  }: Props = $props()

  let visible = $state(true)

  const iconMap: Record<string, string> = {
    success: 'circle-check',
    warning: 'warning',
    danger: 'circle-close',
    info: 'info',
    primary: 'info',
  }

  let classes = $derived(
    [ns.b(), ns.m(type), ns.m(effect), ns.is('center', center), className]
      .filter(Boolean)
      .join(' '),
  )

  function close() {
    visible = false
    onclose?.()
  }
</script>

{#if visible}
  <div class={classes} role="alert">
    {#if showIcon}
      <span class={ns.e('icon')}>
        <Icon name={iconMap[type]} size={description ? 24 : 16} />
      </span>
    {/if}

    <div class={ns.e('content')}>
      <span class={ns.e('title')} class:is-bold={!!description}>{title}</span>
      {#if description}
        <p class={ns.e('description')}>{description}</p>
      {/if}
    </div>

    {#if closable}
      <button class={ns.e('close')} onclick={close}>
        <Icon name="close" size={14} />
      </button>
    {/if}
  </div>
{/if}

<style lang="scss">
  .su-alert {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 8px 16px;
    border-radius: var(--su-border-radius-base);
    position: relative;
    overflow: hidden;

    &.is-center {
      justify-content: center;
      text-align: center;
    }

    @each $type in primary, success, warning, danger, info {
      &--#{$type}.su-alert--light {
        background: var(--su-color-#{$type}-light-9);
        color: var(--su-color-#{$type});
      }

      &--#{$type}.su-alert--dark {
        background: var(--su-color-#{$type});
        color: #fff;
      }
    }

    &__icon {
      display: inline-flex;
      flex-shrink: 0;
      margin-top: 2px;
    }

    &__content {
      flex: 1;
      min-width: 0;
    }

    &__title {
      font-size: var(--su-font-size-base);
      line-height: 1.5;

      &.is-bold {
        font-weight: 700;
        font-size: var(--su-font-size-medium);
      }
    }

    &__description {
      margin: 4px 0 0;
      font-size: var(--su-font-size-base);
      opacity: 0.8;
    }

    &__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      opacity: 0.6;
      color: inherit;
      padding: 4px;
      flex-shrink: 0;

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
