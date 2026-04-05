<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { onMount, onDestroy } from 'svelte'

  interface Props {
    /** 距离窗口顶部触发固定的距离 */
    offset?: number
    /** 定位层级 */
    zIndex?: number
    /** 固定位置：顶部 / 底部 */
    position?: 'top' | 'bottom'
    /** 指定容器选择器 */
    target?: string
    /** 固定状态变化事件 */
    onchange?: (fixed: boolean) => void
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('affix')

  let {
    offset = 0,
    zIndex = 100,
    position = 'top',
    target,
    onchange,
    children,
    class: className = '',
  }: Props = $props()

  let isFixed = $state(false)
  let rootRef: HTMLElement | undefined = $state()
  let width = $state(0)
  let height = $state(0)

  function update() {
    if (!rootRef) return
    const rect = rootRef.getBoundingClientRect()
    width = rect.width
    height = rect.height

    let shouldFix: boolean
    if (position === 'top') {
      shouldFix = rect.top <= offset
    } else {
      shouldFix = window.innerHeight - rect.bottom <= offset
    }

    if (shouldFix !== isFixed) {
      isFixed = shouldFix
      onchange?.(isFixed)
    }
  }

  onMount(() => {
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()
  })

  onDestroy(() => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  })

  let fixedStyle = $derived(
    isFixed
      ? `position:fixed;${position}:${offset}px;z-index:${zIndex};width:${width}px;`
      : '',
  )
</script>

<div class="{ns.b()} {className}" bind:this={rootRef}>
  {#if isFixed}
    <div style="width:{width}px;height:{height}px;"></div>
  {/if}
  <div class={ns.e('inner')} class:is-fixed={isFixed} style={fixedStyle}>
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .su-affix {
    &__inner {
      &.is-fixed {
        position: fixed;
      }
    }
  }
</style>
