<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    span?: number
    offset?: number
    push?: number
    pull?: number
    tag?: string
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('col')
  let {
    span = 24,
    offset = 0,
    push = 0,
    pull = 0,
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [
      ns.b(),
      ns.m(String(span)),
      offset > 0 ? ns.m('offset-' + offset) : '',
      push > 0 ? ns.m('push-' + push) : '',
      pull > 0 ? ns.m('pull-' + pull) : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')
  )
</script>

<div class={classes}>
  {#if children}{@render children()}{/if}
</div>

<style lang="scss">
  .su-col {
    box-sizing: border-box;
    position: relative;

    @for $i from 0 through 24 {
      &--#{$i} {
        max-width: calc(100% * #{$i} / 24);
        flex: 0 0 calc(100% * #{$i} / 24);
      }

      &--offset-#{$i} {
        margin-left: calc(100% * #{$i} / 24);
      }

      &--push-#{$i} {
        left: calc(100% * #{$i} / 24);
      }

      &--pull-#{$i} {
        right: calc(100% * #{$i} / 24);
      }
    }

    // span 0 = hidden
    &--0 {
      display: none;
    }
  }
</style>
