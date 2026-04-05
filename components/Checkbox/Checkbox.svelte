<script lang="ts">
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    /** 绑定值 */
    checked?: boolean
    /** 标签文本 */
    label?: string
    /** 是否禁用 */
    disabled?: boolean
    /** 尺寸 */
    size?: ComponentSize
    /** 是否半选 */
    indeterminate?: boolean
    /** 变更事件 */
    onchange?: (checked: boolean) => void
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('checkbox')

  let {
    checked = $bindable(false),
    label = '',
    disabled = false,
    size = 'default',
    indeterminate = false,
    onchange,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [
      ns.b(),
      ns.m(size !== 'default' ? size : undefined),
      ns.is('checked', checked),
      ns.is('disabled', disabled),
      ns.is('indeterminate', indeterminate),
      className,
    ]
      .filter(Boolean)
      .join(' '),
  )

  function toggle() {
    if (disabled) return
    checked = !checked
    onchange?.(checked)
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      toggle()
    }
  }
</script>

<label class={classes} tabindex={disabled ? -1 : 0} onkeydown={handleKeydown}>
  <span class={ns.e('input')} onclick={toggle}>
    <span class={ns.e('inner')}>
      {#if checked}
        <Icon name="check" size={12} />
      {:else if indeterminate}
        <Icon name="minus" size={12} />
      {/if}
    </span>
    <input type="checkbox" class={ns.e('original')} {checked} {disabled} tabindex={-1} />
  </span>
  {#if label}
    <span class={ns.e('label')}>{label}</span>
  {/if}
</label>

<style lang="scss">
  .su-checkbox {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
    font-size: var(--su-font-size-base);
    color: var(--su-text-color-regular);
    outline: none;
    height: var(--su-component-size);

    &__input {
      display: inline-flex;
      align-items: center;
    }

    &__inner {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-small);
      background: var(--su-fill-color-blank);
      transition: all var(--su-transition-duration-fast);
      color: #fff;
    }

    &__original {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      margin: 0;
    }

    &.is-checked .su-checkbox__inner {
      background: var(--su-color-primary);
      border-color: var(--su-color-primary);
    }

    &.is-indeterminate .su-checkbox__inner {
      background: var(--su-color-primary);
      border-color: var(--su-color-primary);
    }

    &:hover .su-checkbox__inner {
      border-color: var(--su-color-primary);
    }

    &.is-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &__label {
      line-height: 1;
    }

    // 尺寸
    &--large {
      font-size: var(--su-font-size-medium);

      .su-checkbox__inner {
        width: 18px;
        height: 18px;
      }
    }

    &--small {
      font-size: var(--su-font-size-extra-small);
      height: var(--su-component-size-small);

      .su-checkbox__inner {
        width: 14px;
        height: 14px;
      }
    }
  }
</style>
