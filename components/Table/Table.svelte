<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import Empty from '../Empty/Empty.svelte'

  interface TableColumn {
    /** 字段 key */
    key: string
    /** 列标题 */
    title: string
    /** 列宽 */
    width?: string
    /** 对齐方式 */
    align?: 'left' | 'center' | 'right'
    /** 是否固定 */
    fixed?: boolean
    /** 是否可排序 */
    sortable?: boolean
  }

  interface Props {
    /** 数据源 */
    data?: Record<string, any>[]
    /** 列配置 */
    columns?: TableColumn[]
    /** 是否带斑马纹 */
    stripe?: boolean
    /** 是否带边框 */
    border?: boolean
    /** 是否高亮当前行 */
    highlightCurrentRow?: boolean
    /** 空数据文案 */
    emptyText?: string
    /** 行点击事件 */
    onrowclick?: (row: Record<string, any>, index: number) => void
    /** 自定义单元格渲染 */
    cell?: Snippet<[{ row: Record<string, any>; column: TableColumn; index: number }]>
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('table')

  let {
    data = [],
    columns = [],
    stripe = false,
    border = false,
    highlightCurrentRow = false,
    emptyText = '暂无数据',
    onrowclick,
    cell,
    class: className = '',
  }: Props = $props()

  let currentRow = $state(-1)

  let classes = $derived(
    [
      ns.b(),
      ns.is('stripe', stripe),
      ns.is('border', border),
      ns.is('highlight-current-row', highlightCurrentRow),
      className,
    ]
      .filter(Boolean)
      .join(' '),
  )

  function handleRowClick(row: Record<string, any>, index: number) {
    currentRow = index
    onrowclick?.(row, index)
  }
</script>

<div class={classes}>
  <table class={ns.e('inner')}>
    <thead class={ns.e('header')}>
      <tr>
        {#each columns as col}
          <th
            class={ns.e('cell')}
            style="{col.width ? `width: ${col.width}` : ''}; text-align: {col.align || 'left'}"
          >
            {col.title}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class={ns.e('body')}>
      {#if data.length === 0}
        <tr>
          <td class={ns.e('empty')} colspan={columns.length}>
            <Empty description={emptyText} imageSize={100} />
          </td>
        </tr>
      {:else}
        {#each data as row, index}
          <tr
            class="{ns.e('row')} {currentRow === index ? 'is-current' : ''}"
            onclick={() => handleRowClick(row, index)}
          >
            {#each columns as col}
              <td
                class={ns.e('cell')}
                style="text-align: {col.align || 'left'}"
              >
                {#if cell}
                  {@render cell({ row, column: col, index })}
                {:else}
                  {row[col.key] ?? ''}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<style lang="scss">
  .su-table {
    width: 100%;
    overflow-x: auto;

    &__inner {
      width: 100%;
      border-collapse: collapse;
      table-layout: auto;
    }

    &__header {
      th {
        padding: 12px 16px;
        font-size: var(--su-font-size-base);
        font-weight: 600;
        color: var(--su-text-color-primary);
        background: var(--su-fill-color-light);
        border-bottom: 1px solid var(--su-border-color-lighter);
        white-space: nowrap;
      }
    }

    &__body {
      td {
        padding: 12px 16px;
        font-size: var(--su-font-size-base);
        color: var(--su-text-color-regular);
        border-bottom: 1px solid var(--su-border-color-lighter);
      }
    }

    &__row {
      transition: background var(--su-transition-duration-fast);

      &:hover {
        background: var(--su-fill-color-light);
      }

      &.is-current {
        background: var(--su-color-primary-light-9);
      }
    }

    &__empty {
      text-align: center;
      padding: 32px 16px;
    }

    // 斑马纹
    &.is-stripe .su-table__row:nth-child(even) {
      background: var(--su-fill-color-lighter);
    }

    // 边框
    &.is-border {
      border: 1px solid var(--su-border-color-lighter);
      border-radius: var(--su-border-radius-base);
      overflow: hidden;

      th,
      td {
        border-right: 1px solid var(--su-border-color-lighter);

        &:last-child {
          border-right: none;
        }
      }
    }
  }
</style>
