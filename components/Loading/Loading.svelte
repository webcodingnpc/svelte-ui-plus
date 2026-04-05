<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 是否加载中 */
    loading?: boolean
    /** 加载文案 */
    text?: string
    /** 是否全屏 */
    fullscreen?: boolean
    /** 背景色 */
    background?: string
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('loading')

  let {
    loading = true,
    text = '',
    fullscreen = false,
    background = 'rgba(255, 255, 255, 0.9)',
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.is('fullscreen', fullscreen), className]
      .filter(Boolean)
      .join(' '),
  )
</script>

<div class={ns.e('container')}>
  {@render children?.()}

  {#if loading}
    <div class={classes} style="background: {background}">
      <div class={ns.e('spinner')}>
        <svg viewBox="0 0 50 50" class={ns.e('svg')}>
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
        {#if text}
          <p class={ns.e('text')}>{text}</p>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .su-loading__container {
    position: relative;
  }

  .su-loading {
    position: absolute;
    inset: 0;
    z-index: var(--su-z-index-top);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity var(--su-transition-duration-fast);

    &.is-fullscreen {
      position: fixed;
    }

    &__spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    &__svg {
      width: 42px;
      height: 42px;
      color: var(--su-color-primary);
      animation: su-loading-rotate 2s linear infinite;

      circle {
        animation: su-loading-dash 1.5s ease-in-out infinite;
      }
    }

    &__text {
      font-size: var(--su-font-size-base);
      color: var(--su-color-primary);
      margin: 0;
    }
  }

  @keyframes su-loading-rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes su-loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }
</style>
