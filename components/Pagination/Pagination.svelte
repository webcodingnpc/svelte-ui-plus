<script lang="ts">
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    /** 总条数 */
    total?: number
    /** 每页条数 */
    pageSize?: number
    /** 当前页 */
    currentPage?: number
    /** 最多显示几个页码按钮 */
    pagerCount?: number
    /** 是否显示快捷跳转 */
    showJumper?: boolean
    /** 是否显示总条数 */
    showTotal?: boolean
    /** 页码变更事件 */
    onchange?: (page: number) => void
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('pagination')

  let {
    total = 0,
    pageSize = $bindable(10),
    currentPage = $bindable(1),
    pagerCount = 7,
    showJumper = false,
    showTotal = false,
    onchange,
    class: className = '',
  }: Props = $props()

  let totalPages = $derived(Math.max(1, Math.ceil(total / pageSize)))

  // 计算页码列表
  let pages = $derived(() => {
    const half = Math.floor(pagerCount / 2)
    let start = Math.max(2, currentPage - half)
    let end = Math.min(totalPages - 1, currentPage + half)

    if (currentPage - half < 2) {
      end = Math.min(totalPages - 1, pagerCount - 1)
    }
    if (currentPage + half > totalPages - 1) {
      start = Math.max(2, totalPages - pagerCount + 2)
    }

    const list: (number | string)[] = []
    if (totalPages <= 1) return list

    // 第一页
    list.push(1)

    if (start > 2) list.push('...')

    for (let i = start; i <= end; i++) {
      list.push(i)
    }

    if (end < totalPages - 1) list.push('...')

    // 最后一页
    if (totalPages > 1) list.push(totalPages)

    return list
  })

  function goTo(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return
    currentPage = page
    onchange?.(page)
  }

  let jumperValue = $state('')

  function handleJump() {
    const p = parseInt(jumperValue)
    if (!isNaN(p)) {
      goTo(Math.max(1, Math.min(totalPages, p)))
    }
    jumperValue = ''
  }
</script>

{#if total > 0}
  <div class="{ns.b()} {className}">
    {#if showTotal}
      <span class={ns.e('total')}>共 {total} 条</span>
    {/if}

    <button
      class="{ns.e('btn')} {ns.e('prev')}"
      disabled={currentPage <= 1}
      onclick={() => goTo(currentPage - 1)}
    >
      <Icon name="arrow-left" size={12} />
    </button>

    {#each pages() as page}
      {#if page === '...'}
        <span class={ns.e('ellipsis')}>···</span>
      {:else}
        <button
          class="{ns.e('btn')} {ns.e('number')} {currentPage === page ? 'is-active' : ''}"
          onclick={() => goTo(page as number)}
        >
          {page}
        </button>
      {/if}
    {/each}

    <button
      class="{ns.e('btn')} {ns.e('next')}"
      disabled={currentPage >= totalPages}
      onclick={() => goTo(currentPage + 1)}
    >
      <Icon name="arrow-right" size={12} />
    </button>

    {#if showJumper}
      <span class={ns.e('jumper')}>
        前往
        <input
          type="number"
          min="1"
          max={totalPages}
          bind:value={jumperValue}
          onkeydown={(e) => e.key === 'Enter' && handleJump()}
        />
        页
      </span>
    {/if}
  </div>
{/if}

<style lang="scss">
  .su-pagination {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: var(--su-font-size-base);
    color: var(--su-text-color-regular);
    flex-wrap: wrap;

    &__total {
      margin-right: 8px;
      color: var(--su-text-color-secondary);
    }

    &__btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      height: 32px;
      padding: 0 6px;
      border: none;
      border-radius: var(--su-border-radius-base);
      background: transparent;
      color: var(--su-text-color-regular);
      font-size: var(--su-font-size-base);
      cursor: pointer;
      transition: all var(--su-transition-duration-fast);

      &:hover {
        color: var(--su-color-primary);
      }

      &:disabled {
        color: var(--su-text-color-disabled);
        cursor: not-allowed;
      }
    }

    &__number {
      font-weight: 400;

      &.is-active {
        color: var(--su-color-primary);
        font-weight: 700;
        background: var(--su-color-primary-light-9);
      }
    }

    &__ellipsis {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      height: 32px;
      color: var(--su-text-color-placeholder);
      letter-spacing: 2px;
    }

    &__jumper {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-left: 8px;
      color: var(--su-text-color-secondary);

      input {
        width: 50px;
        height: 28px;
        padding: 0 8px;
        border: 1px solid var(--su-border-color);
        border-radius: var(--su-border-radius-base);
        text-align: center;
        font-size: var(--su-font-size-base);
        outline: none;

        &:focus {
          border-color: var(--su-color-primary);
        }

        // 隐藏数字输入框的上下箭头
        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
        -moz-appearance: textfield;
      }
    }
  }
</style>
