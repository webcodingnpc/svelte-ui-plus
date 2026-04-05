<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { Placement, TriggerType } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    /** 标题 */
    title?: string
    /** 内容 */
    content?: string
    /** 位置 */
    placement?: Placement
    /** 触发方式 */
    trigger?: TriggerType
    /** 宽度 */
    width?: string | number
    /** 子内容（触发器） */
    children?: Snippet
    /** 内容插槽 */
    contentSlot?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('popover')

  let {
    title = '',
    content = '',
    placement = 'top',
    trigger = 'click',
    width = 200,
    children,
    contentSlot,
    class: className = '',
  }: Props = $props()

  let visible = $state(false)
  let triggerRef: HTMLElement | undefined = $state()
  let popperRef: HTMLElement | undefined = $state()

  function toggle() {
    visible = !visible
    if (visible) requestAnimationFrame(updatePosition)
  }

  function show() {
    visible = true
    requestAnimationFrame(updatePosition)
  }

  function hide() {
    visible = false
  }

  function updatePosition() {
    if (!triggerRef || !popperRef) return
    const tr = triggerRef.getBoundingClientRect()
    const pr = popperRef.getBoundingClientRect()
    let top = 0, left = 0

    switch (placement) {
      case 'top':
        top = tr.top - pr.height - 8
        left = tr.left + (tr.width - pr.width) / 2
        break
      case 'bottom':
        top = tr.bottom + 8
        left = tr.left + (tr.width - pr.width) / 2
        break
      case 'left':
        top = tr.top + (tr.height - pr.height) / 2
        left = tr.left - pr.width - 8
        break
      case 'right':
        top = tr.top + (tr.height - pr.height) / 2
        left = tr.right + 8
        break
      default:
        top = tr.top - pr.height - 8
        left = tr.left + (tr.width - pr.width) / 2
    }

    popperRef.style.top = `${top + window.scrollY}px`
    popperRef.style.left = `${left + window.scrollX}px`
  }

  // 点击外部关闭
  function handleClickOutside(e: MouseEvent) {
    const target = e.target as Node
    if (
      trigger === 'click' &&
      triggerRef &&
      !triggerRef.contains(target) &&
      popperRef &&
      !popperRef.contains(target)
    ) {
      hide()
    }
  }

  $effect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  })
</script>

<span
  class="{ns.b()} {className}"
  bind:this={triggerRef}
  onclick={trigger === 'click' ? toggle : undefined}
  onmouseenter={trigger === 'hover' ? show : undefined}
  onmouseleave={trigger === 'hover' ? hide : undefined}
  onfocus={trigger === 'focus' ? show : undefined}
  onblur={trigger === 'focus' ? hide : undefined}
>
  {@render children?.()}
</span>

{#if visible}
  <div
    class={ns.e('popper')}
    bind:this={popperRef}
    style="width: {typeof width === 'number' ? width + 'px' : width}"
    onmouseenter={trigger === 'hover' ? show : undefined}
    onmouseleave={trigger === 'hover' ? hide : undefined}
  >
    {#if title}
      <div class={ns.e('title')}>{title}</div>
    {/if}
    <div class={ns.e('content')}>
      {#if contentSlot}
        {@render contentSlot()}
      {:else}
        {content}
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .su-popover {
    display: inline-flex;
  }

  .su-popover__popper {
    position: absolute;
    z-index: var(--su-z-index-popup);
    background: var(--su-bg-color-overlay);
    border: 1px solid var(--su-border-color-light);
    border-radius: var(--su-border-radius-base);
    box-shadow: var(--su-box-shadow-light);
    padding: 12px;
    font-size: var(--su-font-size-base);
  }

  .su-popover__title {
    font-size: var(--su-font-size-medium);
    font-weight: 600;
    color: var(--su-text-color-primary);
    margin-bottom: 8px;
    line-height: 1.4;
  }

  .su-popover__content {
    color: var(--su-text-color-regular);
    line-height: 1.6;
  }
</style>
