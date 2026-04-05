<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface TreeNode {
    key: string
    label: string
    children?: TreeNode[]
    disabled?: boolean
    [key: string]: any
  }

  interface Props {
    /** 选中值 */
    value?: string | string[]
    /** 树数据 */
    data?: TreeNode[]
    /** 是否多选 */
    multiple?: boolean
    /** 占位文本 */
    placeholder?: string
    /** 是否禁用 */
    disabled?: boolean
    /** 是否可清空 */
    clearable?: boolean
    /** 是否可搜索 */
    filterable?: boolean
    /** 值变化事件 */
    onchange?: (value: string | string[]) => void
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('tree-select')

  let {
    value = $bindable(''),
    data = [],
    multiple = false,
    placeholder = '请选择',
    disabled = false,
    clearable = false,
    filterable = false,
    onchange,
    class: className = '',
  }: Props = $props()

  let visible = $state(false)
  let filterText = $state('')
  let rootRef: HTMLElement | undefined = $state()

  let selectedLabel = $derived(() => {
    if (multiple && Array.isArray(value)) {
      return value.map((v) => findLabel(data, v)).filter(Boolean).join(', ')
    }
    return findLabel(data, value as string) || ''
  })

  function findLabel(nodes: TreeNode[], key: string): string {
    for (const node of nodes) {
      if (node.key === key) return node.label
      if (node.children) {
        const found = findLabel(node.children, key)
        if (found) return found
      }
    }
    return ''
  }

  function filterNodes(nodes: TreeNode[], text: string): TreeNode[] {
    if (!text) return nodes
    return nodes.reduce<TreeNode[]>((acc, node) => {
      const matchSelf = node.label.toLowerCase().includes(text.toLowerCase())
      const filteredChildren = node.children ? filterNodes(node.children, text) : []
      if (matchSelf || filteredChildren.length > 0) {
        acc.push({ ...node, children: filteredChildren.length > 0 ? filteredChildren : node.children })
      }
      return acc
    }, [])
  }

  let filteredData = $derived(filterable ? filterNodes(data, filterText) : data)

  function handleSelect(key: string) {
    if (multiple) {
      const arr = Array.isArray(value) ? value : []
      const idx = arr.indexOf(key)
      value = idx > -1 ? arr.filter((v) => v !== key) : [...arr, key]
    } else {
      value = key
      visible = false
    }
    onchange?.(value)
  }

  function handleClear(e: Event) {
    e.stopPropagation()
    value = multiple ? [] : ''
    onchange?.(value)
  }

  function handleClickOutside(e: MouseEvent) {
    if (rootRef && !rootRef.contains(e.target as Node)) {
      visible = false
    }
  }

  $effect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  })

  function isSelected(key: string): boolean {
    if (multiple && Array.isArray(value)) return value.includes(key)
    return value === key
  }
</script>

<div class="{ns.b()} {className}" class:is-disabled={disabled} bind:this={rootRef}>
  <div class={ns.e('trigger')} onclick={() => !disabled && (visible = !visible)}>
    <span class={ns.e('value')} class:is-placeholder={!selectedLabel()}>
      {selectedLabel() || placeholder}
    </span>
    {#if clearable && selectedLabel()}
      <span class={ns.e('clear')} onclick={handleClear}>×</span>
    {/if}
    <svg class={ns.e('arrow')} class:is-open={visible} viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor">
      <path d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 533.376a30.592 30.592 0 0 0 0-42.752L382.592 149.312a29.12 29.12 0 0 0-41.728 0z" />
    </svg>
  </div>
  {#if visible}
    <div class={ns.e('dropdown')}>
      {#if filterable}
        <div class={ns.e('filter')}>
          <input
            bind:value={filterText}
            placeholder="搜索..."
            class={ns.e('filter-input')}
          />
        </div>
      {/if}
      <div class={ns.e('tree')}>
        {#each filteredData as node (node.key)}
          {@render renderNode(node, 0)}
        {/each}
      </div>
    </div>
  {/if}
</div>

{#snippet renderNode(node: TreeNode, level: number)}
  <div
    class="{ns.e('node')} {isSelected(node.key) ? 'is-selected' : ''} {node.disabled ? 'is-disabled' : ''}"
    style="padding-left:{level * 20 + 12}px"
    onclick={() => !node.disabled && handleSelect(node.key)}
  >
    {node.label}
  </div>
  {#if node.children}
    {#each node.children as child (child.key)}
      {@render renderNode(child, level + 1)}
    {/each}
  {/if}
{/snippet}

<style lang="scss">
  .su-tree-select {
    position: relative;
    display: inline-block;
    width: 240px;

    &.is-disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &__trigger {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      cursor: pointer;
      background-color: var(--su-bg-color);
      transition: border-color 0.15s ease;

      &:hover {
        border-color: var(--su-color-primary);
      }
    }

    &__value {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      color: var(--su-text-color-primary);

      &.is-placeholder {
        color: var(--su-text-color-placeholder);
      }
    }

    &__clear {
      cursor: pointer;
      color: var(--su-text-color-placeholder);
      font-size: 14px;

      &:hover {
        color: var(--su-text-color-primary);
      }
    }

    &__arrow {
      transition: transform 0.2s ease;
      flex-shrink: 0;
      color: var(--su-text-color-placeholder);

      &.is-open {
        transform: rotate(90deg);
      }
    }

    &__dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      width: 100%;
      z-index: 2000;
      background-color: var(--su-bg-color);
      border: 1px solid var(--su-border-color-lighter);
      border-radius: var(--su-border-radius-base);
      box-shadow: var(--su-box-shadow-light);
      max-height: 260px;
      overflow-y: auto;
    }

    &__filter {
      padding: 8px;
      border-bottom: 1px solid var(--su-border-color-lighter);
    }

    &__filter-input {
      width: 100%;
      padding: 4px 8px;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      font-size: 13px;
      outline: none;

      &:focus {
        border-color: var(--su-color-primary);
      }
    }

    &__node {
      padding: 8px 12px;
      font-size: 14px;
      color: var(--su-text-color-primary);
      cursor: pointer;
      transition: background-color 0.15s ease;

      &:hover {
        background-color: var(--su-fill-color-light);
      }

      &.is-selected {
        color: var(--su-color-primary);
        font-weight: 500;
      }

      &.is-disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
</style>
