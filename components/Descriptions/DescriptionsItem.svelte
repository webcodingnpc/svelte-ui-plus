<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    label?: string
    span?: number
    labelAlign?: 'left' | 'center' | 'right'
    contentAlign?: 'left' | 'center' | 'right'
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('descriptions-item')
  let {
    label = '',
    span = 1,
    labelAlign = 'left',
    contentAlign = 'left',
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived([ns.b(), className].filter(Boolean).join(' '))
</script>

<div class={classes} style="grid-column: span {span}">
  <div class={ns.e('label')} style="text-align: {labelAlign}">{label}</div>
  <div class={ns.e('content')} style="text-align: {contentAlign}">
    {#if children}{@render children()}{/if}
  </div>
</div>

<style lang="scss">
  .su-descriptions-item {
    display: flex;
    padding: 12px 16px;

    &__label {
      color: var(--su-text-color-secondary);
      font-size: var(--su-font-size-base);
      flex-shrink: 0;
      min-width: 80px;
      margin-right: 16px;

      &::after {
        content: ':';
      }
    }

    &__content {
      flex: 1;
      color: var(--su-text-color-primary);
      font-size: var(--su-font-size-base);
      word-break: break-word;
    }

    // 有边框时样式
    :global(.su-descriptions.is-bordered) & {
      border-bottom: 1px solid var(--su-border-color-lighter);
      border-right: 1px solid var(--su-border-color-lighter);

      &:last-child {
        border-right: none;
      }
    }
  }
</style>
