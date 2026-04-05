<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    title?: string
    subTitle?: string
    icon?: 'success' | 'warning' | 'info' | 'error' | '404' | '403' | '500'
    extra?: Snippet
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('result')
  let {
    title = '',
    subTitle = '',
    icon = 'info',
    extra,
    children,
    class: className = '',
  }: Props = $props()

  const iconMap: Record<string, { name: string; color: string }> = {
    success: { name: 'circle-check', color: 'var(--su-color-success)' },
    warning: { name: 'warning', color: 'var(--su-color-warning)' },
    info: { name: 'info', color: 'var(--su-color-primary)' },
    error: { name: 'circle-close', color: 'var(--su-color-danger)' },
    '404': { name: 'warning', color: 'var(--su-color-info)' },
    '403': { name: 'warning', color: 'var(--su-color-danger)' },
    '500': { name: 'warning', color: 'var(--su-color-danger)' },
  }

  let classes = $derived([ns.b(), ns.m(icon), className].filter(Boolean).join(' '))
  let iconConfig = $derived(iconMap[icon] || iconMap.info)
</script>

<div class={classes}>
  <div class={ns.e('icon')}>
    {#if icon === '404' || icon === '403' || icon === '500'}
      <span class={ns.e('status-code')} style="color: {iconConfig.color}">{icon}</span>
    {:else}
      <Icon name={iconConfig.name} size={72} color={iconConfig.color} />
    {/if}
  </div>
  {#if title}
    <div class={ns.e('title')}>{title}</div>
  {/if}
  {#if subTitle}
    <div class={ns.e('subtitle')}>{subTitle}</div>
  {/if}
  {#if extra}
    <div class={ns.e('extra')}>
      {@render extra()}
    </div>
  {/if}
  {#if children}
    <div class={ns.e('content')}>
      {@render children()}
    </div>
  {/if}
</div>

<style lang="scss">
  .su-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    text-align: center;

    &__icon {
      margin-bottom: 16px;
    }

    &__status-code {
      font-size: 72px;
      font-weight: 900;
      line-height: 1;
    }

    &__title {
      font-size: var(--su-font-size-extra-large);
      font-weight: 500;
      color: var(--su-text-color-primary);
      margin-bottom: 8px;
    }

    &__subtitle {
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-secondary);
      margin-bottom: 20px;
    }

    &__extra {
      margin-bottom: 20px;
    }

    &__content {
      width: 100%;
      margin-top: 20px;
      padding: 24px 40px;
      background: var(--su-fill-color-light);
      border-radius: var(--su-border-radius-base);
    }
  }
</style>
