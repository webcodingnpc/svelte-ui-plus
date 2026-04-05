<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'
  import Tag from '../Tag/Tag.svelte'

  interface Props {
    value?: string[]
    size?: ComponentSize
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    max?: number
    trigger?: 'space' | 'enter'
    closable?: boolean
    clearable?: boolean
    oninput?: (val: string[]) => void
    onchange?: (val: string[]) => void
    class?: string
  }

  const ns = useNamespace('input-tag')
  let {
    value = $bindable([]),
    size = 'default',
    placeholder = '',
    disabled = false,
    readonly = false,
    max,
    trigger = 'enter',
    closable = true,
    clearable = false,
    oninput,
    onchange,
    class: className = '',
  }: Props = $props()

  let inputValue = $state('')
  let focused = $state(false)

  let classes = $derived(
    [ns.b(), ns.m(size !== 'default' ? size : undefined), ns.is('disabled', disabled), ns.is('focus', focused), className]
      .filter(Boolean)
      .join(' ')
  )

  function addTag() {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    if (max !== undefined && value.length >= max) return
    if (!value.includes(trimmed)) {
      value = [...value, trimmed]
      onchange?.(value)
    }
    inputValue = ''
  }

  function removeTag(index: number) {
    if (disabled || readonly) return
    value = value.filter((_, i) => i !== index)
    onchange?.(value)
  }

  function handleKeydown(e: KeyboardEvent) {
    if (trigger === 'enter' && e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
    if (trigger === 'space' && e.key === ' ') {
      e.preventDefault()
      addTag()
    }
    if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      removeTag(value.length - 1)
    }
  }

  function clearAll() {
    if (disabled || readonly) return
    value = []
    onchange?.(value)
  }
</script>

<div class={classes} onclick={() => { const el = document.querySelector(`.${ns.e('inner')}`) as HTMLInputElement; el?.focus() }}>
  <div class={ns.e('wrapper')}>
    {#each value as tag, i}
      <Tag
        closable={closable && !disabled && !readonly}
        size="small"
        onclose={() => removeTag(i)}
      >
        {tag}
      </Tag>
    {/each}
    <input
      class={ns.e('inner')}
      type="text"
      bind:value={inputValue}
      {placeholder}
      {disabled}
      {readonly}
      onfocus={() => focused = true}
      onblur={() => { focused = false; addTag() }}
      onkeydown={handleKeydown}
    />
  </div>
  {#if clearable && value.length > 0 && !disabled}
    <span class={ns.e('suffix')} onclick={(e) => { e.stopPropagation(); clearAll() }}>
      <Icon name="circle-close" size={14} />
    </span>
  {/if}
</div>

<style lang="scss">
  .su-input-tag {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    min-height: var(--su-component-size);
    padding: 2px 8px;
    border: 1px solid var(--su-border-color);
    border-radius: var(--su-border-radius-base);
    background: var(--su-bg-color);
    cursor: text;
    transition: border-color var(--su-transition-duration-fast) ease;
    box-sizing: border-box;
    width: 100%;

    &.is-focus {
      border-color: var(--su-color-primary);
    }

    &.is-disabled {
      background-color: var(--su-fill-color-light);
      cursor: not-allowed;
    }

    &__wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px;
      flex: 1;
    }

    &__inner {
      flex: 1;
      min-width: 60px;
      border: none;
      outline: none;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      background: transparent;
      padding: 0;
      height: 24px;
      line-height: 24px;

      &::placeholder {
        color: var(--su-text-color-placeholder);
      }
    }

    &__suffix {
      display: inline-flex;
      align-items: center;
      color: var(--su-text-color-placeholder);
      cursor: pointer;
      margin-left: 4px;

      &:hover {
        color: var(--su-text-color-secondary);
      }
    }

    &--large {
      min-height: var(--su-component-size-large);
    }

    &--small {
      min-height: var(--su-component-size-small);

      .su-input-tag__inner {
        font-size: var(--su-font-size-small);
        height: 18px;
        line-height: 18px;
      }
    }
  }
</style>
