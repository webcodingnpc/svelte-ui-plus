<script lang="ts">
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    value?: string
    size?: ComponentSize
    disabled?: boolean
    showAlpha?: boolean
    colorFormat?: 'hex' | 'rgb' | 'hsl'
    predefine?: string[]
    oninput?: (val: string) => void
    onchange?: (val: string) => void
    class?: string
  }

  const ns = useNamespace('color-picker')
  let {
    value = $bindable('#409eff'),
    size = 'default',
    disabled = false,
    showAlpha = false,
    colorFormat = 'hex',
    predefine = [],
    oninput,
    onchange,
    class: className = '',
  }: Props = $props()

  let showPanel = $state(false)

  let classes = $derived(
    [ns.b(), ns.m(size !== 'default' ? size : undefined), ns.is('disabled', disabled), className]
      .filter(Boolean)
      .join(' ')
  )

  let sizeMap: Record<string, number> = {
    large: 40,
    default: 32,
    small: 24,
  }

  let triggerSize = $derived(sizeMap[size] || 32)

  function togglePanel() {
    if (disabled) return
    showPanel = !showPanel
  }

  function handleColorInput(e: Event) {
    const target = e.target as HTMLInputElement
    value = target.value
    oninput?.(value)
  }

  function handleNativeChange(e: Event) {
    const target = e.target as HTMLInputElement
    value = target.value
    onchange?.(value)
  }

  function selectPredefine(color: string) {
    value = color
    oninput?.(color)
    onchange?.(color)
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
  <div class={ns.e('trigger')} onclick={togglePanel} style="width: {triggerSize}px; height: {triggerSize}px;">
    <span class={ns.e('color')} style="background-color: {value}"></span>
    <span class={ns.e('icon')}>
      <Icon name="arrow-down" size={12} />
    </span>
  </div>
  {#if showPanel}
    <div class={ns.e('panel')}>
      <div class={ns.e('panel-body')}>
        <div class={ns.e('input-wrapper')}>
          <input
            type="color"
            {value}
            oninput={handleColorInput}
            onchange={handleNativeChange}
            class={ns.e('native-input')}
          />
          <input
            type="text"
            {value}
            class={ns.e('text-input')}
            oninput={handleColorInput}
            onchange={handleNativeChange}
            maxlength={showAlpha ? 9 : 7}
          />
        </div>
        {#if predefine.length > 0}
          <div class={ns.e('predefine')}>
            {#each predefine as color}
              <span
                class="{ns.e('predefine-color')} {value === color ? 'is-active' : ''}"
                style="background-color: {color}"
                onclick={() => selectPredefine(color)}
              ></span>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .su-color-picker {
    position: relative;
    display: inline-flex;

    &__trigger {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      cursor: pointer;
      padding: 2px;
      box-sizing: border-box;
      transition: border-color var(--su-transition-duration-fast);

      &:hover {
        border-color: var(--su-color-primary);
      }
    }

    &__color {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 2px;
    }

    &__icon {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--su-text-color-secondary);
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
      padding: 12px;
      min-width: 220px;
    }

    &__panel-body {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__input-wrapper {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    &__native-input {
      width: 32px;
      height: 32px;
      padding: 0;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      cursor: pointer;
      background: none;

      &::-webkit-color-swatch-wrapper {
        padding: 2px;
      }

      &::-webkit-color-swatch {
        border: none;
        border-radius: 2px;
      }
    }

    &__text-input {
      flex: 1;
      height: 32px;
      padding: 0 8px;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      font-size: var(--su-font-size-small);
      font-family: monospace;
      color: var(--su-text-color-regular);
      outline: none;
      box-sizing: border-box;

      &:focus {
        border-color: var(--su-color-primary);
      }
    }

    &__predefine {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    &__predefine-color {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 2px;
      cursor: pointer;
      border: 1px solid var(--su-border-color-lighter);
      transition: all var(--su-transition-duration-fast);

      &:hover {
        transform: scale(1.2);
      }

      &.is-active {
        box-shadow: 0 0 0 2px var(--su-color-primary);
      }
    }

    &.is-disabled {
      .su-color-picker__trigger {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
</style>
