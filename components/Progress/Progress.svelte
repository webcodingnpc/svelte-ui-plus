<script lang="ts">
  import type { ComponentType } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 百分比 */
    percentage?: number
    /** 类型 */
    type?: 'line' | 'circle' | 'dashboard'
    /** 进度条宽度 */
    strokeWidth?: number
    /** 状态 */
    status?: 'success' | 'warning' | 'danger'
    /** 是否显示百分比文字 */
    showText?: boolean
    /** 进度条颜色 */
    color?: string
    /** 宽度（circle/dashboard 直径） */
    width?: number
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('progress')

  let {
    percentage = 0,
    type = 'line',
    strokeWidth = 6,
    status,
    showText = true,
    color,
    width = 126,
    class: className = '',
  }: Props = $props()

  let clampedPct = $derived(Math.max(0, Math.min(100, percentage)))

  let barColor = $derived(
    color ||
      (status === 'success'
        ? 'var(--su-color-success)'
        : status === 'warning'
          ? 'var(--su-color-warning)'
          : status === 'danger'
            ? 'var(--su-color-danger)'
            : 'var(--su-color-primary)'),
  )

  let classes = $derived(
    [ns.b(), ns.m(type), status ? ns.m(status) : '', className]
      .filter(Boolean)
      .join(' '),
  )

  // 圆形进度条参数
  let radius = $derived((width - strokeWidth) / 2)
  let circumference = $derived(2 * Math.PI * radius)
  let dashOffset = $derived(circumference * (1 - clampedPct / 100))
</script>

{#if type === 'line'}
  <div class={classes}>
    <div class={ns.e('bar')}>
      <div class={ns.e('outer')} style="height: {strokeWidth}px">
        <div class={ns.e('inner')} style="width: {clampedPct}%; background: {barColor}"></div>
      </div>
    </div>
    {#if showText}
      <span class={ns.e('text')}>{clampedPct}%</span>
    {/if}
  </div>
{:else}
  <div class={classes} style="width: {width}px; height: {width}px">
    <svg viewBox="0 0 {width} {width}">
      <circle
        cx={width / 2}
        cy={width / 2}
        r={radius}
        fill="none"
        stroke="var(--su-border-color-lighter)"
        stroke-width={strokeWidth}
      />
      <circle
        cx={width / 2}
        cy={width / 2}
        r={radius}
        fill="none"
        stroke={barColor}
        stroke-width={strokeWidth}
        stroke-dasharray={circumference}
        stroke-dashoffset={dashOffset}
        stroke-linecap="round"
        transform="rotate(-90, {width / 2}, {width / 2})"
        style="transition: stroke-dashoffset 0.3s ease"
      />
    </svg>
    {#if showText}
      <span class={ns.e('text')}>{clampedPct}%</span>
    {/if}
  </div>
{/if}

<style lang="scss">
  .su-progress {
    &--line {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
    }

    &__bar {
      flex: 1;
    }

    &__outer {
      border-radius: 100px;
      background: var(--su-border-color-lighter);
      overflow: hidden;
    }

    &__inner {
      height: 100%;
      border-radius: 100px;
      transition: width var(--su-transition-duration) ease;
    }

    &__text {
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      white-space: nowrap;
      min-width: 40px;
    }

    &--circle,
    &--dashboard {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 100%;
        height: 100%;
      }

      .su-progress__text {
        position: absolute;
        font-size: var(--su-font-size-large);
      }
    }
  }
</style>
