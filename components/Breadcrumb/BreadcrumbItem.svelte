<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 链接地址 */
    href?: string
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('breadcrumb')

  let { href, children, class: className = '' }: Props = $props()
</script>

<span class="{ns.e('item')} {className}">
  {#if href}
    <a class={ns.e('link')} {href}>
      {@render children?.()}
    </a>
  {:else}
    <span class={ns.e('text')}>
      {@render children?.()}
    </span>
  {/if}
  <span class={ns.e('separator')}></span>
</span>

<style lang="scss">
  .su-breadcrumb__item {
    display: inline-flex;
    align-items: center;

    &:last-child {
      .su-breadcrumb__separator {
        display: none;
      }

      .su-breadcrumb__text {
        color: var(--su-text-color-primary);
        font-weight: 600;
      }
    }
  }

  .su-breadcrumb__link {
    color: var(--su-text-color-regular);
    text-decoration: none;
    transition: color var(--su-transition-duration-fast);

    &:hover {
      color: var(--su-color-primary);
    }
  }

  .su-breadcrumb__text {
    color: var(--su-text-color-secondary);
  }

  .su-breadcrumb__separator {
    margin: 0 8px;
    color: var(--su-text-color-placeholder);

    &::after {
      content: var(--su-breadcrumb-separator, '/');
    }
  }
</style>
