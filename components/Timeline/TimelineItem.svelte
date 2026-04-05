<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    timestamp?: string
    hideTimestamp?: boolean
    center?: boolean
    placement?: 'top' | 'bottom'
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
    color?: string
    size?: 'normal' | 'large'
    hollow?: boolean
    dot?: Snippet
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('timeline-item')
  let {
    timestamp = '',
    hideTimestamp = false,
    center = false,
    placement = 'bottom',
    type = 'primary',
    color = '',
    size = 'normal',
    hollow = false,
    dot,
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.is('center', center), className]
      .filter(Boolean)
      .join(' ')
  )

  let dotColor = $derived(color || `var(--su-color-${type})`)
</script>

<li class={classes}>
  <div class={ns.e('tail')}></div>
  <div class={ns.e('node')}>
    {#if dot}
      <div class={ns.e('dot-custom')}>
        {@render dot()}
      </div>
    {:else}
      <div
        class="{ns.e('dot')} {size === 'large' ? 'is-large' : ''} {hollow ? 'is-hollow' : ''}"
        style="background-color: {hollow ? 'transparent' : dotColor}; border-color: {dotColor};"
      ></div>
    {/if}
  </div>
  <div class={ns.e('wrapper')}>
    {#if !hideTimestamp && placement === 'top'}
      <div class={ns.e('timestamp')}>{timestamp}</div>
    {/if}
    <div class={ns.e('content')}>
      {#if children}{@render children()}{/if}
    </div>
    {#if !hideTimestamp && placement === 'bottom'}
      <div class={ns.e('timestamp')}>{timestamp}</div>
    {/if}
  </div>
</li>

<style lang="scss">
  .su-timeline-item {
    position: relative;
    padding-bottom: 20px;
    padding-left: 28px;

    &:last-child {
      .su-timeline-item__tail {
        display: none;
      }
    }

    &__tail {
      position: absolute;
      left: 5px;
      top: 12px;
      bottom: 0;
      width: 2px;
      background: var(--su-border-color-light);
    }

    &__node {
      position: absolute;
      left: 0;
      top: 2px;
    }

    &__dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid transparent;
      box-sizing: border-box;

      &.is-large {
        width: 16px;
        height: 16px;
      }

      &.is-hollow {
        background: transparent !important;
        border-width: 2px;
        border-style: solid;
      }
    }

    &__dot-custom {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__wrapper {
      padding-top: 0;
    }

    &__content {
      color: var(--su-text-color-primary);
      line-height: 1.5;
    }

    &__timestamp {
      color: var(--su-text-color-secondary);
      font-size: var(--su-font-size-small);
      line-height: 1.5;
      margin: 4px 0;
    }

    &.is-center {
      padding-left: 0;
      text-align: center;
    }
  }
</style>
