<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface SelectOption {
    label: string
    value: string | number
    disabled?: boolean
  }

  interface Props {
    /** 绑定值 */
    value?: string | number | (string | number)[]
    /** 选项列表 */
    options?: SelectOption[]
    /** 占位文本 */
    placeholder?: string
    /** 是否禁用 */
    disabled?: boolean
    /** 是否可清空 */
    clearable?: boolean
    /** 是否多选 */
    multiple?: boolean
    /** 尺寸 */
    size?: ComponentSize
    /** 变更事件 */
    onchange?: (value: string | number | (string | number)[]) => void
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('select')

  let {
    value = $bindable(''),
    options = [],
    placeholder = '请选择',
    disabled = false,
    clearable = false,
    multiple = false,
    size = 'default',
    onchange,
    class: className = '',
  }: Props = $props()

  let open = $state(false)
  let selectRef: HTMLDivElement | undefined = $state()

  let displayLabel = $derived(() => {
    if (multiple && Array.isArray(value)) {
      return value
        .map((v) => options.find((o) => o.value === v)?.label)
        .filter(Boolean)
        .join(', ')
    }
    return options.find((o) => o.value === value)?.label || ''
  })

  let showClear = $derived(clearable && value && !disabled)

  let classes = $derived(
    [
      ns.b(),
      ns.m(size !== 'default' ? size : undefined),
      ns.is('disabled', disabled),
      ns.is('open', open),
      className,
    ]
      .filter(Boolean)
      .join(' '),
  )

  function toggle() {
    if (disabled) return
    open = !open
  }

  function selectOption(opt: SelectOption) {
    if (opt.disabled) return

    if (multiple) {
      const arr = Array.isArray(value) ? [...value] : []
      const idx = arr.indexOf(opt.value)
      if (idx > -1) {
        arr.splice(idx, 1)
      } else {
        arr.push(opt.value)
      }
      value = arr
    } else {
      value = opt.value
      open = false
    }
    onchange?.(value)
  }

  function handleClear(e: MouseEvent) {
    e.stopPropagation()
    value = multiple ? [] : ''
    onchange?.(value)
  }

  function isSelected(optValue: string | number) {
    if (multiple && Array.isArray(value)) {
      return value.includes(optValue)
    }
    return value === optValue
  }

  // 点击外部关闭
  function handleClickOutside(e: MouseEvent) {
    if (selectRef && !selectRef.contains(e.target as Node)) {
      open = false
    }
  }

  $effect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  })
</script>

<div class={classes} bind:this={selectRef}>
  <div class={ns.e('trigger')} onclick={toggle}>
    <span class={ns.e('value')} class:is-placeholder={!displayLabel()}>
      {displayLabel() || placeholder}
    </span>

    {#if showClear}
      <span class={ns.e('clear')} onclick={handleClear}>
        <Icon name="circle-close" size={14} />
      </span>
    {:else}
      <span class="{ns.e('arrow')}" class:is-reverse={open}>
        <Icon name="arrow-down" size={12} />
      </span>
    {/if}
  </div>

  {#if open}
    <div class={ns.e('dropdown')}>
      <ul class={ns.e('menu')}>
        {#each options as opt}
          <li
            class="{ns.e('option')} {isSelected(opt.value) ? 'is-selected' : ''} {opt.disabled ? 'is-disabled' : ''}"
            onclick={() => selectOption(opt)}
          >
            {opt.label}
            {#if isSelected(opt.value)}
              <Icon name="check" size={14} />
            {/if}
          </li>
        {/each}
        {#if options.length === 0}
          <li class={ns.e('empty')}>无数据</li>
        {/if}
      </ul>
    </div>
  {/if}
</div>

<style lang="scss">
  .su-select {
    display: inline-flex;
    position: relative;
    width: 100%;
    cursor: pointer;

    &__trigger {
      display: flex;
      align-items: center;
      width: 100%;
      height: var(--su-component-size);
      padding: 0 12px;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      background: var(--su-fill-color-blank);
      transition: border-color var(--su-transition-duration-fast);

      &:hover {
        border-color: var(--su-border-color-dark);
      }
    }

    &.is-open .su-select__trigger {
      border-color: var(--su-color-primary);
    }

    &.is-disabled {
      cursor: not-allowed;

      .su-select__trigger {
        background: var(--su-fill-color-light);
        cursor: not-allowed;
      }
    }

    &__value {
      flex: 1;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.is-placeholder {
        color: var(--su-text-color-placeholder);
      }
    }

    &__arrow {
      display: inline-flex;
      margin-left: 8px;
      transition: transform var(--su-transition-duration-fast);
      color: var(--su-text-color-placeholder);

      &.is-reverse {
        transform: rotate(180deg);
      }
    }

    &__clear {
      display: inline-flex;
      margin-left: 8px;
      color: var(--su-text-color-placeholder);
      transition: color var(--su-transition-duration-fast);

      &:hover {
        color: var(--su-text-color-secondary);
      }
    }

    &__dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      width: 100%;
      z-index: var(--su-z-index-popup);
      background: var(--su-bg-color-overlay);
      border: 1px solid var(--su-border-color-light);
      border-radius: var(--su-border-radius-base);
      box-shadow: var(--su-box-shadow-light);
      padding: 6px 0;
      max-height: 274px;
      overflow-y: auto;
    }

    &__menu {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      height: 34px;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      cursor: pointer;
      transition: background var(--su-transition-duration-fast);

      &:hover {
        background: var(--su-fill-color-light);
      }

      &.is-selected {
        color: var(--su-color-primary);
        font-weight: 700;
      }

      &.is-disabled {
        color: var(--su-text-color-disabled);
        cursor: not-allowed;

        &:hover {
          background: transparent;
        }
      }
    }

    &__empty {
      padding: 10px 0;
      text-align: center;
      color: var(--su-text-color-secondary);
      font-size: var(--su-font-size-base);
    }

    // 尺寸
    &--large .su-select__trigger {
      height: var(--su-component-size-large);
    }

    &--small .su-select__trigger {
      height: var(--su-component-size-small);
      font-size: var(--su-font-size-extra-small);
    }
  }
</style>
