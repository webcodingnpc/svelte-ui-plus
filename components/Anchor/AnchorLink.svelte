<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { getContext } from 'svelte'

  interface Props {
    /** 锚点链接 */
    href: string
    /** 标题 */
    title?: string
    /** 子链接 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('anchor-link')

  let {
    href,
    title = '',
    children,
    class: className = '',
  }: Props = $props()

  const anchor = getContext<any>('su-anchor')

  let isActive = $derived(anchor?.activeHref === href)

  function handleClick(e: Event) {
    e.preventDefault()
    anchor?.handleLinkClick(href, title, e)
  }

  let classes = $derived(
    [ns.b(), isActive && ns.is('active'), className].filter(Boolean).join(' '),
  )
</script>

<div class={classes}>
  <a class={ns.e('title')} {href} onclick={handleClick}>
    {title}
  </a>
  {#if children}
    <div class={ns.e('children')}>
      {@render children()}
    </div>
  {/if}
</div>

<style lang="scss">
  .su-anchor-link {
    margin: 4px 0;

    &__title {
      display: block;
      padding: 4px 0;
      font-size: 14px;
      color: var(--su-text-color-regular);
      text-decoration: none;
      transition: color 0.15s ease;
      cursor: pointer;

      &:hover {
        color: var(--su-color-primary);
      }
    }

    &.is-active > .su-anchor-link__title {
      color: var(--su-color-primary);
      font-weight: 500;
    }

    &__children {
      padding-left: 12px;
    }
  }
</style>
