<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ComponentSize, ComponentType } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    /** 类型 */
    type?: ComponentType | 'default'
    /** 尺寸 */
    size?: ComponentSize
    /** 是否可关闭 */
    closable?: boolean
    /** 主题 */
    effect?: 'dark' | 'light' | 'plain'
    /** 是否圆角 */
    round?: boolean
    /** 关闭事件 */
    onclose?: () => void
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('tag')

  let {
    type = 'default',
    size = 'default',
    closable = false,
    effect = 'light',
    round = false,
    onclose,
    children,
    class: className = '',
  }: Props = $props()

  let visible = $state(true)

  let classes = $derived(
    [
      ns.b(),
      ns.m(type !== 'default' ? type : undefined),
      ns.m(size !== 'default' ? size : undefined),
      ns.m(effect),
      ns.is('round', round),
      className,
    ]
      .filter(Boolean)
      .join(' '),
  )

  function handleClose(e: MouseEvent) {
    e.stopPropagation()
    visible = false
    onclose?.()
  }
</script>

{#if visible}
  <span class={classes}>
    {@render children?.()}
    {#if closable}
      <span class={ns.e('close')} onclick={handleClose}>
        <Icon name="close" size={12} />
      </span>
    {/if}
  </span>
{/if}

<style lang="scss">
  .su-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 24px;
    padding: 0 8px;
    font-size: var(--su-font-size-extra-small);
    border-radius: var(--su-border-radius-base);
    white-space: nowrap;
    line-height: 1;
    border: 1px solid var(--su-border-color);
    background: var(--su-fill-color-blank);
    color: var(--su-text-color-regular);

    &__close {
      display: inline-flex;
      cursor: pointer;
      border-radius: 50%;
      transition: all var(--su-transition-duration-fast);

      &:hover {
        background: var(--su-text-color-placeholder);
        color: #fff;
      }
    }

    &.is-round {
      border-radius: var(--su-border-radius-round);
    }

    // 类型颜色
    @each $type in primary, success, warning, danger, info {
      &--#{$type} {
        &.su-tag--light {
          background: var(--su-color-#{$type}-light-9);
          border-color: var(--su-color-#{$type}-light-7);
          color: var(--su-color-#{$type});
        }

        &.su-tag--dark {
          background: var(--su-color-#{$type});
          border-color: var(--su-color-#{$type});
          color: #fff;
        }

        &.su-tag--plain {
          background: transparent;
          border-color: var(--su-color-#{$type}-light-5);
          color: var(--su-color-#{$type});
        }
      }
    }

    // 尺寸
    &--large {
      height: 28px;
      padding: 0 10px;
      font-size: var(--su-font-size-small);
    }

    &--small {
      height: 20px;
      padding: 0 6px;
      font-size: 10px;
    }
  }
</style>
