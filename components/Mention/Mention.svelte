<script lang="ts">
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'

  interface MentionOption {
    value: string
    label?: string
  }

  interface Props {
    value?: string
    size?: ComponentSize
    placeholder?: string
    disabled?: boolean
    prefix?: string
    options?: MentionOption[]
    loading?: boolean
    oninput?: (val: string) => void
    onchange?: (val: string) => void
    onsearch?: (pattern: string, prefix: string) => void
    onselect?: (option: MentionOption, prefix: string) => void
    class?: string
  }

  const ns = useNamespace('mention')
  let {
    value = $bindable(''),
    size = 'default',
    placeholder = '',
    disabled = false,
    prefix = '@',
    options = [],
    loading = false,
    oninput,
    onchange,
    onsearch,
    onselect,
    class: className = '',
  }: Props = $props()

  let showDropdown = $state(false)
  let searchText = $state('')
  let cursorPosition = $state(0)
  let filteredOptions = $state<MentionOption[]>([])
  let highlightIndex = $state(0)

  let classes = $derived(
    [ns.b(), ns.m(size !== 'default' ? size : undefined), ns.is('disabled', disabled), className]
      .filter(Boolean)
      .join(' ')
  )

  $effect(() => {
    filteredOptions = options.filter(
      (o) => !searchText || (o.label || o.value).toLowerCase().includes(searchText.toLowerCase())
    )
  })

  function handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement
    value = target.value
    cursorPosition = target.selectionStart || 0
    oninput?.(value)

    // 检测 @ 触发
    const textBefore = value.slice(0, cursorPosition)
    const lastPrefixIndex = textBefore.lastIndexOf(prefix)
    if (lastPrefixIndex >= 0) {
      const query = textBefore.slice(lastPrefixIndex + prefix.length)
      if (!query.includes(' ') && !query.includes('\n')) {
        searchText = query
        showDropdown = true
        highlightIndex = 0
        onsearch?.(query, prefix)
        return
      }
    }
    showDropdown = false
  }

  function selectOption(option: MentionOption) {
    const textBefore = value.slice(0, cursorPosition)
    const lastPrefixIndex = textBefore.lastIndexOf(prefix)
    const textAfter = value.slice(cursorPosition)
    const insertText = option.label || option.value
    value = textBefore.slice(0, lastPrefixIndex) + prefix + insertText + ' ' + textAfter
    showDropdown = false
    onselect?.(option, prefix)
    onchange?.(value)
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!showDropdown || filteredOptions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      highlightIndex = Math.min(highlightIndex + 1, filteredOptions.length - 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      highlightIndex = Math.max(highlightIndex - 1, 0)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      selectOption(filteredOptions[highlightIndex])
    } else if (e.key === 'Escape') {
      showDropdown = false
    }
  }

  function handleBlur() {
    setTimeout(() => {
      showDropdown = false
    }, 200)
  }
</script>

<div class={classes}>
  <textarea
    class={ns.e('inner')}
    {value}
    {placeholder}
    {disabled}
    oninput={handleInput}
    onkeydown={handleKeydown}
    onblur={handleBlur}
    rows="3"
  ></textarea>
  {#if showDropdown && filteredOptions.length > 0}
    <ul class={ns.e('dropdown')}>
      {#if loading}
        <li class={ns.e('loading')}>加载中...</li>
      {:else}
        {#each filteredOptions as option, i}
          <li
            class="{ns.e('option')} {highlightIndex === i ? 'is-active' : ''}"
            onmousedown={(e) => { e.preventDefault(); selectOption(option) }}
            onmouseenter={() => highlightIndex = i}
          >
            {option.label || option.value}
          </li>
        {/each}
      {/if}
    </ul>
  {/if}
</div>

<style lang="scss">
  .su-mention {
    position: relative;
    display: inline-flex;
    width: 100%;

    &__inner {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      background: var(--su-bg-color);
      outline: none;
      resize: vertical;
      font-family: inherit;
      box-sizing: border-box;
      transition: border-color var(--su-transition-duration-fast);

      &:focus {
        border-color: var(--su-color-primary);
      }

      &::placeholder {
        color: var(--su-text-color-placeholder);
      }
    }

    &__dropdown {
      position: absolute;
      bottom: calc(100% + 4px);
      left: 0;
      z-index: var(--su-z-index-popup);
      min-width: 160px;
      max-height: 200px;
      overflow-y: auto;
      list-style: none;
      margin: 0;
      padding: 4px 0;
      background: var(--su-bg-color-overlay);
      border: 1px solid var(--su-border-color-light);
      border-radius: var(--su-border-radius-base);
      box-shadow: var(--su-box-shadow-light);
    }

    &__option {
      padding: 0 12px;
      height: 34px;
      line-height: 34px;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      cursor: pointer;

      &:hover,
      &.is-active {
        background: var(--su-fill-color-light);
      }
    }

    &__loading {
      padding: 8px 12px;
      color: var(--su-text-color-secondary);
      font-size: var(--su-font-size-small);
      text-align: center;
    }

    &.is-disabled .su-mention__inner {
      background-color: var(--su-fill-color-light);
      cursor: not-allowed;
      color: var(--su-text-color-disabled);
    }
  }
</style>
