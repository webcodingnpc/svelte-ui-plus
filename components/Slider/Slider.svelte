<script lang="ts">
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    value?: number
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    showInput?: boolean
    showInputControls?: boolean
    size?: ComponentSize
    showStops?: boolean
    showTooltip?: boolean
    range?: boolean
    vertical?: boolean
    height?: string
    marks?: Record<number, string>
    oninput?: (val: number | [number, number]) => void
    onchange?: (val: number | [number, number]) => void
    class?: string
  }

  const ns = useNamespace('slider')
  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    showInput = false,
    showInputControls = true,
    size = 'default',
    showStops = false,
    showTooltip = true,
    range = false,
    vertical = false,
    height = '200px',
    marks,
    oninput,
    onchange,
    class: className = '',
  }: Props = $props()

  let dragging = $state(false)
  let sliderEl: HTMLDivElement | undefined = $state()
  let tooltipVisible = $state(false)

  let classes = $derived(
    [ns.b(), ns.m(size !== 'default' ? size : undefined), ns.is('disabled', disabled), ns.is('vertical', vertical), className]
      .filter(Boolean)
      .join(' ')
  )

  let percentage = $derived(((value as number) - min) / (max - min) * 100)

  let stops = $derived(() => {
    if (!showStops) return []
    const result: number[] = []
    const total = (max - min) / step
    for (let i = 1; i < total; i++) {
      result.push(i * step / (max - min) * 100)
    }
    return result
  })

  function getSliderPosition(e: MouseEvent | TouchEvent): number {
    if (!sliderEl) return 0
    const rect = sliderEl.getBoundingClientRect()
    let pos: number
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    if (vertical) {
      pos = (rect.bottom - clientY) / rect.height
    } else {
      pos = (clientX - rect.left) / rect.width
    }
    return Math.max(0, Math.min(1, pos))
  }

  function setValueFromPosition(pos: number) {
    let newVal = min + pos * (max - min)
    newVal = Math.round(newVal / step) * step
    newVal = Math.max(min, Math.min(max, newVal))
    value = parseFloat(newVal.toFixed(10))
    oninput?.(value)
  }

  function handleSliderClick(e: MouseEvent) {
    if (disabled) return
    const pos = getSliderPosition(e)
    setValueFromPosition(pos)
    onchange?.(value as number)
  }

  function handleMouseDown(e: MouseEvent) {
    if (disabled) return
    e.preventDefault()
    dragging = true
    tooltipVisible = true

    function onMouseMove(e: MouseEvent) {
      const pos = getSliderPosition(e)
      setValueFromPosition(pos)
    }

    function onMouseUp() {
      dragging = false
      tooltipVisible = false
      onchange?.(value as number)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }
</script>

<div class={classes} style={vertical ? `height: ${height}` : ''}>
  <div class={ns.e('runway')} bind:this={sliderEl} onclick={handleSliderClick}>
    <div
      class={ns.e('bar')}
      style={vertical
        ? `height: ${percentage}%; bottom: 0;`
        : `width: ${percentage}%; left: 0;`}
    ></div>
    {#if showStops}
      {#each stops() as stop}
        <div
          class={ns.e('stop')}
          style={vertical ? `bottom: ${stop}%` : `left: ${stop}%`}
        ></div>
      {/each}
    {/if}
    {#if marks}
      {#each Object.entries(marks) as [key, label]}
        {@const pos = ((Number(key) - min) / (max - min)) * 100}
        <div class={ns.e('stop')} style={vertical ? `bottom: ${pos}%` : `left: ${pos}%`}></div>
        <div class={ns.e('marks-text')} style={vertical ? `bottom: ${pos}%` : `left: ${pos}%`}>
          {label}
        </div>
      {/each}
    {/if}
    <div
      class={ns.e('button-wrapper')}
      style={vertical ? `bottom: ${percentage}%` : `left: ${percentage}%`}
      onmousedown={handleMouseDown}
      onmouseenter={() => tooltipVisible = true}
      onmouseleave={() => { if (!dragging) tooltipVisible = false }}
      role="slider"
      tabindex="0"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value as number}
    >
      {#if showTooltip && tooltipVisible}
        <div class={ns.e('tooltip')}>{value}</div>
      {/if}
      <div class={ns.e('button')}></div>
    </div>
  </div>
  {#if showInput}
    <div class={ns.e('input')}>
      <input
        type="number"
        value={value as number}
        {min}
        {max}
        {step}
        {disabled}
        oninput={(e) => {
          const v = parseFloat((e.target as HTMLInputElement).value)
          if (!isNaN(v)) {
            value = Math.max(min, Math.min(max, v))
            oninput?.(value)
          }
        }}
        onchange={() => onchange?.(value as number)}
      />
    </div>
  {/if}
</div>

<style lang="scss">
  .su-slider {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 16px;

    &__runway {
      position: relative;
      flex: 1;
      height: 6px;
      background-color: var(--su-border-color-light);
      border-radius: 3px;
      cursor: pointer;
    }

    &__bar {
      position: absolute;
      height: 100%;
      background-color: var(--su-color-primary);
      border-radius: 3px;
    }

    &__stop {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: var(--su-bg-color);
      border: 1px solid var(--su-border-color);
      transform: translate(-50%, -50%);
      top: 50%;
    }

    &__marks-text {
      position: absolute;
      top: 16px;
      transform: translateX(-50%);
      font-size: var(--su-font-size-extra-small);
      color: var(--su-text-color-secondary);
      white-space: nowrap;
    }

    &__button-wrapper {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      cursor: grab;

      &:active {
        cursor: grabbing;
      }
    }

    &__tooltip {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      padding: 4px 8px;
      background: var(--su-text-color-primary);
      color: #fff;
      border-radius: var(--su-border-radius-base);
      font-size: var(--su-font-size-small);
      white-space: nowrap;
      pointer-events: none;

      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 4px solid transparent;
        border-top-color: var(--su-text-color-primary);
      }
    }

    &__button {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: var(--su-bg-color);
      border: 2px solid var(--su-color-primary);
      transition: transform var(--su-transition-duration-fast);

      &:hover {
        transform: scale(1.2);
      }
    }

    &__input {
      width: 130px;
      flex-shrink: 0;

      input {
        width: 100%;
        height: var(--su-component-size);
        padding: 0 8px;
        border: 1px solid var(--su-border-color);
        border-radius: var(--su-border-radius-base);
        font-size: var(--su-font-size-base);
        text-align: center;
        outline: none;
        box-sizing: border-box;

        &:focus {
          border-color: var(--su-color-primary);
        }
      }
    }

    &.is-disabled {
      cursor: not-allowed;

      .su-slider__runway {
        cursor: not-allowed;
      }

      .su-slider__bar {
        background-color: var(--su-text-color-disabled);
      }

      .su-slider__button {
        border-color: var(--su-text-color-disabled);
      }

      .su-slider__button-wrapper {
        cursor: not-allowed;
      }
    }

    &.is-vertical {
      flex-direction: column;
      height: 100%;
      width: auto;

      .su-slider__runway {
        width: 6px;
        height: 100%;
        flex: none;
      }

      .su-slider__bar {
        width: 100%;
        height: auto;
      }

      .su-slider__button-wrapper {
        top: auto;
        left: 50%;
        transform: translate(-50%, 50%);
      }

      .su-slider__stop {
        left: 50%;
        top: auto;
        transform: translate(-50%, 50%);
      }

      .su-slider__marks-text {
        top: auto;
        left: 20px;
        transform: translateY(50%);
      }
    }
  }
</style>
