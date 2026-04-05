<script lang="ts">
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    value?: string
    size?: ComponentSize
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    start?: string
    end?: string
    step?: string
    oninput?: (val: string) => void
    onchange?: (val: string) => void
    class?: string
  }

  const ns = useNamespace('time-select')
  let {
    value = $bindable(''),
    size = 'default',
    placeholder = '选择时间',
    disabled = false,
    clearable = true,
    start = '09:00',
    end = '18:00',
    step = '00:30',
    oninput,
    onchange,
    class: className = '',
  }: Props = $props()

  let showDropdown = $state(false)

  let classes = $derived(
    [ns.b(), ns.m(size !== 'default' ? size : undefined), ns.is('disabled', disabled), className]
      .filter(Boolean)
      .join(' ')
  )

  // 生成时间列表
  let timeOptions = $derived(() => {
    const options: string[] = []
    const parseTime = (t: string) => {
      const [h, m] = t.split(':').map(Number)
      return h * 60 + m
    }
    const startMin = parseTime(start)
    const endMin = parseTime(end)
    const stepMin = parseTime(step)
    for (let t = startMin; t <= endMin; t += stepMin) {
      const h = Math.floor(t / 60)
      const m = t % 60
      options.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }
    return options
  })

  function selectOption(opt: string) {
    value = opt
    oninput?.(opt)
    onchange?.(opt)
    showDropdown = false
  }

  function handleClear(e: MouseEvent) {
    e.stopPropagation()
    value = ''
    oninput?.('')
    onchange?.('')
    showDropdown = false
  }

  function toggleDropdown() {
    if (disabled) return
    showDropdown = !showDropdown
  }

  function handleClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (!target.closest(`.${ns.b()}`)) {
      showDropdown = false
    }
  }

  $effect(() => {
    if (showDropdown) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })
</script>

<div class={classes}>
  <div class={ns.e('wrapper')} onclick={toggleDropdown}>
    <span class={ns.e('prefix')}>
      <Icon name="edit" size={14} />
    </span>
    <input
      class={ns.e('inner')}
      type="text"
      value={value || ''}
      {placeholder}
      {disabled}
      readonly
    />
    {#if clearable && value}
      <span class={ns.e('clear')} onclick={handleClear}>
        <Icon name="circle-close" size={14} />
      </span>
    {/if}
  </div>

  {#if showDropdown}
    <ul class={ns.e('dropdown')}>
      {#each timeOptions() as opt}
        <li
          class="{ns.e('option')} {value === opt ? 'is-selected' : ''}"
          onclick={() => selectOption(opt)}
        >
          {opt}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  .su-time-select {
    position: relative;
    display: inline-flex;
    width: 200px;

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

    &__prefix {
      display: flex;
      align-items: center;
      color: var(--su-text-color-placeholder);
      margin-right: 8px;
    }

    &__inner {
      flex: 1;
      border: none;
      outline: none;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      background: transparent;
      cursor: inherit;
      padding: 0;
    }

    &__clear {
      display: flex;
      align-items: center;
      color: var(--su-text-color-placeholder);
      cursor: pointer;

      &:hover {
        color: var(--su-text-color-secondary);
      }
    }

    &__dropdown {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      right: 0;
      z-index: var(--su-z-index-popup);
      max-height: 200px;
      overflow-y: auto;
      list-style: none;
      margin: 0;
      padding: 4px 0;
      background: var(--su-bg-color-overlay);
      border: 1px solid var(--su-border-color-light);
      border-radius: var(--su-border-radius-base);
      box-shadow: var(--su-box-shadow-light);
    }

    &__option {
      padding: 0 12px;
      height: 34px;
      line-height: 34px;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      cursor: pointer;
      transition: background var(--su-transition-duration-fast);

      &:hover {
        background-color: var(--su-fill-color-light);
      }

      &.is-selected {
        color: var(--su-color-primary);
        font-weight: 700;
      }
    }

    &.is-disabled .su-time-select__wrapper {
      background-color: var(--su-fill-color-light);
      cursor: not-allowed;
    }

    &--large .su-time-select__wrapper {
      height: var(--su-component-size-large);
    }

    &--small .su-time-select__wrapper {
      height: var(--su-component-size-small);
    }
  }
</style>
