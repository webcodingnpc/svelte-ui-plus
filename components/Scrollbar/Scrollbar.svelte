<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    height?: string
    maxHeight?: string
    native?: boolean
    wrapClass?: string
    viewClass?: string
    always?: boolean
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('scrollbar')
  let {
    height = '',
    maxHeight = '',
    native = false,
    wrapClass = '',
    viewClass = '',
    always = false,
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived([ns.b(), className].filter(Boolean).join(' '))
  let wrapClasses = $derived([ns.e('wrap'), native ? '' : ns.e('wrap--hidden-default'), wrapClass].filter(Boolean).join(' '))
  let viewClasses = $derived([ns.e('view'), viewClass].filter(Boolean).join(' '))

  let wrapStyle = $derived(
    [height ? `height: ${height}` : '', maxHeight ? `max-height: ${maxHeight}` : ''].filter(Boolean).join('; ')
  )
</script>

<div class={classes}>
  <div class={wrapClasses} style={wrapStyle}>
    <div class={viewClasses}>
      {#if children}{@render children()}{/if}
    </div>
  </div>
</div>

<style lang="scss">
  .su-scrollbar {
    overflow: hidden;
    position: relative;

    &__wrap {
      overflow: auto;
      height: 100%;

      &--hidden-default {
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;

        &:hover {
          scrollbar-color: var(--su-text-color-disabled) transparent;
        }

        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 3px;
          transition: background-color 0.3s;
        }

        &:hover::-webkit-scrollbar-thumb {
          background-color: var(--su-text-color-disabled);
        }

        &::-webkit-scrollbar-track {
          background: transparent;
        }
      }
    }

    &__view {
      min-height: 100%;
    }
  }
</style>
