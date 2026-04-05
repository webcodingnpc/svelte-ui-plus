<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { setContext } from 'svelte'

  interface Props {
    /** 方向 */
    direction?: 'vertical' | 'horizontal'
    /** 点击锚点事件 */
    onclick?: (e: Event, link: { href: string; title: string }) => void
    /** 滚动变化事件 */
    onchange?: (href: string) => void
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('anchor')

  let {
    direction = 'vertical',
    onclick: onclickProp,
    onchange,
    children,
    class: className = '',
  }: Props = $props()

  let activeHref = $state('')

  function handleLinkClick(href: string, title: string, e: Event) {
    activeHref = href
    onchange?.(href)
    onclickProp?.(e, { href, title })

    const targetEl = document.querySelector(href)
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  setContext('su-anchor', {
    get activeHref() { return activeHref },
    handleLinkClick,
  })

  let classes = $derived(
    [ns.b(), ns.m(direction), className].filter(Boolean).join(' '),
  )
</script>

<div class={classes}>
  {@render children?.()}
</div>

<style lang="scss">
  .su-anchor {
    &--vertical {
      border-left: 2px solid var(--su-border-color-light);
      padding-left: 8px;
    }

    &--horizontal {
      display: flex;
      gap: 16px;
      border-bottom: 2px solid var(--su-border-color-light);
      padding-bottom: 8px;
    }
  }
</style>
