<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    /** 绑定值 */
    value?: string
    /** 输入框类型 */
    type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'textarea'
    /** 占位文本 */
    placeholder?: string
    /** 是否禁用 */
    disabled?: boolean
    /** 是否只读 */
    readonly?: boolean
    /** 是否可清空 */
    clearable?: boolean
    /** 是否显示密码切换 */
    showPassword?: boolean
    /** 尺寸 */
    size?: ComponentSize
    /** 最大长度 */
    maxlength?: number
    /** 是否显示字数统计 */
    showWordLimit?: boolean
    /** textarea 行数 */
    rows?: number
    /** 前缀图标 */
    prefixIcon?: string
    /** 后缀图标 */
    suffixIcon?: string
    /** 前置内容 */
    prepend?: Snippet
    /** 后置内容 */
    append?: Snippet
    /** 输入事件 */
    oninput?: (value: string) => void
    /** 变更事件 */
    onchange?: (value: string) => void
    /** 聚焦事件 */
    onfocus?: (e: FocusEvent) => void
    /** 失焦事件 */
    onblur?: (e: FocusEvent) => void
    /** 回车事件 */
    onenter?: () => void
    /** 清空事件 */
    onclear?: () => void
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('input')

  let {
    value = $bindable(''),
    type = 'text',
    placeholder = '',
    disabled = false,
    readonly = false,
    clearable = false,
    showPassword = false,
    size = 'default',
    maxlength,
    showWordLimit = false,
    rows = 3,
    prefixIcon,
    suffixIcon,
    prepend,
    append,
    oninput,
    onchange,
    onfocus,
    onblur,
    onenter,
    onclear,
    class: className = '',
  }: Props = $props()

  let focused = $state(false)
  let passwordVisible = $state(false)

  let inputType = $derived(
    showPassword ? (passwordVisible ? 'text' : 'password') : type,
  )

  let showClear = $derived(clearable && value && !disabled && !readonly)
  let showPwdToggle = $derived(showPassword && value && !disabled)
  let showLimit = $derived(showWordLimit && maxlength && type !== 'textarea')
  let isTextarea = $derived(type === 'textarea')

  let wrapperClasses = $derived(
    [
      ns.b(),
      ns.m(size !== 'default' ? size : undefined),
      ns.is('disabled', disabled),
      ns.is('focus', focused),
      prepend ? ns.bem(undefined, 'prepend') : '',
      append ? ns.bem(undefined, 'append') : '',
      className,
    ]
      .filter(Boolean)
      .join(' '),
  )

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement
    value = target.value
    oninput?.(value)
  }

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement
    onchange?.(target.value)
  }

  function handleFocus(e: FocusEvent) {
    focused = true
    onfocus?.(e)
  }

  function handleBlur(e: FocusEvent) {
    focused = false
    onblur?.(e)
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !isTextarea) {
      onenter?.()
    }
  }

  function handleClear() {
    value = ''
    oninput?.('')
    onchange?.('')
    onclear?.()
  }

  function togglePassword() {
    passwordVisible = !passwordVisible
  }
</script>

{#if isTextarea}
  <div class="{ns.b()} {ns.m('textarea')} {ns.is('disabled', disabled)} {ns.is('focus', focused)} {className}">
    <textarea
      class={ns.e('inner')}
      {placeholder}
      {disabled}
      {readonly}
      {maxlength}
      {rows}
      oninput={handleInput}
      onchange={handleChange}
      onfocus={handleFocus}
      onblur={handleBlur}
      bind:value
    ></textarea>
    {#if showWordLimit && maxlength}
      <span class={ns.e('count')}>{value.length}/{maxlength}</span>
    {/if}
  </div>
{:else}
  <div class={wrapperClasses}>
    {#if prepend}
      <div class={ns.e('prepend')}>
        {@render prepend()}
      </div>
    {/if}

    <div class={ns.e('wrapper')}>
      {#if prefixIcon}
        <span class={ns.e('prefix')}>
          <Icon name={prefixIcon} />
        </span>
      {/if}

      <input
        class={ns.e('inner')}
        type={inputType}
        {placeholder}
        {disabled}
        {readonly}
        {maxlength}
        oninput={handleInput}
        onchange={handleChange}
        onfocus={handleFocus}
        onblur={handleBlur}
        onkeydown={handleKeydown}
        bind:value
      />

      {#if showClear}
        <span class="{ns.e('suffix')} {ns.e('clear')}" onclick={handleClear}>
          <Icon name="circle-close" size={14} />
        </span>
      {/if}

      {#if showPwdToggle}
        <span class="{ns.e('suffix')} {ns.e('password')}" onclick={togglePassword}>
          <Icon name={passwordVisible ? 'eye' : 'eye-off'} size={14} />
        </span>
      {/if}

      {#if suffixIcon && !showClear && !showPwdToggle}
        <span class={ns.e('suffix')}>
          <Icon name={suffixIcon} />
        </span>
      {/if}

      {#if showLimit}
        <span class={ns.e('count')}>{value.length}/{maxlength}</span>
      {/if}
    </div>

    {#if append}
      <div class={ns.e('append')}>
        {@render append()}
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  .su-input {
    display: inline-flex;
    width: 100%;
    position: relative;
    font-size: var(--su-font-size-base);

    &__wrapper {
      display: inline-flex;
      align-items: center;
      width: 100%;
      position: relative;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      background: var(--su-fill-color-blank);
      transition: border-color var(--su-transition-duration-fast);
      padding: 0 12px;
    }

    &.is-focus .su-input__wrapper {
      border-color: var(--su-color-primary);
    }

    &.is-disabled .su-input__wrapper {
      background: var(--su-fill-color-light);
      cursor: not-allowed;
    }

    &__inner {
      width: 100%;
      height: calc(var(--su-component-size) - 2px);
      border: none;
      outline: none;
      background: transparent;
      font-size: inherit;
      color: var(--su-text-color-regular);
      padding: 0;

      &::placeholder {
        color: var(--su-text-color-placeholder);
      }

      &:disabled {
        cursor: not-allowed;
        color: var(--su-text-color-disabled);
      }
    }

    &__prefix,
    &__suffix {
      display: inline-flex;
      align-items: center;
      color: var(--su-text-color-placeholder);
      flex-shrink: 0;
    }

    &__prefix {
      margin-right: 8px;
    }

    &__suffix {
      margin-left: 8px;
    }

    &__clear,
    &__password {
      cursor: pointer;
      transition: color var(--su-transition-duration-fast);

      &:hover {
        color: var(--su-text-color-secondary);
      }
    }

    &__count {
      color: var(--su-text-color-placeholder);
      font-size: var(--su-font-size-extra-small);
      margin-left: 4px;
      flex-shrink: 0;
    }

    &__prepend,
    &__append {
      display: inline-flex;
      align-items: center;
      padding: 0 12px;
      background: var(--su-fill-color-light);
      color: var(--su-text-color-regular);
      border: 1px solid var(--su-border-color);
      white-space: nowrap;
    }

    &__prepend {
      border-right: none;
      border-radius: var(--su-border-radius-base) 0 0 var(--su-border-radius-base);
    }

    &__append {
      border-left: none;
      border-radius: 0 var(--su-border-radius-base) var(--su-border-radius-base) 0;
    }

    &--prepend .su-input__wrapper {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &--append .su-input__wrapper {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    // 尺寸
    &--large .su-input__inner {
      height: calc(var(--su-component-size-large) - 2px);
    }

    &--small {
      font-size: var(--su-font-size-extra-small);

      .su-input__inner {
        height: calc(var(--su-component-size-small) - 2px);
      }
    }

    // 文本域
    &--textarea {
      display: block;

      .su-input__inner {
        height: auto;
        padding: 8px 12px;
        border: 1px solid var(--su-border-color);
        border-radius: var(--su-border-radius-base);
        background: var(--su-fill-color-blank);
        resize: vertical;
        font-family: inherit;
        line-height: var(--su-line-height);
        transition: border-color var(--su-transition-duration-fast);

        &:focus {
          border-color: var(--su-color-primary);
          outline: none;
        }
      }
    }

    &--textarea .su-input__count {
      position: absolute;
      right: 12px;
      bottom: 8px;
    }
  }
</style>
