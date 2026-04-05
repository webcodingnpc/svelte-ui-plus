<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 标题 */
    title?: string
    /** 副标题 */
    content?: string
    /** 图标 */
    icon?: Snippet
    /** 额外内容 */
    extra?: Snippet
    /** 默认内容 */
    children?: Snippet
    /** 返回事件 */
    onback?: () => void
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('page-header')

  let {
    title = '',
    content = '',
    icon,
    extra,
    children,
    onback,
    class: className = '',
  }: Props = $props()
</script>

<div class="{ns.b()} {className}">
  <div class={ns.e('header')}>
    <div class={ns.e('left')}>
      <div class={ns.e('back')} onclick={onback}>
        {#if icon}
          {@render icon()}
        {:else}
          <svg viewBox="0 0 1024 1024" width="16" height="16" fill="currentColor">
            <path d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z" />
          </svg>
        {/if}
      </div>
      {#if title}
        <div class={ns.e('title')}>{title}</div>
      {/if}
      {#if content}
        <div class={ns.e('content')}>{content}</div>
      {/if}
    </div>
    {#if extra}
      <div class={ns.e('extra')}>
        {@render extra()}
      </div>
    {/if}
  </div>
  {#if children}
    <div class={ns.e('body')}>
      {@render children()}
    </div>
  {/if}
</div>

<style lang="scss">
  .su-page-header {
    padding: 16px 20px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &__back {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      color: var(--su-text-color-primary);
      transition: color 0.15s ease;

      &:hover {
        color: var(--su-color-primary);
      }
    }

    &__title {
      font-size: 18px;
      font-weight: 600;
      color: var(--su-text-color-primary);
    }

    &__content {
      font-size: 14px;
      color: var(--su-text-color-regular);
    }

    &__body {
      margin-top: 16px;
    }
  }
</style>
