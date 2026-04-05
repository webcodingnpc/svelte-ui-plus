<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ComponentSize, ComponentType } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    /** 按钮类型 */
    type?: ComponentType | 'default'
    /** 按钮尺寸 */
    size?: ComponentSize
    /** 是否朴素按钮 */
    plain?: boolean
    /** 是否圆角按钮 */
    round?: boolean
    /** 是否圆形按钮 */
    circle?: boolean
    /** 是否禁用 */
    disabled?: boolean
    /** 是否加载中 */
    loading?: boolean
    /** 图标名称 */
    icon?: string
    /** 原生 type */
    nativeType?: 'button' | 'submit' | 'reset'
    /** 点击事件 */
    onclick?: (e: MouseEvent) => void
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('button')

  let {
    type = 'default',
    size = 'default',
    plain = false,
    round = false,
    circle = false,
    disabled = false,
    loading = false,
    icon,
    nativeType = 'button',
    onclick,
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [
      ns.b(),
      ns.m(type),
      ns.m(size !== 'default' ? size : undefined),
      ns.is('plain', plain),
      ns.is('round', round),
      ns.is('circle', circle),
      ns.is('disabled', disabled),
      ns.is('loading', loading),
      className,
    ]
      .filter(Boolean)
      .join(' '),
  )
</script>

<button class={classes} type={nativeType} {disabled} {onclick}>
  {#if loading}
    <span class={ns.e('loading-icon')}>
      <Icon name="loading" />
    </span>
  {:else if icon}
    <span class={ns.e('icon')}>
      <Icon name={icon} />
    </span>
  {/if}
  {#if children}
    <span class={ns.e('text')}>
      {@render children()}
    </span>
  {/if}
</button>

<style lang="scss">
  .su-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: var(--su-component-size);
    padding: 0 16px;
    font-size: var(--su-font-size-base);
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid var(--su-border-color);
    border-radius: var(--su-border-radius-base);
    background: var(--su-fill-color-blank);
    color: var(--su-text-color-regular);
    outline: none;
    transition: all var(--su-transition-duration-fast) ease;
    user-select: none;
    -webkit-appearance: none;

    &:hover {
      color: var(--su-color-primary);
      border-color: var(--su-color-primary-light-7);
      background: var(--su-color-primary-light-9);
    }

    &:active {
      color: var(--su-color-primary-dark-2);
      border-color: var(--su-color-primary-dark-2);
    }

    // 尺寸
    &--large {
      height: var(--su-component-size-large);
      padding: 0 20px;
      font-size: var(--su-font-size-medium);
    }

    &--small {
      height: var(--su-component-size-small);
      padding: 0 8px;
      font-size: var(--su-font-size-extra-small);
    }

    // 类型
    &--primary {
      color: #fff;
      background: var(--su-color-primary);
      border-color: var(--su-color-primary);

      &:hover {
        background: var(--su-color-primary-light-3);
        border-color: var(--su-color-primary-light-3);
        color: #fff;
      }

      &:active {
        background: var(--su-color-primary-dark-2);
        border-color: var(--su-color-primary-dark-2);
      }
    }

    &--success {
      color: #fff;
      background: var(--su-color-success);
      border-color: var(--su-color-success);

      &:hover {
        background: var(--su-color-success-light-3);
        border-color: var(--su-color-success-light-3);
        color: #fff;
      }

      &:active {
        background: var(--su-color-success-dark-2);
        border-color: var(--su-color-success-dark-2);
      }
    }

    &--warning {
      color: #fff;
      background: var(--su-color-warning);
      border-color: var(--su-color-warning);

      &:hover {
        background: var(--su-color-warning-light-3);
        border-color: var(--su-color-warning-light-3);
        color: #fff;
      }

      &:active {
        background: var(--su-color-warning-dark-2);
        border-color: var(--su-color-warning-dark-2);
      }
    }

    &--danger {
      color: #fff;
      background: var(--su-color-danger);
      border-color: var(--su-color-danger);

      &:hover {
        background: var(--su-color-danger-light-3);
        border-color: var(--su-color-danger-light-3);
        color: #fff;
      }

      &:active {
        background: var(--su-color-danger-dark-2);
        border-color: var(--su-color-danger-dark-2);
      }
    }

    &--info {
      color: #fff;
      background: var(--su-color-info);
      border-color: var(--su-color-info);

      &:hover {
        background: var(--su-color-info-light-3);
        border-color: var(--su-color-info-light-3);
        color: #fff;
      }

      &:active {
        background: var(--su-color-info-dark-2);
        border-color: var(--su-color-info-dark-2);
      }
    }

    // 朴素按钮
    &.is-plain {
      &.su-button--primary {
        color: var(--su-color-primary);
        background: var(--su-color-primary-light-9);
        border-color: var(--su-color-primary-light-5);

        &:hover {
          background: var(--su-color-primary);
          border-color: var(--su-color-primary);
          color: #fff;
        }
      }

      &.su-button--success {
        color: var(--su-color-success);
        background: var(--su-color-success-light-9);
        border-color: var(--su-color-success-light-5);

        &:hover {
          background: var(--su-color-success);
          border-color: var(--su-color-success);
          color: #fff;
        }
      }

      &.su-button--warning {
        color: var(--su-color-warning);
        background: var(--su-color-warning-light-9);
        border-color: var(--su-color-warning-light-5);

        &:hover {
          background: var(--su-color-warning);
          border-color: var(--su-color-warning);
          color: #fff;
        }
      }

      &.su-button--danger {
        color: var(--su-color-danger);
        background: var(--su-color-danger-light-9);
        border-color: var(--su-color-danger-light-5);

        &:hover {
          background: var(--su-color-danger);
          border-color: var(--su-color-danger);
          color: #fff;
        }
      }

      &.su-button--info {
        color: var(--su-color-info);
        background: var(--su-color-info-light-9);
        border-color: var(--su-color-info-light-5);

        &:hover {
          background: var(--su-color-info);
          border-color: var(--su-color-info);
          color: #fff;
        }
      }
    }

    // 圆角
    &.is-round {
      border-radius: var(--su-border-radius-round);
    }

    // 圆形
    &.is-circle {
      border-radius: 50%;
      padding: 0;
      width: var(--su-component-size);

      &.su-button--large {
        width: var(--su-component-size-large);
      }

      &.su-button--small {
        width: var(--su-component-size-small);
      }
    }

    // 禁用
    &.is-disabled,
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
      pointer-events: none;
    }

    // 加载中
    &.is-loading {
      pointer-events: none;
      opacity: 0.7;
    }

    &__loading-icon {
      display: inline-flex;
      animation: su-rotate 1.5s linear infinite;
    }

    &__icon {
      display: inline-flex;
    }

    &__text {
      display: inline-flex;
    }
  }

  @keyframes su-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
