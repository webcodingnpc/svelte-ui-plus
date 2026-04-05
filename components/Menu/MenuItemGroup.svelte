<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 标题 */
    title?: string
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('menu-item-group')

  let { title = '', children, class: className = '' }: Props = $props()
</script>

<li class="{ns.b()} {className}" role="group">
  <div class={ns.e('title')}>{title}</div>
  <ul class={ns.e('list')}>
    {@render children?.()}
  </ul>
</li>

<style lang="scss">
  .su-menu-item-group {
    list-style: none;

    &__title {
      padding: 8px 20px;
      font-size: 12px;
      color: var(--su-text-color-secondary);
      line-height: 1.5;
    }

    &__list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }
</style>
