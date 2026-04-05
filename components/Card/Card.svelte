<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 标题区域 */
    header?: Snippet
    /** 阴影显示时机 */
    shadow?: 'always' | 'hover' | 'never'
    /** body 样式 */
    bodyStyle?: string
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('card')

  let {
    header,
    shadow = 'always',
    bodyStyle = '',
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.is(`shadow-${shadow}`, true), className]
      .filter(Boolean)
      .join(' '),
  )
</script>

<div class={classes}>
  {#if header}
    <div class={ns.e('header')}>
      {@render header()}
    </div>
  {/if}
  <div class={ns.e('body')} style={bodyStyle}>
    {@render children?.()}
  </div>
</div>

<style lang="scss">
  .su-card {
    border: 1px solid var(--su-border-color-lighter);
    border-radius: var(--su-border-radius-base);
    background: var(--su-fill-color-blank);
    overflow: hidden;
    transition: box-shadow var(--su-transition-duration);

    &.is-shadow-always {
      box-shadow: var(--su-box-shadow-light);
    }

    &.is-shadow-hover:hover {
      box-shadow: var(--su-box-shadow-light);
    }

    &.is-shadow-never {
      box-shadow: none;
    }

    &__header {
      padding: 18px 20px;
      border-bottom: 1px solid var(--su-border-color-lighter);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__body {
      padding: 20px;
    }
  }
</style>
