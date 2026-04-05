<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { onMount, onDestroy } from 'svelte'

  interface Props {
    /** 是否禁用 */
    disabled?: boolean
    /** 加载延迟（ms） */
    delay?: number
    /** 距离底部多少px时触发 */
    distance?: number
    /** 是否立即检查 */
    immediate?: boolean
    /** 加载中 */
    loading?: boolean
    /** 加载事件 */
    onload?: () => void
    /** 加载中内容 */
    loadingSlot?: Snippet
    /** 无更多内容 */
    noMore?: boolean
    /** 无更多内容插槽 */
    noMoreSlot?: Snippet
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('infinite-scroll')

  let {
    disabled = false,
    delay = 200,
    distance = 10,
    immediate = true,
    loading = $bindable(false),
    onload,
    loadingSlot,
    noMore = false,
    noMoreSlot,
    children,
    class: className = '',
  }: Props = $props()

  let scrollRef: HTMLElement | undefined = $state()
  let timer: ReturnType<typeof setTimeout> | null = null

  function check() {
    if (disabled || loading || noMore || !scrollRef) return

    const { scrollTop, scrollHeight, clientHeight } = scrollRef
    if (scrollHeight - scrollTop - clientHeight <= distance) {
      loading = true
      onload?.()
    }
  }

  function handleScroll() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(check, delay)
  }

  onMount(() => {
    if (immediate) {
      check()
    }
  })

  onDestroy(() => {
    if (timer) clearTimeout(timer)
  })
</script>

<div class="{ns.b()} {className}" bind:this={scrollRef} onscroll={handleScroll}>
  {@render children?.()}
  {#if loading}
    <div class={ns.e('loading')}>
      {#if loadingSlot}
        {@render loadingSlot()}
      {:else}
        <span class={ns.e('spinner')}></span>
        <span>加载中...</span>
      {/if}
    </div>
  {/if}
  {#if noMore}
    <div class={ns.e('no-more')}>
      {#if noMoreSlot}
        {@render noMoreSlot()}
      {:else}
        <span>没有更多了</span>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .su-infinite-scroll {
    overflow-y: auto;

    &__loading,
    &__no-more {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 16px;
      font-size: 14px;
      color: var(--su-text-color-secondary);
    }

    &__spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid var(--su-border-color);
      border-top-color: var(--su-color-primary);
      border-radius: 50%;
      animation: su-spin 0.8s linear infinite;
    }
  }

  @keyframes su-spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
