<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { setContext } from 'svelte'

  interface Props {
    /** 当前步骤索引 */
    current?: number
    /** 是否显示 */
    open?: boolean
    /** 遮罩层 */
    mask?: boolean
    /** 关闭事件 */
    onclose?: () => void
    /** 步骤变化事件 */
    onchange?: (current: number) => void
    /** 完成事件 */
    onfinish?: () => void
    /** 子内容（TourStep） */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('tour')

  let {
    current = $bindable(0),
    open = $bindable(false),
    mask = true,
    onclose,
    onchange,
    onfinish,
    children,
    class: className = '',
  }: Props = $props()

  let totalSteps = $state(0)
  let steps: { title: string; description: string; target?: string }[] = $state([])

  function registerStep(step: { title: string; description: string; target?: string }) {
    steps = [...steps, step]
    totalSteps = steps.length
    return steps.length - 1
  }

  function handlePrev() {
    if (current > 0) {
      current--
      onchange?.(current)
    }
  }

  function handleNext() {
    if (current < totalSteps - 1) {
      current++
      onchange?.(current)
    } else {
      open = false
      onfinish?.()
    }
  }

  function handleClose() {
    open = false
    onclose?.()
  }

  setContext('su-tour', {
    get current() { return current },
    registerStep,
  })
</script>

{@render children?.()}

{#if open && steps[current]}
  {#if mask}
    <div class={ns.e('mask')} onclick={handleClose}></div>
  {/if}
  <div class="{ns.b()} {className}">
    <div class={ns.e('header')}>
      <span class={ns.e('title')}>{steps[current]?.title || ''}</span>
      <button class={ns.e('close')} onclick={handleClose}>
        <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
          <path d="M557.312 512l209.664-209.664a32 32 0 0 0-45.312-45.312L512 466.688 302.336 257.024a32 32 0 0 0-45.312 45.312L466.688 512 257.024 721.664a32 32 0 0 0 45.312 45.312L512 557.312l209.664 209.664a32 32 0 0 0 45.312-45.312L557.312 512z" />
        </svg>
      </button>
    </div>
    {#if steps[current]?.description}
      <div class={ns.e('body')}>{steps[current].description}</div>
    {/if}
    <div class={ns.e('footer')}>
      <div class={ns.e('indicators')}>
        {#each steps as _, i}
          <span
            class="{ns.e('dot')} {i === current ? 'is-active' : ''}"
          ></span>
        {/each}
      </div>
      <div class={ns.e('actions')}>
        {#if current > 0}
          <button class="{ns.e('btn')} {ns.em('btn', 'prev')}" onclick={handlePrev}>上一步</button>
        {/if}
        <button class="{ns.e('btn')} {ns.em('btn', 'next')}" onclick={handleNext}>
          {current === totalSteps - 1 ? '完成' : '下一步'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .su-tour {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2001;
    width: 420px;
    max-width: calc(100vw - 32px);
    background-color: var(--su-bg-color);
    border-radius: var(--su-border-radius-base);
    box-shadow: var(--su-box-shadow);
    padding: 20px;

    &__mask {
      position: fixed;
      inset: 0;
      z-index: 2000;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    &__title {
      font-size: 16px;
      font-weight: 500;
      color: var(--su-text-color-primary);
    }

    &__close {
      display: inline-flex;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--su-text-color-regular);
      padding: 4px;
      border-radius: 4px;

      &:hover {
        color: var(--su-color-primary);
        background-color: var(--su-fill-color-light);
      }
    }

    &__body {
      font-size: 14px;
      color: var(--su-text-color-regular);
      line-height: 1.6;
      margin-bottom: 16px;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__indicators {
      display: flex;
      gap: 6px;
    }

    &__dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--su-border-color);
      transition: background-color 0.15s ease;

      &.is-active {
        background-color: var(--su-color-primary);
      }
    }

    &__actions {
      display: flex;
      gap: 8px;
    }

    &__btn {
      padding: 5px 16px;
      font-size: 14px;
      border-radius: var(--su-border-radius-base);
      cursor: pointer;
      transition: all 0.15s ease;

      &--prev {
        background-color: var(--su-bg-color);
        border: 1px solid var(--su-border-color);
        color: var(--su-text-color-regular);

        &:hover {
          color: var(--su-color-primary);
          border-color: var(--su-color-primary-light-7);
        }
      }

      &--next {
        background-color: var(--su-color-primary);
        border: 1px solid var(--su-color-primary);
        color: #fff;

        &:hover {
          opacity: 0.85;
        }
      }
    }
  }
</style>
