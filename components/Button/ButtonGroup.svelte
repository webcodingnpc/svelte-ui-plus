<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 按钮组尺寸 */
    size?: ComponentSize
    /** 子内容（Button 组件） */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('button-group')
  let { size, children, class: className = '' }: Props = $props()

  let classes = $derived(
    [ns.b(), size ? ns.m(size) : '', className].filter(Boolean).join(' '),
  )
</script>

<div class={classes}>
  {@render children?.()}
</div>

<style lang="scss">
  .su-button-group {
    display: inline-flex;

    :global(.su-button) {
      border-radius: 0;
      position: relative;

      &:first-child {
        border-top-left-radius: var(--su-border-radius-base);
        border-bottom-left-radius: var(--su-border-radius-base);
      }

      &:last-child {
        border-top-right-radius: var(--su-border-radius-base);
        border-bottom-right-radius: var(--su-border-radius-base);
      }

      &:not(:last-child) {
        margin-right: -1px;
      }

      &:hover,
      &:focus {
        z-index: 1;
      }

      &:active {
        z-index: 1;
      }
    }
  }
</style>
