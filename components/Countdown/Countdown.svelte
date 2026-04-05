<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { onMount, onDestroy } from 'svelte'

  interface Props {
    value: number
    format?: string
    title?: string
    prefix?: string | Snippet
    suffix?: string | Snippet
    onfinish?: () => void
    class?: string
  }

  const ns = useNamespace('countdown')
  let {
    value,
    format = 'HH:mm:ss',
    title = '',
    prefix,
    suffix,
    onfinish,
    class: className = '',
  }: Props = $props()

  let remaining = $state(0)
  let timer: ReturnType<typeof setInterval> | null = null

  let classes = $derived([ns.b(), className].filter(Boolean).join(' '))

  function updateRemaining() {
    remaining = Math.max(0, value - Date.now())
    if (remaining <= 0) {
      if (timer) clearInterval(timer)
      onfinish?.()
    }
  }

  let displayValue = $derived(() => {
    const total = Math.floor(remaining / 1000)
    const days = Math.floor(total / 86400)
    const hours = Math.floor((total % 86400) / 3600)
    const minutes = Math.floor((total % 3600) / 60)
    const seconds = total % 60

    let result = format
    result = result.replace('DD', String(days).padStart(2, '0'))
    result = result.replace('D', String(days))
    result = result.replace('HH', String(hours).padStart(2, '0'))
    result = result.replace('H', String(hours))
    result = result.replace('mm', String(minutes).padStart(2, '0'))
    result = result.replace('m', String(minutes))
    result = result.replace('ss', String(seconds).padStart(2, '0'))
    result = result.replace('s', String(seconds))
    return result
  })

  onMount(() => {
    updateRemaining()
    timer = setInterval(updateRemaining, 1000)
  })

  onDestroy(() => {
    if (timer) clearInterval(timer)
  })
</script>

<div class={classes}>
  {#if title}
    <div class={ns.e('title')}>{title}</div>
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
  .su-countdown {
    &__title {
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
  }
</style>
