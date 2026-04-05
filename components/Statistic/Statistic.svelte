<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    value?: number | string
    precision?: number
    decimalSeparator?: string
    groupSeparator?: string
    title?: string
    prefix?: string | Snippet
    suffix?: string | Snippet
    class?: string
  }

  const ns = useNamespace('statistic')
  let {
    value = 0,
    precision,
    decimalSeparator = '.',
    groupSeparator = ',',
    title = '',
    prefix,
    suffix,
    class: className = '',
  }: Props = $props()

  let classes = $derived([ns.b(), className].filter(Boolean).join(' '))

  let displayValue = $derived(() => {
    let val = typeof value === 'number' ? value : parseFloat(value as string)
    if (isNaN(val)) return String(value)
    if (precision !== undefined) {
      val = parseFloat(val.toFixed(precision))
    }
    const parts = String(val).split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator)
    return parts.join(decimalSeparator)
  })
</script>

<div class={classes}>
  {#if title}
    <div class={ns.e('head')}>{title}</div>
  {/if}
  <div class={ns.e('content')}>
    {#if prefix}
      <span class={ns.e('prefix')}>
        {#if typeof prefix === 'string'}
          {prefix}
        {:else}
          {@render prefix()}
        {/if}
      </span>
    {/if}
    <span class={ns.e('value')}>{displayValue()}</span>
    {#if suffix}
      <span class={ns.e('suffix')}>
        {#if typeof suffix === 'string'}
          {suffix}
        {:else}
          {@render suffix()}
        {/if}
      </span>
    {/if}
  </div>
</div>

<style lang="scss">
  .su-statistic {
    &__head {
      font-size: var(--su-font-size-small);
      color: var(--su-text-color-secondary);
      margin-bottom: 4px;
    }

    &__content {
      display: flex;
      align-items: baseline;
      gap: 4px;
      color: var(--su-text-color-primary);
    }

    &__value {
      font-size: var(--su-font-size-extra-large);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }

    &__prefix,
    &__suffix {
      font-size: var(--su-font-size-base);
    }
  }
</style>
