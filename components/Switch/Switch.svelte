<script lang="ts">
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 绑定值 */
    value?: boolean
    /** 是否禁用 */
    disabled?: boolean
    /** 尺寸 */
    size?: ComponentSize
    /** 打开时的文字 */
    activeText?: string
    /** 关闭时的文字 */
    inactiveText?: string
    /** 打开时的颜色 */
    activeColor?: string
    /** 关闭时的颜色 */
    inactiveColor?: string
    /** 宽度 */
    width?: number
    /** 变更事件 */
    onchange?: (value: boolean) => void
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('switch')

  let {
    value = $bindable(false),
    disabled = false,
    size = 'default',
    activeText = '',
    inactiveText = '',
    activeColor,
    inactiveColor,
    width,
    onchange,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [
      ns.b(),
      ns.m(size !== 'default' ? size : undefined),
      ns.is('checked', value),
      ns.is('disabled', disabled),
      className,
    ]
      .filter(Boolean)
      .join(' '),
  )

  let style = $derived(
    [
      value && activeColor ? `--su-switch-on-color: ${activeColor}` : '',
      !value && inactiveColor ? `--su-switch-off-color: ${inactiveColor}` : '',
      width ? `width: ${width}px` : '',
    ]
      .filter(Boolean)
      .join('; '),
  )

  function toggle() {
    if (disabled) return
    value = !value
    onchange?.(value)
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }
</script>

<div
  class={classes}
  {style}
  role="switch"
  aria-checked={value}
  tabindex={disabled ? -1 : 0}
  onclick={toggle}
  onkeydown={handleKeydown}
>
  {#if inactiveText}
    <span class="{ns.e('label')} {ns.e('label--left')}" class:is-active={!value}>
      {inactiveText}
    </span>
  {/if}

  <span class={ns.e('core')}>
    <span class={ns.e('action')}></span>
  </span>

  {#if activeText}
    <span class="{ns.e('label')} {ns.e('label--right')}" class:is-active={value}>
      {activeText}
    </span>
  {/if}
</div>

<style lang="scss">
  .su-switch {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
    outline: none;

    &__core {
      display: inline-flex;
      align-items: center;
      position: relative;
      width: 40px;
      height: 20px;
      border-radius: 10px;
      background: var(--su-switch-off-color, var(--su-border-color));
      transition: background var(--su-transition-duration-fast);
    }

    &__action {
      position: absolute;
      left: 2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      transition: transform var(--su-transition-duration-fast);
    }

    &.is-checked .su-switch__core {
      background: var(--su-switch-on-color, var(--su-color-primary));
    }

    &.is-checked .su-switch__action {
      transform: translateX(20px);
    }

    &__label {
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-secondary);
      transition: color var(--su-transition-duration-fast);

      &.is-active {
        color: var(--su-text-color-primary);
      }
    }

    &.is-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    // 尺寸
    &--large .su-switch__core {
      width: 50px;
      height: 24px;
      border-radius: 12px;
    }

    &--large .su-switch__action {
      width: 20px;
      height: 20px;
    }

    &--large.is-checked .su-switch__action {
      transform: translateX(26px);
    }

    &--small .su-switch__core {
      width: 30px;
      height: 16px;
      border-radius: 8px;
    }

    &--small .su-switch__action {
      width: 12px;
      height: 12px;
    }

    &--small.is-checked .su-switch__action {
      transform: translateX(14px);
    }
  }
</style>
