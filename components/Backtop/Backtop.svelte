<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { onMount, onDestroy } from 'svelte'

  interface Props {
    /** 触发滚动的对象（CSS 选择器） */
    target?: string
    /** 可见高度阈值 */
    visibilityHeight?: number
    /** 距离右边距 */
    right?: number
    /** 距离底部距离 */
    bottom?: number
    /** 点击事件 */
    onclick?: () => void
    /** 自定义图标 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('backtop')

  let {
    target,
    visibilityHeight = 200,
    right = 40,
    bottom = 40,
    onclick,
    children,
    class: className = '',
  }: Props = $props()

  let visible = $state(false)
  let scrollTarget: HTMLElement | Window = $state(window)

  function getScrollTop(): number {
    if (scrollTarget instanceof Window) {
      return document.documentElement.scrollTop || document.body.scrollTop
    }
    return (scrollTarget as HTMLElement).scrollTop
  }

  function handleScroll() {
    visible = getScrollTop() >= visibilityHeight
  }

  function handleClick() {
    if (scrollTarget instanceof Window) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      (scrollTarget as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' })
    }
    onclick?.()
  }

  onMount(() => {
    if (target) {
      const el = document.querySelector(target)
      if (el) scrollTarget = el as HTMLElement
    }
    const t = scrollTarget as EventTarget
    t.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  })

  onDestroy(() => {
    const t = scrollTarget as EventTarget
    t.removeEventListener('scroll', handleScroll)
  })
</script>

{#if visible}
  <div
    class="{ns.b()} {className}"
    style="right:{right}px;bottom:{bottom}px;"
    onclick={handleClick}
    role="button"
    tabindex="0"
  >
    {#if children}
      {@render children()}
    {:else}
      <svg viewBox="0 0 1024 1024" width="16" height="16" fill="currentColor">
        <path d="M572.235 205.282v600.365a30.118 30.118 0 1 1-60.235 0V205.282L292.382 424.9a30.118 30.118 0 1 1-42.6-42.6L459.7 172.384a73.527 73.527 0 0 1 104.005 0l209.918 209.916a30.118 30.118 0 1 1-42.6 42.6L572.235 205.282z" />
      </svg>
    {/if}
  </div>
{/if}

<style lang="scss">
  .su-backtop {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--su-bg-color);
    box-shadow: var(--su-box-shadow-light);
    cursor: pointer;
    z-index: 2000;
    color: var(--su-color-primary);
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--su-color-primary-light-9);
    }
  }
</style>
