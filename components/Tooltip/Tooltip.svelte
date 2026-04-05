<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { Placement } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 提示内容 */
    content?: string
    /** 位置 */
    placement?: Placement
    /** 是否禁用 */
    disabled?: boolean
    /** 偏移量 */
    offset?: number
    /** 延迟显示(ms) */
    showDelay?: number
    /** 延迟隐藏(ms) */
    hideDelay?: number
    /** 子内容（触发器） */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('tooltip')

  let {
    content = '',
    placement = 'top',
    disabled = false,
    offset = 8,
    showDelay = 0,
    hideDelay = 200,
    children,
    class: className = '',
  }: Props = $props()

  let visible = $state(false)
  let triggerRef: HTMLElement | undefined = $state()
  let tooltipRef: HTMLElement | undefined = $state()
  let showTimer: ReturnType<typeof setTimeout> | null = null
  let hideTimer: ReturnType<typeof setTimeout> | null = null

  function show() {
    if (disabled) return
    clearTimers()
    showTimer = setTimeout(() => {
      visible = true
      requestAnimationFrame(updatePosition)
    }, showDelay)
  }

  function hide() {
    clearTimers()
    hideTimer = setTimeout(() => {
      visible = false
    }, hideDelay)
  }

  function clearTimers() {
    if (showTimer) clearTimeout(showTimer)
    if (hideTimer) clearTimeout(hideTimer)
    showTimer = null
    hideTimer = null
  }

  function updatePosition() {
    if (!triggerRef || !tooltipRef) return
    const triggerRect = triggerRef.getBoundingClientRect()
    const tooltipRect = tooltipRef.getBoundingClientRect()

    let top = 0
    let left = 0

    switch (placement) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - offset
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'bottom':
        top = triggerRect.bottom + offset
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.left - tooltipRect.width - offset
        break
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.right + offset
        break
      default:
        top = triggerRect.top - tooltipRect.height - offset
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
    }

    tooltipRef.style.top = `${top + window.scrollY}px`
    tooltipRef.style.left = `${left + window.scrollX}px`
  }
</script>

<span
  class="{ns.b()} {className}"
  bind:this={triggerRef}
  onmouseenter={show}
  onmouseleave={hide}
  onfocus={show}
  onblur={hide}
>
  {@render children?.()}
</span>

{#if visible && content}
  <div
    class="{ns.e('popper')} {ns.m(placement)}"
    bind:this={tooltipRef}
    onmouseenter={show}
    onmouseleave={hide}
    role="tooltip"
  >
    <div class={ns.e('content')}>{content}</div>
    <div class={ns.e('arrow')}></div>
  </div>
{/if}

<style lang="scss">
  .su-tooltip {
    display: inline-flex;
  }

  .su-tooltip__popper {
    position: absolute;
    z-index: var(--su-z-index-popup);
    pointer-events: auto;
  }

  .su-tooltip__content {
    padding: 6px 12px;
    font-size: var(--su-font-size-base);
    color: #fff;
    background: var(--su-text-color-primary);
    border-radius: var(--su-border-radius-base);
    line-height: 1.5;
    white-space: nowrap;
    word-break: keep-all;
    max-width: 300px;
  }

  .su-tooltip__arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--su-text-color-primary);
    transform: rotate(45deg);
  }

  .su-tooltip--top .su-tooltip__arrow {
    bottom: -4px;
    left: 50%;
    margin-left: -4px;
  }

  .su-tooltip--bottom .su-tooltip__arrow {
    top: -4px;
    left: 50%;
    margin-left: -4px;
  }

  .su-tooltip--left .su-tooltip__arrow {
    right: -4px;
    top: 50%;
    margin-top: -4px;
  }

  .su-tooltip--right .su-tooltip__arrow {
    left: -4px;
    top: 50%;
    margin-top: -4px;
  }
</style>
