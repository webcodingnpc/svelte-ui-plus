<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 列表数据 */
    items?: any[]
    /** 列表高度 */
    height?: number
    /** 每项高度 */
    itemHeight?: number
    /** 预渲染数量 */
    overscan?: number
    /** 渲染项的插槽 */
    item?: Snippet<[{ item: any; index: number }]>
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('virtual-list')

  let {
    items = [],
    height = 400,
    itemHeight = 40,
    overscan = 5,
    item: itemSlot,
    class: className = '',
  }: Props = $props()

  let scrollTop = $state(0)
  let containerRef: HTMLElement | undefined = $state()

  let totalHeight = $derived(items.length * itemHeight)
  let visibleCount = $derived(Math.ceil(height / itemHeight))
  let startIndex = $derived(Math.max(0, Math.floor(scrollTop / itemHeight) - overscan))
  let endIndex = $derived(Math.min(items.length, Math.floor(scrollTop / itemHeight) + visibleCount + overscan))
  let visibleItems = $derived(items.slice(startIndex, endIndex))
  let offsetY = $derived(startIndex * itemHeight)

  function handleScroll() {
    if (containerRef) {
      scrollTop = containerRef.scrollTop
    }
  }
</script>

<div
  class="{ns.b()} {className}"
  style="height:{height}px;overflow-y:auto;"
  bind:this={containerRef}
  onscroll={handleScroll}
>
  <div style="height:{totalHeight}px;position:relative;">
    <div style="transform:translateY({offsetY}px);">
      {#each visibleItems as row, i (startIndex + i)}
        <div class={ns.e('item')} style="height:{itemHeight}px;">
          {#if itemSlot}
            {@render itemSlot({ item: row, index: startIndex + i })}
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .su-virtual-list {
    &__item {
      display: flex;
      align-items: center;
    }
  }
</style>
