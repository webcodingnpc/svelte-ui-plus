<script lang="ts">
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    value?: number
    max?: number
    size?: ComponentSize
    disabled?: boolean
    allowHalf?: boolean
    lowThreshold?: number
    highThreshold?: number
    colors?: string[] | Record<number, string>
    voidColor?: string
    showText?: boolean
    showScore?: boolean
    texts?: string[]
    scoreTemplate?: string
    clearable?: boolean
    icons?: string[]
    voidIcon?: string
    oninput?: (val: number) => void
    onchange?: (val: number) => void
    class?: string
  }

  const ns = useNamespace('rate')
  let {
    value = $bindable(0),
    max = 5,
    size = 'default',
    disabled = false,
    allowHalf = false,
    lowThreshold = 2,
    highThreshold = 4,
    colors = ['#f7ba2a', '#f7ba2a', '#f7ba2a'],
    voidColor = '#c6d1de',
    showText = false,
    showScore = false,
    texts = ['极差', '失望', '一般', '满意', '惊喜'],
    scoreTemplate = '{value}',
    clearable = false,
    oninput,
    onchange,
    class: className = '',
  }: Props = $props()

  let hoverValue = $state(-1)

  let classes = $derived(
    [ns.b(), ns.m(size !== 'default' ? size : undefined), ns.is('disabled', disabled), className]
      .filter(Boolean)
      .join(' ')
  )

  function getColor(index: number): string {
    const val = hoverValue >= 0 ? hoverValue : value
    if (index > val) return voidColor
    if (Array.isArray(colors)) {
      if (val <= lowThreshold) return colors[0]
      if (val <= highThreshold) return colors[1]
      return colors[2]
    }
    return '#f7ba2a'
  }

  function getStarStyle(index: number) {
    const val = hoverValue >= 0 ? hoverValue : value
    if (index <= Math.floor(val)) return 'full'
    if (allowHalf && index - 0.5 <= val) return 'half'
    return 'empty'
  }

  function handleClick(index: number) {
    if (disabled) return
    let newVal = index
    if (clearable && value === newVal) {
      newVal = 0
    }
    value = newVal
    oninput?.(newVal)
    onchange?.(newVal)
  }

  function handleHalfClick(index: number) {
    if (disabled || !allowHalf) return
    let newVal = index - 0.5
    if (clearable && value === newVal) {
      newVal = 0
    }
    value = newVal
    oninput?.(newVal)
    onchange?.(newVal)
  }

  let currentText = $derived(() => {
    if (showScore) {
      return scoreTemplate.replace('{value}', String(value))
    }
    if (showText && texts.length >= max) {
      const idx = Math.ceil(value) - 1
      return texts[idx] || ''
    }
    return ''
  })

  // 星星 SVG
  const starPath = 'M512 832l-288 160 80-320L32 448l320-32L512 128l160 288 320 32-272 224 80 320z'
</script>

<div class={classes} role="slider" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} onmouseleave={() => hoverValue = -1}>
  {#each Array.from({ length: max }, (_, i) => i + 1) as index}
    <span
      class={ns.e('item')}
      onmouseenter={() => { if (!disabled) hoverValue = index }}
      onclick={() => handleClick(index)}
    >
      {#if allowHalf}
        <span class={ns.e('half')} onclick={(e) => { e.stopPropagation(); handleHalfClick(index) }}>
          <svg viewBox="0 0 1024 1024" class={ns.e('icon')}>
            <defs>
              <clipPath id="half-clip-{index}">
                <rect x="0" y="0" width="512" height="1024" />
              </clipPath>
            </defs>
            <path d={starPath} fill={getColor(index - 0.5)} clip-path="url(#half-clip-{index})" />
            <path d={starPath} fill={getStarStyle(index) === 'full' ? getColor(index) : voidColor} />
            {#if getStarStyle(index) === 'half'}
              <path d={starPath} fill={getColor(index - 0.5)} clip-path="url(#half-clip-{index})" />
            {/if}
          </svg>
        </span>
      {:else}
        <svg viewBox="0 0 1024 1024" class={ns.e('icon')}>
          <path d={starPath} fill={getStarStyle(index) !== 'empty' ? getColor(index) : voidColor} />
        </svg>
      {/if}
    </span>
  {/each}
  {#if showText || showScore}
    <span class={ns.e('text')} style="color: {getColor(value)}">
      {currentText()}
    </span>
  {/if}
</div>

<style lang="scss">
  .su-rate {
    display: inline-flex;
    align-items: center;
    gap: 2px;

    &__item {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      position: relative;

      &:hover {
        transform: scale(1.1);
      }
    }

    &__half {
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      overflow: hidden;
      z-index: 1;
    }

    &__icon {
      width: 20px;
      height: 20px;
      transition: all var(--su-transition-duration-fast) ease;
    }

    &__text {
      font-size: var(--su-font-size-base);
      margin-left: 8px;
    }

    &.is-disabled {
      cursor: default;
      pointer-events: none;

      .su-rate__item {
        cursor: default;
        &:hover {
          transform: none;
        }
      }
    }

    &--large .su-rate__icon {
      width: 28px;
      height: 28px;
    }

    &--small .su-rate__icon {
      width: 16px;
      height: 16px;
    }
  }
</style>
