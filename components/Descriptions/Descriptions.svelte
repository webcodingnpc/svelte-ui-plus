<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    title?: string
    column?: number
    direction?: 'horizontal' | 'vertical'
    size?: ComponentSize
    border?: boolean
    extra?: Snippet
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('descriptions')
  let {
    title = '',
    column = 3,
    direction = 'horizontal',
    size = 'default',
    border = false,
    extra,
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.m(size !== 'default' ? size : undefined), ns.is('bordered', border), ns.m(direction), className]
      .filter(Boolean)
      .join(' ')
  )
</script>

<div class={classes} style="--su-descriptions-column: {column}">
  {#if title || extra}
    <div class={ns.e('header')}>
      <div class={ns.e('title')}>{title}</div>
      {#if extra}
        <div class={ns.e('extra')}>{@render extra()}</div>
      {/if}
    </div>
  {/if}
  <div class={ns.e('body')}>
    {#if children}{@render children()}{/if}
  </div>
</div>

<style lang="scss">
  .su-descriptions {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    &__title {
      font-size: var(--su-font-size-medium);
      font-weight: 700;
      color: var(--su-text-color-primary);
    }

    &__body {
      display: grid;
      grid-template-columns: repeat(var(--su-descriptions-column), 1fr);
      gap: 0;
    }

    &.is-bordered &__body {
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
    }
  }
</style>
