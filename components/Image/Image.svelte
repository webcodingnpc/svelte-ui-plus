<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    src?: string
    alt?: string
    fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
    lazy?: boolean
    previewSrcList?: string[]
    initialIndex?: number
    zIndex?: number
    hideOnClickModal?: boolean
    loading?: 'eager' | 'lazy'
    placeholder?: Snippet
    error?: Snippet
    class?: string
  }

  const ns = useNamespace('image')
  let {
    src = '',
    alt = '',
    fit = 'fill',
    lazy = false,
    previewSrcList,
    initialIndex = 0,
    zIndex = 2000,
    hideOnClickModal = false,
    loading,
    placeholder,
    error,
    class: className = '',
  }: Props = $props()

  let status = $state<'loading' | 'loaded' | 'error'>('loading')
  let showViewer = $state(false)

  let classes = $derived([ns.b(), className].filter(Boolean).join(' '))

  function handleLoad() {
    status = 'loaded'
  }

  function handleError() {
    status = 'error'
  }

  function openViewer() {
    if (previewSrcList && previewSrcList.length > 0) {
      showViewer = true
    }
  }

  function closeViewer() {
    showViewer = false
  }
</script>

<div class={classes} onclick={openViewer}>
  {#if status === 'loading' && placeholder}
    <div class={ns.e('placeholder')}>
      {@render placeholder()}
    </div>
  {/if}

  {#if status === 'error'}
    {#if error}
      <div class={ns.e('error')}>
        {@render error()}
      </div>
    {:else}
      <div class={ns.e('error')}>
        <Icon name="warning" size={24} />
        <span>加载失败</span>
      </div>
    {/if}
  {/if}

  <img
    {src}
    {alt}
    loading={lazy ? 'lazy' : loading}
    style="object-fit: {fit}; {status !== 'loaded' ? 'display: none;' : ''}"
    class={ns.e('inner')}
    onload={handleLoad}
    onerror={handleError}
  />

  {#if previewSrcList && previewSrcList.length > 0 && status === 'loaded'}
    <div class={ns.e('preview-icon')}>
      <Icon name="fullscreen" size={16} />
    </div>
  {/if}
</div>

{#if showViewer && previewSrcList}
  <div class={ns.e('viewer')} style="z-index: {zIndex}">
    <div
      class={ns.e('viewer-mask')}
      onclick={() => { if (hideOnClickModal) closeViewer() }}
    ></div>
    <div class={ns.e('viewer-close')} onclick={closeViewer}>
      <Icon name="close" size={24} />
    </div>
    <div class={ns.e('viewer-canvas')}>
      <img src={previewSrcList[initialIndex]} alt="" />
    </div>
  </div>
{/if}

<style lang="scss">
  .su-image {
    position: relative;
    display: inline-block;
    overflow: hidden;

    &__inner {
      width: 100%;
      height: 100%;
      display: block;
    }

    &__placeholder,
    &__error {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      height: 100%;
      background: var(--su-fill-color);
      color: var(--su-text-color-secondary);
      font-size: var(--su-font-size-base);
    }

    &__preview-icon {
      position: absolute;
      bottom: 8px;
      right: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
      opacity: 0;
      transition: opacity var(--su-transition-duration-fast);
    }

    &:hover .su-image__preview-icon {
      opacity: 1;
      cursor: zoom-in;
    }

    &__viewer {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__viewer-mask {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
    }

    &__viewer-close {
      position: absolute;
      top: 40px;
      right: 40px;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      color: #fff;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.7);
      }
    }

    &__viewer-canvas {
      position: relative;
      z-index: 1;
      max-width: 90vw;
      max-height: 90vh;

      img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
      }
    }
  }
</style>
