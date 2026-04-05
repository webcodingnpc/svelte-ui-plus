<script lang="ts">
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 绑定值（当前选中的 Radio 值） */
    value?: string | number | boolean
    /** Radio 对应的值 */
    label?: string | number | boolean
    /** 显示文本 */
    text?: string
    /** 是否禁用 */
    disabled?: boolean
    /** 尺寸 */
    size?: ComponentSize
    /** 变更事件 */
    onchange?: (value: string | number | boolean) => void
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('radio')

  let {
    value = $bindable(''),
    label = '',
    text = '',
    disabled = false,
    size = 'default',
    onchange,
    class: className = '',
  }: Props = $props()

  let isChecked = $derived(value === label)

  let classes = $derived(
    [
      ns.b(),
      ns.m(size !== 'default' ? size : undefined),
      ns.is('checked', isChecked),
      ns.is('disabled', disabled),
      className,
    ]
      .filter(Boolean)
      .join(' '),
  )

  function select() {
    if (disabled || isChecked) return
    value = label
    onchange?.(label)
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      select()
    }
  }
</script>

<label class={classes} tabindex={disabled ? -1 : 0} onkeydown={handleKeydown}>
  <span class={ns.e('input')} onclick={select}>
    <span class={ns.e('inner')}></span>
    <input type="radio" class={ns.e('original')} checked={isChecked} {disabled} tabindex={-1} />
  </span>
  {#if text || label}
    <span class={ns.e('label')}>{text || label}</span>
  {/if}
</label>

<style lang="scss">
  .su-radio {
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
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 1px solid var(--su-border-color);
      border-radius: 50%;
      background: var(--su-fill-color-blank);
      position: relative;
      transition: all var(--su-transition-duration-fast);

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #fff;
        transform: translate(-50%, -50%) scale(0);
        transition: transform var(--su-transition-duration-fast);
      }
    }

    &__original {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      margin: 0;
    }

    &.is-checked .su-radio__inner {
      background: var(--su-color-primary);
      border-color: var(--su-color-primary);

      &::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }

    &:hover .su-radio__inner {
      border-color: var(--su-color-primary);
    }

    &.is-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &__label {
      line-height: 1;
    }
  }
</style>
