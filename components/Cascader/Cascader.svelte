<script lang="ts">
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface CascaderOption {
    value: string | number
    label: string
    children?: CascaderOption[]
    disabled?: boolean
    leaf?: boolean
  }

  interface Props {
    value?: (string | number)[]
    options?: CascaderOption[]
    size?: ComponentSize
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    showAllLevels?: boolean
    separator?: string
    filterable?: boolean
    props?: {
      expandTrigger?: 'click' | 'hover'
      multiple?: boolean
      checkStrictly?: boolean
    }
    oninput?: (val: (string | number)[]) => void
    onchange?: (val: (string | number)[]) => void
    class?: string
  }

  const ns = useNamespace('cascader')
  let {
    value = $bindable([]),
    options = [],
    size = 'default',
    placeholder = '请选择',
    disabled = false,
    clearable = true,
    showAllLevels = true,
    separator = ' / ',
    filterable = false,
    props = {},
    oninput,
    onchange,
    class: className = '',
  }: Props = $props()

  let showPanel = $state(false)
  let activePath = $state<CascaderOption[][]>([])
  let selectedPath = $state<CascaderOption[]>([])

  $effect(() => { activePath = [options] })
  let filterText = $state('')

  let classes = $derived(
    [ns.b(), ns.m(size !== 'default' ? size : undefined), ns.is('disabled', disabled), className]
      .filter(Boolean)
      .join(' ')
  )

  let displayValue = $derived(() => {
    if (!value || value.length === 0) return ''
    if (showAllLevels) {
      return selectedPath.map((o) => o.label).join(separator)
    }
    return selectedPath.length > 0 ? selectedPath[selectedPath.length - 1].label : ''
  })

  // 初始化选中路径
  $effect(() => {
    if (value.length > 0 && options.length > 0) {
      const path: CascaderOption[] = []
      let currentOptions = options
      for (const v of value) {
        const found = currentOptions.find((o) => o.value === v)
        if (found) {
          path.push(found)
          currentOptions = found.children || []
        }
      }
      selectedPath = path
    }
  })

  function togglePanel() {
    if (disabled) return
    showPanel = !showPanel
    if (showPanel) {
      activePath = [options]
    }
  }

  function handleOptionClick(option: CascaderOption, level: number) {
    if (option.disabled) return

    // 更新路径
    const newPath = selectedPath.slice(0, level)
    newPath.push(option)
    selectedPath = newPath

    if (option.children && option.children.length > 0) {
      // 展开下一级
      activePath = [...activePath.slice(0, level + 1), option.children]
    } else {
      // 叶子节点，完成选择
      value = newPath.map((o) => o.value)
      oninput?.(value)
      onchange?.(value)
      showPanel = false
    }
  }

  function handleClear(e: MouseEvent) {
    e.stopPropagation()
    value = []
    selectedPath = []
    oninput?.([])
    onchange?.([])
    showPanel = false
  }

  function handleClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (!target.closest(`.${ns.b()}`)) {
      showPanel = false
    }
  }

  $effect(() => {
    if (showPanel) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })
</script>

<div class={classes}>
  <div class={ns.e('wrapper')} onclick={togglePanel}>
    <input
      class={ns.e('inner')}
      type="text"
      value={displayValue()}
      {placeholder}
      {disabled}
      readonly
    />
    {#if clearable && value.length > 0}
      <span class={ns.e('clear')} onclick={handleClear}>
        <Icon name="circle-close" size={14} />
      </span>
    {:else}
      <span class={ns.e('arrow')}>
        <Icon name="arrow-down" size={14} />
      </span>
    {/if}
  </div>

  {#if showPanel}
    <div class={ns.e('panel')}>
      <div class={ns.e('menus')}>
        {#each activePath as menuOptions, level}
          <ul class={ns.e('menu')}>
            {#each menuOptions as option}
              <li
                class="{ns.e('node')} {option.disabled ? 'is-disabled' : ''} {selectedPath[level]?.value === option.value ? 'is-active' : ''}"
                onclick={() => handleOptionClick(option, level)}
                onmouseenter={() => {
                  if (props.expandTrigger === 'hover' && option.children) {
                    handleOptionClick(option, level)
                  }
                }}
              >
                <span class={ns.e('node-label')}>{option.label}</span>
                {#if option.children && option.children.length > 0}
                  <Icon name="arrow-right" size={12} />
                {/if}
              </li>
            {/each}
          </ul>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .su-cascader {
    position: relative;
    display: inline-flex;
    width: 250px;

    &__wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      height: var(--su-component-size);
      padding: 0 12px;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      background: var(--su-bg-color);
      cursor: pointer;
      box-sizing: border-box;
      transition: border-color var(--su-transition-duration-fast);

      &:hover {
        border-color: var(--su-color-primary);
      }
    }

    &__inner {
      flex: 1;
      border: none;
      outline: none;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      background: transparent;
      cursor: pointer;
      padding: 0;

      &::placeholder {
        color: var(--su-text-color-placeholder);
      }
    }

    &__clear,
    &__arrow {
      display: flex;
      align-items: center;
      color: var(--su-text-color-placeholder);
    }

    &__clear {
      cursor: pointer;
      &:hover {
        color: var(--su-text-color-secondary);
      }
    }

    &__panel {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      z-index: var(--su-z-index-popup);
      background: var(--su-bg-color-overlay);
      border: 1px solid var(--su-border-color-light);
      border-radius: var(--su-border-radius-base);
      box-shadow: var(--su-box-shadow-light);
    }

    &__menus {
      display: flex;
    }

    &__menu {
      list-style: none;
      margin: 0;
      padding: 4px 0;
      min-width: 160px;
      max-height: 200px;
      overflow-y: auto;

      &:not(:last-child) {
        border-right: 1px solid var(--su-border-color-lighter);
      }
    }

    &__node {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 0 12px;
      height: 34px;
      cursor: pointer;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      transition: background var(--su-transition-duration-fast);

      &:hover {
        background: var(--su-fill-color-light);
      }

      &.is-active {
        color: var(--su-color-primary);
        font-weight: 500;
      }

      &.is-disabled {
        color: var(--su-text-color-disabled);
        cursor: not-allowed;
      }
    }

    &__node-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &.is-disabled .su-cascader__wrapper {
      background-color: var(--su-fill-color-light);
      cursor: not-allowed;
    }

    &--large .su-cascader__wrapper {
      height: var(--su-component-size-large);
    }

    &--small {
      width: 200px;
      .su-cascader__wrapper {
        height: var(--su-component-size-small);
      }
    }
  }
</style>
