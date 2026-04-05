<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 是否加载中 */
    loading?: boolean
    /** 行数 */
    rows?: number
    /** 是否使用动画 */
    animated?: boolean
    /** 是否显示头像占位 */
    avatar?: boolean
    /** 子内容（loading=false 时显示） */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('skeleton')

  let {
    loading = true,
    rows = 3,
    animated = true,
    avatar = false,
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [ns.b(), ns.is('animated', animated), className]
      .filter(Boolean)
      .join(' '),
  )

  let rowsArr = $derived(Array.from({ length: rows }, (_, i) => i))
</script>

{#if loading}
  <div class={classes}>
    {#if avatar}
      <div class={ns.e('avatar')}></div>
    {/if}
    <div class={ns.e('content')}>
      <div class="{ns.e('item')} {ns.e('title')}"></div>
      {#each rowsArr as _, i}
        <div
          class={ns.e('item')}
          style="width: {i === rows - 1 ? '60%' : '100%'}"
        ></div>
      {/each}
    </div>
  </div>
{:else}
  {@render children?.()}
{/if}

<style lang="scss">
  .su-skeleton {
    display: flex;
    gap: 16px;

    &__avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--su-fill-color);
      flex-shrink: 0;
    }

    &__content {
      flex: 1;
    }

    &__item {
      height: 16px;
      margin-bottom: 12px;
      border-radius: var(--su-border-radius-base);
      background: var(--su-fill-color);

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__title {
      width: 40%;
      height: 20px;
      margin-bottom: 16px;
    }

    &.is-animated .su-skeleton__item,
    &.is-animated .su-skeleton__avatar {
      animation: su-skeleton-loading 1.4s ease infinite;
      background: linear-gradient(
        90deg,
        var(--su-fill-color) 25%,
        var(--su-fill-color-lighter) 37%,
        var(--su-fill-color) 63%
      );
      background-size: 400% 100%;
    }
  }

  @keyframes su-skeleton-loading {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
</style>
