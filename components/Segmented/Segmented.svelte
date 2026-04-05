<script lang="ts">
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface SegmentedOption {
    label: string
    value: string | number
    disabled?: boolean
    icon?: string
  }

  interface Props {
    value?: string | number
    options?: (string | SegmentedOption)[]
    size?: ComponentSize
    disabled?: boolean
    block?: boolean
    onchange?: (val: string | number) => void
    class?: string
  }

  const ns = useNamespace('segmented')
  let {
    value = $bindable(''),
    options = [],
    size = 'default',
    disabled = false,
    block = false,
    onchange,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.m(size !== 'default' ? size : undefined), ns.is('disabled', disabled), ns.is('block', block), className]
      .filter(Boolean)
      .join(' ')
  )

  function normalizeOption(opt: string | SegmentedOption): SegmentedOption {
    return typeof opt === 'string' ? { label: opt, value: opt } : opt
  }

  function selectOption(opt: SegmentedOption) {
    if (disabled || opt.disabled) return
    value = opt.value
    onchange?.(opt.value)
  }
</script>

<div class={classes} role="radiogroup">
  {#each options.map(normalizeOption) as opt}
    <button
      class="{ns.e('item')} {value === opt.value ? 'is-selected' : ''} {opt.disabled ? 'is-disabled' : ''}"
      type="button"
      role="radio"
      aria-checked={value === opt.value}
      disabled={disabled || opt.disabled}
      onclick={() => selectOption(opt)}
    >
      {opt.label}
    </button>
  {/each}
</div>

<style lang="scss">
  .su-segmented {
    display: inline-flex;
    align-items: center;
    padding: 2px;
    background: var(--su-fill-color);
    border-radius: var(--su-border-radius-base);
    gap: 2px;

    &.is-block {
      display: flex;

      .su-segmented__item {
        flex: 1;
      }
    }

    &__item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 12px;
      height: calc(var(--su-component-size) - 4px);
      border: none;
      background: transparent;
      border-radius: calc(var(--su-border-radius-base) - 2px);
      cursor: pointer;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      transition: all var(--su-transition-duration-fast) ease;
      white-space: nowrap;

      &:hover:not(.is-disabled):not(.is-selected) {
        color: var(--su-text-color-primary);
      }

      &.is-selected {
        background: var(--su-bg-color);
        color: var(--su-text-color-primary);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
        font-weight: 500;
      }

      &.is-disabled {
        color: var(--su-text-color-disabled);
        cursor: not-allowed;
      }
    }

    &--large .su-segmented__item {
      height: calc(var(--su-component-size-large) - 4px);
      padding: 0 16px;
    }

    &--small .su-segmented__item {
      height: calc(var(--su-component-size-small) - 4px);
      padding: 0 8px;
      font-size: var(--su-font-size-small);
    }

    &.is-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
</style>
