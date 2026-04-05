<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 是否展开 */
    expanded?: boolean
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('collapse-transition')

  let { expanded = false, children, class: className = '' }: Props = $props()

  let contentRef: HTMLElement | undefined = $state()
  let height = $state('0px')

  $effect(() => {
    if (contentRef) {
      if (expanded) {
        height = contentRef.scrollHeight + 'px'
        // 展开完成后设为 auto 以允许内容变化
        const timer = setTimeout(() => {
          height = 'auto'
        }, 300)
        return () => clearTimeout(timer)
      } else {
        // 先设为具体值再设为 0，触发动画
        if (height === 'auto') {
          height = contentRef.scrollHeight + 'px'
          // 强制回流
          contentRef.offsetHeight
        }
        requestAnimationFrame(() => {
          height = '0px'
        })
      }
    }
  })
</script>

<div
  class="{ns.b()} {className}"
  bind:this={contentRef}
  style="height:{height};overflow:hidden;transition:height 0.3s ease;"
>
  {@render children?.()}
</div>

<style lang="scss">
  .su-collapse-transition {
    will-change: height;
  }
</style>
