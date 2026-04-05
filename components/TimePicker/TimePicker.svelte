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
    readonly?: boolean
    isRange?: boolean
    rangeSeparator?: string
    startPlaceholder?: string
    endPlaceholder?: string
    oninput?: (val: string) => void
    onchange?: (val: string) => void
    class?: string
  }

  const ns = useNamespace('time-picker')
  let {
    value = $bindable(''),
    size = 'default',
    placeholder = '选择时间',
    disabled = false,
    clearable = true,
    readonly = false,
    isRange = false,
    rangeSeparator = '至',
    startPlaceholder = '开始时间',
    endPlaceholder = '结束时间',
    oninput,
    onchange,
    class: className = '',
  }: Props = $props()

  let showPanel = $state(false)
  let hours = $state(0)
  let minutes = $state(0)
  let seconds = $state(0)

  let classes = $derived(
    [ns.b(), ns.m(size !== 'default' ? size : undefined), ns.is('disabled', disabled), className]
      .filter(Boolean)
      .join(' ')
  )

  $effect(() => {
    if (value) {
      const parts = value.split(':')
      hours = parseInt(parts[0]) || 0
      minutes = parseInt(parts[1]) || 0
      seconds = parseInt(parts[2]) || 0
    }
  })

  function formatTime(): string {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  function togglePanel() {
    if (disabled || readonly) return
    showPanel = !showPanel
  }

  function setTime(h: number, m: number, s: number) {
    hours = h
    minutes = m
    seconds = s
    value = formatTime()
    oninput?.(value)
  }

  function confirmTime() {
    value = formatTime()
    onchange?.(value)
    showPanel = false
  }

  function handleClear(e: MouseEvent) {
    e.stopPropagation()
    value = ''
    hours = 0
    minutes = 0
    seconds = 0
    oninput?.('')
    onchange?.('')
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

  {#if showPanel}
    <div class={ns.e('panel')}>
      <div class={ns.e('spinner-wrapper')}>
        <div class={ns.e('spinner')}>
          <div class={ns.e('spinner-header')}>时</div>
          <div class={ns.e('spinner-list')}>
            {#each Array.from({ length: 24 }, (_, i) => i) as h}
              <button
                type="button"
                class="{ns.e('spinner-item')} {hours === h ? 'is-active' : ''}"
                onclick={() => setTime(h, minutes, seconds)}
              >
                {String(h).padStart(2, '0')}
              </button>
            {/each}
          </div>
        </div>
        <div class={ns.e('spinner')}>
          <div class={ns.e('spinner-header')}>分</div>
          <div class={ns.e('spinner-list')}>
            {#each Array.from({ length: 60 }, (_, i) => i) as m}
              <button
                type="button"
                class="{ns.e('spinner-item')} {minutes === m ? 'is-active' : ''}"
                onclick={() => setTime(hours, m, seconds)}
              >
                {String(m).padStart(2, '0')}
              </button>
            {/each}
          </div>
        </div>
        <div class={ns.e('spinner')}>
          <div class={ns.e('spinner-header')}>秒</div>
          <div class={ns.e('spinner-list')}>
            {#each Array.from({ length: 60 }, (_, i) => i) as s}
              <button
                type="button"
                class="{ns.e('spinner-item')} {seconds === s ? 'is-active' : ''}"
                onclick={() => setTime(hours, minutes, s)}
              >
                {String(s).padStart(2, '0')}
              </button>
            {/each}
          </div>
        </div>
      </div>
      <div class={ns.e('footer')}>
        <button type="button" class={ns.e('footer-btn')} onclick={() => showPanel = false}>取消</button>
        <button type="button" class="{ns.e('footer-btn')} is-primary" onclick={confirmTime}>确定</button>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .su-time-picker {
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

      &::placeholder {
        color: var(--su-text-color-placeholder);
      }
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

    &__panel {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      z-index: var(--su-z-index-popup);
      background: var(--su-bg-color-overlay);
      border: 1px solid var(--su-border-color-light);
      border-radius: var(--su-border-radius-base);
      box-shadow: var(--su-box-shadow-light);
      overflow: hidden;
    }

    &__spinner-wrapper {
      display: flex;
      border-bottom: 1px solid var(--su-border-color-lighter);
    }

    &__spinner {
      flex: 1;
      min-width: 60px;

      &:not(:last-child) {
        border-right: 1px solid var(--su-border-color-lighter);
      }
    }

    &__spinner-header {
      text-align: center;
      font-size: var(--su-font-size-small);
      color: var(--su-text-color-secondary);
      padding: 4px 0;
      border-bottom: 1px solid var(--su-border-color-lighter);
    }

    &__spinner-list {
      height: 180px;
      overflow-y: auto;
      scrollbar-width: thin;
    }

    &__spinner-item {
      display: block;
      width: 100%;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border: none;
      background: none;
      cursor: pointer;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      transition: all var(--su-transition-duration-fast);

      &:hover {
        background: var(--su-fill-color-light);
      }

      &.is-active {
        color: var(--su-color-primary);
        font-weight: 700;
      }
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 8px;
    }

    &__footer-btn {
      padding: 4px 12px;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-small);
      background: var(--su-bg-color);
      font-size: var(--su-font-size-small);
      cursor: pointer;
      color: var(--su-text-color-regular);

      &.is-primary {
        background: var(--su-color-primary);
        border-color: var(--su-color-primary);
        color: #fff;
      }
    }

    &.is-disabled .su-time-picker__wrapper {
      background-color: var(--su-fill-color-light);
      cursor: not-allowed;
    }

    &--large .su-time-picker__wrapper {
      height: var(--su-component-size-large);
    }

    &--small .su-time-picker__wrapper {
      height: var(--su-component-size-small);
    }
  }
</style>
