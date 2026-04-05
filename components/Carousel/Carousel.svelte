<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { onMount, onDestroy } from 'svelte'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    initialIndex?: number
    height?: string
    trigger?: 'hover' | 'click'
    autoplay?: boolean
    interval?: number
    indicatorPosition?: '' | 'outside' | 'none'
    arrow?: 'always' | 'hover' | 'never'
    type?: '' | 'card'
    loop?: boolean
    direction?: 'horizontal' | 'vertical'
    pauseOnHover?: boolean
    onchange?: (current: number, prev: number) => void
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('carousel')
  let {
    initialIndex = 0,
    height = '300px',
    trigger = 'hover',
    autoplay = true,
    interval = 3000,
    indicatorPosition = '',
    arrow = 'hover',
    type = '',
    loop = true,
    direction = 'horizontal',
    pauseOnHover = true,
    onchange,
    children,
    class: className = '',
  }: Props = $props()

  let activeIndex = $state(0)
  let itemCount = $state(0)

  $effect(() => { activeIndex = initialIndex })
  let timer: ReturnType<typeof setInterval> | null = null
  let hovering = $state(false)

  let classes = $derived(
    [ns.b(), ns.m(direction), type ? ns.m('card') : '', className]
      .filter(Boolean)
      .join(' ')
  )

  export function setItemCount(count: number) {
    itemCount = count
  }

  function startAutoplay() {
    if (!autoplay || itemCount <= 1) return
    stopAutoplay()
    timer = setInterval(() => {
      if (pauseOnHover && hovering) return
      next()
    }, interval)
  }

  function stopAutoplay() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function setActive(index: number) {
    if (index === activeIndex) return
    const prev = activeIndex
    if (loop) {
      activeIndex = ((index % itemCount) + itemCount) % itemCount
    } else {
      activeIndex = Math.max(0, Math.min(index, itemCount - 1))
    }
    onchange?.(activeIndex, prev)
  }

  function prev() {
    setActive(activeIndex - 1)
  }

  function next() {
    setActive(activeIndex + 1)
  }

  onMount(() => {
    // 自动检测子元素数量
    const container = document.querySelector(`.${ns.e('container')}`)
    if (container) {
      itemCount = container.children.length
    }
    startAutoplay()
  })

  onDestroy(() => {
    stopAutoplay()
  })
</script>

<div
  class={classes}
  style="height: {height}"
  onmouseenter={() => hovering = true}
  onmouseleave={() => hovering = false}
>
  <div class={ns.e('container')} style="transform: translateX(-{activeIndex * 100}%); transition: transform 0.4s ease;">
    {#if children}{@render children()}{/if}
  </div>

  {#if arrow !== 'never'}
    <button
      type="button"
      class="{ns.e('arrow')} {ns.e('arrow--left')} {arrow === 'always' || hovering ? 'is-visible' : ''}"
      onclick={prev}
    >
      <Icon name="arrow-left" size={16} />
    </button>
    <button
      type="button"
      class="{ns.e('arrow')} {ns.e('arrow--right')} {arrow === 'always' || hovering ? 'is-visible' : ''}"
      onclick={next}
    >
      <Icon name="arrow-right" size={16} />
    </button>
  {/if}

  {#if indicatorPosition !== 'none'}
    <ul class="{ns.e('indicators')} {indicatorPosition === 'outside' ? 'is-outside' : ''}">
      {#each Array.from({ length: itemCount }) as _, i}
        <li
          class="{ns.e('indicator')} {activeIndex === i ? 'is-active' : ''}"
          onmouseenter={() => { if (trigger === 'hover') setActive(i) }}
          onclick={() => { if (trigger === 'click') setActive(i) }}
        ></li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  .su-carousel {
    position: relative;
    overflow: hidden;

    &__container {
      display: flex;
      height: 100%;
      position: relative;
    }

    &__arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: rgba(31, 45, 61, 0.11);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: #fff;
      opacity: 0;
      transition: opacity var(--su-transition-duration-fast);

      &.is-visible {
        opacity: 1;
      }

      &:hover {
        background: rgba(31, 45, 61, 0.23);
      }

      &--left {
        left: 16px;
      }

      &--right {
        right: 16px;
      }
    }

    &__indicators {
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      list-style: none;
      margin: 0;
      padding: 0;
      z-index: 2;

      &.is-outside {
        position: relative;
        bottom: auto;
        margin-top: 12px;
      }
    }

    &__indicator {
      width: 30px;
      height: 3px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 1px;
      cursor: pointer;
      transition: all var(--su-transition-duration-fast);

      &.is-active {
        background: #fff;
      }
    }

    .is-outside &__indicator {
      background: var(--su-border-color);

      &.is-active {
        background: var(--su-color-primary);
      }
    }
  }
</style>
