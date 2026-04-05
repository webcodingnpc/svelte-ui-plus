<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    gutter?: number
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
    align?: 'top' | 'middle' | 'bottom'
    tag?: string
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('row')
  let {
    gutter = 0,
    justify = 'start',
    align = 'top',
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.is('justify-' + justify, justify !== 'start'), ns.is('align-' + align, align !== 'top'), className]
      .filter(Boolean)
      .join(' ')
  )

  let style = $derived(
    gutter ? `margin-left: -${gutter / 2}px; margin-right: -${gutter / 2}px;` : ''
  )
</script>

<div class={classes} {style} data-gutter={gutter || undefined}>
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .su-row {
    display: flex;
    flex-wrap: wrap;

    &.is-justify-center {
      justify-content: center;
    }
    &.is-justify-end {
      justify-content: flex-end;
    }
    &.is-justify-space-between {
      justify-content: space-between;
    }
    &.is-justify-space-around {
      justify-content: space-around;
    }
    &.is-justify-space-evenly {
      justify-content: space-evenly;
    }

    &.is-align-middle {
      align-items: center;
    }
    &.is-align-bottom {
      align-items: flex-end;
    }
  }
</style>
