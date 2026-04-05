<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 方向 */
    direction?: 'horizontal' | 'vertical'
    /** 子内容（SplitterPanel） */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('splitter')

  let {
    direction = 'horizontal',
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.m(direction), className].filter(Boolean).join(' '),
  )
</script>

<div class={classes}>
  {@render children?.()}
</div>

<style lang="scss">
  .su-splitter {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;

    &--horizontal {
      flex-direction: row;
    }

    &--vertical {
      flex-direction: column;
    }
  }
</style>
