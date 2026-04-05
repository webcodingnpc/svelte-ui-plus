<script lang="ts">
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    value?: number
    min?: number
    max?: number
    step?: number
    stepStrictly?: boolean
    precision?: number
    size?: ComponentSize
    disabled?: boolean
    controls?: boolean
    controlsPosition?: '' | 'right'
    placeholder?: string
    readonly?: boolean
    oninput?: (val: number | undefined) => void
    onchange?: (val: number | undefined) => void
    class?: string
  }

  const ns = useNamespace('input-number')
  let {
    value = $bindable(undefined),
    min = -Infinity,
    max = Infinity,
    step = 1,
    stepStrictly = false,
    precision,
    size = 'default',
    disabled = false,
    controls = true,
    controlsPosition = '',
    placeholder = '',
    readonly = false,
    oninput,
    onchange,
    class: className = '',
  }: Props = $props() as Props

  let classes = $derived(
    [
      ns.b(),
      ns.m(size !== 'default' ? size : undefined),
      ns.is('disabled', disabled),
      ns.is('without-controls', !controls),
      ns.is('controls-right', controlsPosition === 'right'),
      className,
    ]
      .filter(Boolean)
      .join(' ')
  )

  let isMinDisabled = $derived(value !== undefined && value <= min)
  let isMaxDisabled = $derived(value !== undefined && value >= max)

  function toPrecision(val: number): number {
    if (precision !== undefined) {
      return parseFloat(val.toFixed(precision))
    }
    return val
  }

  function clamp(val: number): number {
    return Math.min(max, Math.max(min, val))
  }

  function decrease() {
    if (disabled || readonly || isMinDisabled) return
    const newVal = toPrecision(clamp((value ?? 0) - step))
    value = newVal
    oninput?.(newVal)
    onchange?.(newVal)
  }

  function increase() {
    if (disabled || readonly || isMaxDisabled) return
    const newVal = toPrecision(clamp((value ?? 0) + step))
    value = newVal
    oninput?.(newVal)
    onchange?.(newVal)
  }

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement
    const raw = target.value
    if (raw === '' || raw === '-') {
      value = undefined
      oninput?.(undefined)
      return
    }
    let num = parseFloat(raw)
    if (isNaN(num)) return
    if (stepStrictly) {
      num = Math.round(num / step) * step
    }
    num = toPrecision(clamp(num))
    value = num
    oninput?.(num)
  }

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement
    const raw = target.value
    if (raw === '') {
      value = undefined
      onchange?.(undefined)
      return
    }
    let num = parseFloat(raw)
    if (isNaN(num)) {
      target.value = value !== undefined ? String(value) : ''
      return
    }
    num = toPrecision(clamp(num))
    value = num
    target.value = String(num)
    onchange?.(num)
  }

  let displayValue = $derived(value !== undefined ? String(value) : '')
</script>

<div class={classes}>
  {#if controls}
    <button
      class="{ns.e('decrease')} {isMinDisabled ? 'is-disabled' : ''}"
      onclick={decrease}
      disabled={disabled || isMinDisabled}
      aria-label="减少"
      type="button"
    >
      <Icon name="minus" size={12} />
    </button>
  {/if}
  <div class={ns.e('wrapper')}>
    <input
      class={ns.e('inner')}
      type="text"
      inputmode="decimal"
      value={displayValue}
      {placeholder}
      {disabled}
      {readonly}
      oninput={handleInput}
      onchange={handleChange}
      aria-valuemin={min !== -Infinity ? min : undefined}
      aria-valuemax={max !== Infinity ? max : undefined}
      aria-valuenow={value}
    />
  </div>
  {#if controls}
    <button
      class="{ns.e('increase')} {isMaxDisabled ? 'is-disabled' : ''}"
      onclick={increase}
      disabled={disabled || isMaxDisabled}
      aria-label="增加"
      type="button"
    >
      <Icon name="plus" size={12} />
    </button>
  {/if}
</div>

<style lang="scss">
  .su-input-number {
    display: inline-flex;
    align-items: center;
    width: 150px;
    line-height: calc(var(--su-component-size) - 2px);

    &__wrapper {
      flex: 1;
      min-width: 0;
    }

    &__inner {
      width: 100%;
      height: var(--su-component-size);
      padding: 0 12px;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      text-align: center;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      background: var(--su-bg-color);
      outline: none;
      box-sizing: border-box;
      transition: border-color var(--su-transition-duration-fast) ease;
      -moz-appearance: textfield;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &:focus {
        border-color: var(--su-color-primary);
      }
    }

    &__decrease,
    &__increase {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--su-component-size);
      height: var(--su-component-size);
      border: 1px solid var(--su-border-color);
      background: var(--su-fill-color-light);
      color: var(--su-text-color-regular);
      cursor: pointer;
      user-select: none;
      transition: all var(--su-transition-duration-fast) ease;

      &:hover:not(.is-disabled) {
        color: var(--su-color-primary);
      }

      &.is-disabled {
        color: var(--su-text-color-disabled);
        cursor: not-allowed;
      }
    }

    &__decrease {
      border-radius: var(--su-border-radius-base) 0 0 var(--su-border-radius-base);
      border-right: none;
    }

    &__increase {
      border-radius: 0 var(--su-border-radius-base) var(--su-border-radius-base) 0;
      border-left: none;
    }

    &.is-disabled &__inner {
      background-color: var(--su-fill-color-light);
      color: var(--su-text-color-disabled);
      cursor: not-allowed;
    }

    &--large {
      width: 180px;

      .su-input-number__inner {
        height: var(--su-component-size-large);
      }

      .su-input-number__decrease,
      .su-input-number__increase {
        width: var(--su-component-size-large);
        height: var(--su-component-size-large);
      }
    }

    &--small {
      width: 120px;

      .su-input-number__inner {
        height: var(--su-component-size-small);
        font-size: var(--su-font-size-small);
      }

      .su-input-number__decrease,
      .su-input-number__increase {
        width: var(--su-component-size-small);
        height: var(--su-component-size-small);
      }
    }

    &.is-controls-right {
      .su-input-number__inner {
        border-radius: var(--su-border-radius-base) 0 0 var(--su-border-radius-base);
      }

      .su-input-number__decrease,
      .su-input-number__increase {
        width: var(--su-component-size);
        height: calc(var(--su-component-size) / 2);
        border-left: 1px solid var(--su-border-color);
        border-right: none;
      }

      .su-input-number__decrease {
        border-radius: 0;
        border-top: none;
        border-bottom-right-radius: var(--su-border-radius-base);
      }

      .su-input-number__increase {
        border-radius: 0;
        border-bottom: none;
        border-top-right-radius: var(--su-border-radius-base);
      }
    }

    &.is-without-controls &__inner {
      border-radius: var(--su-border-radius-base);
    }
  }
</style>
