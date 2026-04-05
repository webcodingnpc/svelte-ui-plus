<script lang="ts">
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    value?: string
    size?: ComponentSize
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    fetchSuggestions?: (query: string) => Promise<string[]> | string[]
    triggerOnFocus?: boolean
    debounce?: number
    oninput?: (val: string) => void
    onselect?: (val: string) => void
    class?: string
  }

  const ns = useNamespace('autocomplete')
  let {
    value = $bindable(''),
    size = 'default',
    placeholder = '',
    disabled = false,
    clearable = false,
    fetchSuggestions,
    triggerOnFocus = true,
    debounce = 300,
    oninput,
    onselect,
    class: className = '',
  }: Props = $props()

  let suggestions = $state<string[]>([])
  let showSuggestions = $state(false)
  let focused = $state(false)
  let highlightIndex = $state(-1)
  let timer: ReturnType<typeof setTimeout> | null = null

  let classes = $derived(
    [ns.b(), ns.m(size !== 'default' ? size : undefined), ns.is('disabled', disabled), className]
      .filter(Boolean)
      .join(' ')
  )

  async function querySuggestions(query: string) {
    if (!fetchSuggestions) return
    const result = await fetchSuggestions(query)
    suggestions = result || []
    showSuggestions = suggestions.length > 0
    highlightIndex = -1
  }

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement
    value = target.value
    oninput?.(value)
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => querySuggestions(value), debounce)
  }

  function handleFocus() {
    focused = true
    if (triggerOnFocus) {
      querySuggestions(value)
    }
  }

  function handleBlur() {
    // 延迟关闭以允许点击选项
    setTimeout(() => {
      focused = false
      showSuggestions = false
    }, 200)
  }

  function selectItem(item: string) {
    value = item
    onselect?.(item)
    showSuggestions = false
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!showSuggestions) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      highlightIndex = Math.min(highlightIndex + 1, suggestions.length - 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      highlightIndex = Math.max(highlightIndex - 1, 0)
    } else if (e.key === 'Enter' && highlightIndex >= 0) {
      e.preventDefault()
      selectItem(suggestions[highlightIndex])
    } else if (e.key === 'Escape') {
      showSuggestions = false
    }
  }

  function handleClear() {
    value = ''
    suggestions = []
    showSuggestions = false
    oninput?.('')
  }

  let showClear = $derived(clearable && value && !disabled)
</script>

<div class={classes}>
  <div class={ns.e('wrapper')}>
    <input
      class={ns.e('inner')}
      type="text"
      {value}
      {placeholder}
      {disabled}
      oninput={handleInput}
      onfocus={handleFocus}
      onblur={handleBlur}
      onkeydown={handleKeydown}
      autocomplete="off"
    />
    {#if showClear}
      <span class={ns.e('suffix')} onclick={handleClear}>
        <Icon name="circle-close" size={14} />
      </span>
    {/if}
  </div>
  {#if showSuggestions && focused}
    <ul class={ns.e('suggestions')}>
      {#each suggestions as item, i}
        <li
          class="{ns.e('suggestion')} {highlightIndex === i ? 'is-active' : ''}"
          onclick={() => selectItem(item)}
          onmouseenter={() => highlightIndex = i}
        >
          {item}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  .su-autocomplete {
    position: relative;
    display: inline-flex;
    width: 100%;

    &__wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }

    &__inner {
      width: 100%;
      height: var(--su-component-size);
      padding: 0 12px;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      background: var(--su-bg-color);
      outline: none;
      box-sizing: border-box;
      transition: border-color var(--su-transition-duration-fast);

      &:focus {
        border-color: var(--su-color-primary);
      }

      &::placeholder {
        color: var(--su-text-color-placeholder);
      }
    }

    &__suffix {
      position: absolute;
      right: 8px;
      display: flex;
      align-items: center;
      color: var(--su-text-color-placeholder);
      cursor: pointer;

      &:hover {
        color: var(--su-text-color-secondary);
      }
    }

    &__suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: var(--su-z-index-popup);
      margin: 4px 0 0;
      padding: 4px 0;
      list-style: none;
      background: var(--su-bg-color-overlay);
      border: 1px solid var(--su-border-color-light);
      border-radius: var(--su-border-radius-base);
      box-shadow: var(--su-box-shadow-light);
      max-height: 200px;
      overflow-y: auto;
    }

    &__suggestion {
      padding: 0 12px;
      height: 34px;
      line-height: 34px;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover,
      &.is-active {
        background-color: var(--su-fill-color-light);
      }
    }

    &.is-disabled .su-autocomplete__inner {
      background-color: var(--su-fill-color-light);
      color: var(--su-text-color-disabled);
      cursor: not-allowed;
    }

    &--large .su-autocomplete__inner {
      height: var(--su-component-size-large);
    }

    &--small .su-autocomplete__inner {
      height: var(--su-component-size-small);
      font-size: var(--su-font-size-small);
    }
  }
</style>
