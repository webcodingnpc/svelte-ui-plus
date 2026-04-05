<script lang="ts">
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'
  import Checkbox from '../Checkbox/Checkbox.svelte'

  interface TreeNode {
    key: string | number
    label: string
    children?: TreeNode[]
    disabled?: boolean
    isLeaf?: boolean
    [key: string]: any
  }

  interface Props {
    data?: TreeNode[]
    showCheckbox?: boolean
    defaultExpandAll?: boolean
    expandOnClickNode?: boolean
    checkOnClickNode?: boolean
    accordion?: boolean
    indent?: number
    highlightCurrent?: boolean
    emptyText?: string
    checkedKeys?: (string | number)[]
    expandedKeys?: (string | number)[]
    oncheck?: (node: TreeNode, checked: boolean) => void
    onnodeclick?: (node: TreeNode) => void
    onnodeexpand?: (node: TreeNode) => void
    class?: string
  }

  const ns = useNamespace('tree')
  let {
    data = [],
    showCheckbox = false,
    defaultExpandAll = false,
    expandOnClickNode = true,
    checkOnClickNode = false,
    accordion = false,
    indent = 18,
    highlightCurrent = false,
    emptyText = '暂无数据',
    checkedKeys = $bindable([]),
    expandedKeys = $bindable([]),
    oncheck,
    onnodeclick,
    onnodeexpand,
    class: className = '',
  }: Props = $props()

  let currentKey = $state<string | number | null>(null)

  let classes = $derived(
    [ns.b(), ns.is('highlight-current', highlightCurrent), className]
      .filter(Boolean)
      .join(' ')
  )

  // 初始化默认展开
  function initExpandedKeys(nodes: TreeNode[]): (string | number)[] {
    if (!defaultExpandAll) return expandedKeys
    const keys: (string | number)[] = []
    function collectKeys(items: TreeNode[]) {
      for (const node of items) {
        if (node.children && node.children.length > 0) {
          keys.push(node.key)
          collectKeys(node.children)
        }
      }
    }
    collectKeys(nodes)
    return keys
  }

  $effect(() => {
    if (defaultExpandAll && expandedKeys.length === 0) {
      expandedKeys = initExpandedKeys(data)
    }
  })

  function isExpanded(key: string | number): boolean {
    return expandedKeys.includes(key)
  }

  function isChecked(key: string | number): boolean {
    return checkedKeys.includes(key)
  }

  function toggleExpand(node: TreeNode) {
    if (isExpanded(node.key)) {
      expandedKeys = expandedKeys.filter((k) => k !== node.key)
    } else {
      if (accordion) {
        // 同层只展开一个
        const siblingKeys = data.map((n) => n.key)
        expandedKeys = expandedKeys.filter((k) => !siblingKeys.includes(k))
      }
      expandedKeys = [...expandedKeys, node.key]
    }
    onnodeexpand?.(node)
  }

  function toggleCheck(node: TreeNode) {
    if (node.disabled) return
    if (isChecked(node.key)) {
      checkedKeys = checkedKeys.filter((k) => k !== node.key)
    } else {
      checkedKeys = [...checkedKeys, node.key]
    }
    oncheck?.(node, isChecked(node.key))
  }

  function handleNodeClick(node: TreeNode) {
    currentKey = node.key
    onnodeclick?.(node)
    if (expandOnClickNode && node.children && node.children.length > 0) {
      toggleExpand(node)
    }
    if (checkOnClickNode && showCheckbox) {
      toggleCheck(node)
    }
  }
</script>

<div class={classes} role="tree">
  {#if data.length === 0}
    <div class={ns.e('empty')}>{emptyText}</div>
  {:else}
    {#snippet renderNode(nodes: TreeNode[], level: number)}
      {#each nodes as node}
        <div class={ns.e('node')} style="padding-left: {level * indent}px">
          <div
            class="{ns.e('node-content')} {currentKey === node.key ? 'is-current' : ''}"
            onclick={() => handleNodeClick(node)}
          >
            <span
              class="{ns.e('node-expand-icon')} {node.children && node.children.length > 0 ? '' : 'is-leaf'} {isExpanded(node.key) ? 'is-expanded' : ''}"
              onclick={(e) => { e.stopPropagation(); if (node.children && node.children.length > 0) toggleExpand(node) }}
            >
              {#if node.children && node.children.length > 0}
                <Icon name="arrow-right" size={12} />
              {/if}
            </span>
            {#if showCheckbox}
              <span onclick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={isChecked(node.key)}
                  disabled={node.disabled}
                  onchange={() => toggleCheck(node)}
                />
              </span>
            {/if}
            <span class={ns.e('node-label')}>{node.label}</span>
          </div>
          {#if node.children && node.children.length > 0 && isExpanded(node.key)}
            <div class={ns.e('node-children')}>
              {@render renderNode(node.children, level + 1)}
            </div>
          {/if}
        </div>
      {/each}
    {/snippet}

    {@render renderNode(data, 0)}
  {/if}
</div>

<style lang="scss">
  .su-tree {
    &__empty {
      text-align: center;
      padding: 20px;
      color: var(--su-text-color-secondary);
      font-size: var(--su-font-size-base);
    }

    &__node-content {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      cursor: pointer;
      border-radius: var(--su-border-radius-base);
      transition: background-color var(--su-transition-duration-fast);

      &:hover {
        background-color: var(--su-fill-color-light);
      }

      &.is-current {
        background-color: var(--su-color-primary-light-9);
      }
    }

    &__node-expand-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      cursor: pointer;
      transition: transform var(--su-transition-duration-fast);

      &.is-leaf {
        visibility: hidden;
      }

      &.is-expanded {
        transform: rotate(90deg);
      }
    }

    &__node-label {
      flex: 1;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__node-children {
      overflow: hidden;
    }

    &.is-highlight-current .su-tree__node-content.is-current {
      background-color: var(--su-color-primary-light-9);
    }
  }
</style>
