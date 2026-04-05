<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 方向 */
    direction?: 'horizontal' | 'vertical'
    /** 文字位置 */
    contentPosition?: 'left' | 'center' | 'right'
    /** 边框样式 */
    borderStyle?: 'solid' | 'dashed' | 'dotted'
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('divider')

  let {
    direction = 'horizontal',
    contentPosition = 'center',
    borderStyle = 'solid',
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.m(direction), className].filter(Boolean).join(' '),
  )
</script>

<div class={classes} role="separator" style="--su-divider-border-style: {borderStyle}">
  {#if children && direction === 'horizontal'}
    <div class="{ns.e('text')} {ns.is(contentPosition, true)}">
      {@render children()}
    </div>
  {/if}
</div>

<style lang="scss">
  .su-divider {
    position: relative;

    &--horizontal {
      display: flex;
      align-items: center;
      margin: 24px 0;

      &::before,
      &::after {
        content: '';
        flex: 1;
        border-top: 1px var(--su-divider-border-style, solid) var(--su-border-color);
      }
    }

    &--vertical {
      display: inline-block;
      width: 1px;
      height: 1em;
      margin: 0 8px;
      vertical-align: middle;
      background: var(--su-border-color);
    }
  }

  .su-divider__text {
    padding: 0 20px;
    font-size: var(--su-font-size-base);
    color: var(--su-text-color-primary);
    font-weight: 500;
    white-space: nowrap;

    &.is-left {
      &::before {
        max-width: 10%;
      }
    }

    &.is-right {
      &::after {
        max-width: 10%;
      }
    }
  }

  // 无文字时只显示线条
  .su-divider--horizontal:not(:has(.su-divider__text)) {
    &::before {
      flex: 1;
    }
    &::after {
      display: none;
    }
  }
</style>
