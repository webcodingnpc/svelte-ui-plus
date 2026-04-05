<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 标签文本 */
    label?: string
    /** 是否必填 */
    required?: boolean
    /** 错误信息 */
    error?: string
    /** 标签宽度（覆盖 Form 的） */
    labelWidth?: string
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('form-item')

  let {
    label = '',
    required = false,
    error = '',
    labelWidth,
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived(
    [
      ns.b(),
      ns.is('required', required),
      ns.is('error', !!error),
      className,
    ]
      .filter(Boolean)
      .join(' '),
  )
</script>

<div class={classes}>
  {#if label}
    <label
      class={ns.e('label')}
      style={labelWidth ? `width: ${labelWidth}` : 'width: var(--su-form-label-width, 80px)'}
    >
      {#if required}
        <span class={ns.e('required')}>*</span>
      {/if}
      {label}
    </label>
  {/if}

  <div class={ns.e('content')}>
    {@render children?.()}
    {#if error}
      <div class={ns.e('error')}>{error}</div>
    {/if}
  </div>
</div>

<style lang="scss">
  .su-form-item {
    display: flex;
    margin-bottom: 18px;
    align-items: flex-start;

    &__label {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 12px;
      height: var(--su-component-size);
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      line-height: var(--su-component-size);
      flex-shrink: 0;
      box-sizing: border-box;
    }

    &__required {
      color: var(--su-color-danger);
      margin-right: 4px;
    }

    &__content {
      flex: 1;
      position: relative;
      min-width: 0;
    }

    &__error {
      position: absolute;
      top: 100%;
      left: 0;
      padding-top: 2px;
      font-size: var(--su-font-size-extra-small);
      color: var(--su-color-danger);
      line-height: 1.2;
    }

    &.is-error {
      :global(.su-input__wrapper) {
        border-color: var(--su-color-danger);
      }

      :global(.su-select__trigger) {
        border-color: var(--su-color-danger);
      }
    }
  }
</style>
