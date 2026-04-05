<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { getContext } from 'svelte'

  interface Props {
    /** 步骤索引（内部使用） */
    stepIndex?: number
    /** 标题 */
    title?: string
    /** 描述 */
    description?: string
    /** 自定义图标 */
    icon?: Snippet
    /** 状态 */
    status?: 'wait' | 'process' | 'finish' | 'error' | 'success'
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('step')

  let {
    stepIndex = 0,
    title = '',
    description = '',
    icon,
    status,
    children,
    class: className = '',
  }: Props = $props()

  const steps = getContext<any>('su-steps')

  let currentStatus = $derived(() => {
    if (status) return status
    if (!steps) return 'wait'
    if (stepIndex < steps.active) return steps.finishStatus
    if (stepIndex === steps.active) return steps.processStatus
    return 'wait'
  })

  let classes = $derived(
    [ns.b(), ns.is(currentStatus()), className].filter(Boolean).join(' '),
  )
</script>

<div class={classes}>
  <div class={ns.e('head')}>
    <div class={ns.e('line')}></div>
    <div class={ns.e('icon')}>
      {#if icon}
        {@render icon()}
      {:else if currentStatus() === 'finish' || currentStatus() === 'success'}
        <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
          <path d="M406.656 706.944L195.84 496.128a64 64 0 0 0-90.496 90.496l256 256a64 64 0 0 0 90.496 0l512-512a64 64 0 0 0-90.496-90.496L406.656 706.944z" />
        </svg>
      {:else if currentStatus() === 'error'}
        <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
          <path d="M557.312 512l209.664-209.664a32 32 0 0 0-45.312-45.312L512 466.688 302.336 257.024a32 32 0 0 0-45.312 45.312L466.688 512 257.024 721.664a32 32 0 0 0 45.312 45.312L512 557.312l209.664 209.664a32 32 0 0 0 45.312-45.312L557.312 512z" />
        </svg>
      {:else}
        <span>{stepIndex + 1}</span>
      {/if}
    </div>
  </div>
  <div class={ns.e('main')}>
    <div class={ns.e('title')}>{title}</div>
    {#if description}
      <div class={ns.e('description')}>{description}</div>
    {/if}
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>

<style lang="scss">
  .su-step {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:last-child .su-step__line {
      display: none;
    }

    &__head {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: center;
    }

    &__line {
      position: absolute;
      top: 50%;
      left: 50%;
      right: -50%;
      height: 2px;
      background-color: var(--su-border-color-light);
      transform: translateY(-50%);
    }

    &__icon {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid var(--su-border-color);
      background-color: var(--su-bg-color);
      font-size: 14px;
      color: var(--su-text-color-placeholder);
      transition: all 0.15s ease;
    }

    &__main {
      padding-top: 8px;
      text-align: center;
    }

    &__title {
      font-size: 14px;
      color: var(--su-text-color-regular);
      line-height: 1.5;
    }

    &__description {
      font-size: 12px;
      color: var(--su-text-color-placeholder);
      margin-top: 4px;
    }

    // 状态样式
    &.is-process .su-step__icon {
      border-color: var(--su-color-primary);
      color: var(--su-color-primary);
    }
    &.is-process .su-step__title {
      color: var(--su-text-color-primary);
      font-weight: 500;
    }

    &.is-finish .su-step__icon,
    &.is-success .su-step__icon {
      border-color: var(--su-color-success);
      color: var(--su-color-success);
    }
    &.is-finish .su-step__line,
    &.is-success .su-step__line {
      background-color: var(--su-color-success);
    }

    &.is-error .su-step__icon {
      border-color: var(--su-color-danger);
      color: var(--su-color-danger);
    }
    &.is-error .su-step__title {
      color: var(--su-color-danger);
    }
  }
</style>
