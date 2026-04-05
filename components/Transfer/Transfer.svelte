<script lang="ts">
  import { useNamespace } from '../../utils/bem'
  import Checkbox from '../Checkbox/Checkbox.svelte'
  import Icon from '../Icon/Icon.svelte'

  interface TransferItem {
    key: string | number
    label: string
    disabled?: boolean
  }

  interface Props {
    data?: TransferItem[]
    value?: (string | number)[]
    filterable?: boolean
    filterPlaceholder?: string
    titles?: [string, string]
    buttonTexts?: [string, string]
    onchange?: (val: (string | number)[], direction: 'left' | 'right', movedKeys: (string | number)[]) => void
    class?: string
  }

  const ns = useNamespace('transfer')
  let {
    data = [],
    value = $bindable([]),
    filterable = false,
    filterPlaceholder = '请输入搜索内容',
    titles = ['列表 1', '列表 2'],
    buttonTexts = ['', ''],
    onchange,
    class: className = '',
  }: Props = $props()

  let leftChecked = $state<(string | number)[]>([])
  let rightChecked = $state<(string | number)[]>([])
  let leftFilter = $state('')
  let rightFilter = $state('')

  let leftData = $derived(
    data.filter((item) => !value.includes(item.key))
      .filter((item) => !leftFilter || item.label.includes(leftFilter))
  )

  let rightData = $derived(
    data.filter((item) => value.includes(item.key))
      .filter((item) => !rightFilter || item.label.includes(rightFilter))
  )

  let classes = $derived([ns.b(), className].filter(Boolean).join(' '))

  function moveToRight() {
    const moved = leftChecked.filter((k) => !value.includes(k))
    value = [...value, ...moved]
    onchange?.(value, 'right', moved)
    leftChecked = []
  }

  function moveToLeft() {
    const moved = [...rightChecked]
    value = value.filter((k) => !rightChecked.includes(k))
    onchange?.(value, 'left', moved)
    rightChecked = []
  }

  function toggleLeftCheck(key: string | number) {
    if (leftChecked.includes(key)) {
      leftChecked = leftChecked.filter((k) => k !== key)
    } else {
      leftChecked = [...leftChecked, key]
    }
  }

  function toggleRightCheck(key: string | number) {
    if (rightChecked.includes(key)) {
      rightChecked = rightChecked.filter((k) => k !== key)
    } else {
      rightChecked = [...rightChecked, key]
    }
  }
</script>

<div class={classes}>
  <div class={ns.e('panel')}>
    <div class={ns.e('panel-header')}>
      <span>{titles[0]}</span>
      <span class={ns.e('panel-header-count')}>{leftChecked.length}/{leftData.length}</span>
    </div>
    {#if filterable}
      <div class={ns.e('filter')}>
        <input type="text" bind:value={leftFilter} placeholder={filterPlaceholder} />
      </div>
    {/if}
    <div class={ns.e('panel-body')}>
      {#each leftData as item}
        <label class="{ns.e('panel-item')} {item.disabled ? 'is-disabled' : ''}">
          <Checkbox
            checked={leftChecked.includes(item.key)}
            disabled={item.disabled}
            onchange={() => toggleLeftCheck(item.key)}
          />
          <span class={ns.e('panel-item-label')}>{item.label}</span>
        </label>
      {/each}
      {#if leftData.length === 0}
        <p class={ns.e('empty')}>无数据</p>
      {/if}
    </div>
  </div>

  <div class={ns.e('buttons')}>
    <button
      class={ns.e('button')}
      disabled={leftChecked.length === 0}
      onclick={moveToRight}
      type="button"
    >
      <Icon name="arrow-right" size={12} />
      {#if buttonTexts[1]}<span>{buttonTexts[1]}</span>{/if}
    </button>
    <button
      class={ns.e('button')}
      disabled={rightChecked.length === 0}
      onclick={moveToLeft}
      type="button"
    >
      <Icon name="arrow-left" size={12} />
      {#if buttonTexts[0]}<span>{buttonTexts[0]}</span>{/if}
    </button>
  </div>

  <div class={ns.e('panel')}>
    <div class={ns.e('panel-header')}>
      <span>{titles[1]}</span>
      <span class={ns.e('panel-header-count')}>{rightChecked.length}/{rightData.length}</span>
    </div>
    {#if filterable}
      <div class={ns.e('filter')}>
        <input type="text" bind:value={rightFilter} placeholder={filterPlaceholder} />
      </div>
    {/if}
    <div class={ns.e('panel-body')}>
      {#each rightData as item}
        <label class="{ns.e('panel-item')} {item.disabled ? 'is-disabled' : ''}">
          <Checkbox
            checked={rightChecked.includes(item.key)}
            disabled={item.disabled}
            onchange={() => toggleRightCheck(item.key)}
          />
          <span class={ns.e('panel-item-label')}>{item.label}</span>
        </label>
      {/each}
      {#if rightData.length === 0}
        <p class={ns.e('empty')}>无数据</p>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .su-transfer {
    display: flex;
    align-items: center;
    gap: 8px;

    &__panel {
      width: 200px;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      overflow: hidden;
    }

    &__panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: var(--su-fill-color-light);
      border-bottom: 1px solid var(--su-border-color-lighter);
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
    }

    &__panel-header-count {
      font-size: var(--su-font-size-small);
      color: var(--su-text-color-secondary);
    }

    &__filter {
      padding: 8px 12px;

      input {
        width: 100%;
        height: 28px;
        padding: 0 8px;
        border: 1px solid var(--su-border-color);
        border-radius: var(--su-border-radius-small);
        font-size: var(--su-font-size-small);
        outline: none;
        box-sizing: border-box;

        &:focus {
          border-color: var(--su-color-primary);
        }
      }
    }

    &__panel-body {
      height: 200px;
      overflow-y: auto;
      padding: 4px 0;
    }

    &__panel-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 12px;
      cursor: pointer;
      transition: background-color var(--su-transition-duration-fast);

      &:hover {
        background-color: var(--su-fill-color-light);
      }

      &.is-disabled {
        color: var(--su-text-color-disabled);
        cursor: not-allowed;
      }
    }

    &__panel-item-label {
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__empty {
      text-align: center;
      color: var(--su-text-color-secondary);
      font-size: var(--su-font-size-small);
      padding: 20px 0;
      margin: 0;
    }

    &__buttons {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 6px 12px;
      background: var(--su-color-primary);
      color: #fff;
      border: none;
      border-radius: var(--su-border-radius-base);
      cursor: pointer;
      font-size: var(--su-font-size-small);
      transition: all var(--su-transition-duration-fast);

      &:hover:not(:disabled) {
        background: var(--su-color-primary-light-3);
      }

      &:disabled {
        background: var(--su-color-primary-light-5);
        cursor: not-allowed;
      }
    }
  }
</style>
