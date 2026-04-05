<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ComponentType } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 显示值 */
    value?: string | number
    /** 最大值（超出显示 max+） */
    max?: number
    /** 是否小红点 */
    isDot?: boolean
    /** 是否隐藏 */
    hidden?: boolean
    /** 类型 */
    type?: ComponentType
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('badge')

  let {
    value = '',
    max = 99,
    isDot = false,
    hidden = false,
    type = 'danger',
    children,
    class: className = '',
  }: Props = $props()

  let displayValue = $derived(() => {
    if (isDot) return ''
    if (typeof value === 'number' && max && value > max) return `${max}+`
    return `${value}`
  })

  let classes = $derived(
    [ns.b(), className].filter(Boolean).join(' '),
  )

  let supClasses = $derived(
    [
      ns.e('content'),
      ns.m(type),
      ns.is('dot', isDot),
      ns.is('fixed', !!children),
    ]
      .filter(Boolean)
      .join(' '),
  )
</script>

{#if !hidden}
  <div class={classes}>
    {@render children?.()}
    <sup class={supClasses}>{displayValue()}</sup>
  </div>
{:else}
  {@render children?.()}
{/if}

<style lang="scss">
  .su-badge {
    display: inline-flex;
    position: relative;
    vertical-align: middle;

    &__content {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 18px;
      min-width: 18px;
      padding: 0 6px;
      font-size: 12px;
      color: #fff;
      border-radius: 10px;
      white-space: nowrap;
      line-height: 1;

      &.is-fixed {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        z-index: var(--su-z-index-normal);
      }

      &.is-dot {
        width: 8px;
        height: 8px;
        min-width: auto;
        padding: 0;
        border-radius: 50%;
      }

      @each $type in primary, success, warning, danger, info {
        &.su-badge--#{$type} {
          background: var(--su-color-#{$type});
        }
      }
    }
  }
</style>
