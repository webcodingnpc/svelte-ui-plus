<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    /** 头像地址 */
    src?: string
    /** 替代文本 */
    alt?: string
    /** 尺寸 */
    size?: number | 'large' | 'default' | 'small'
    /** 形状 */
    shape?: 'circle' | 'square'
    /** 图标名称（无 src 时） */
    icon?: string
    /** 加载失败事件 */
    onerror?: () => void
    /** 子内容（文字/元素） */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('avatar')

  let {
    src,
    alt = '',
    size = 'default',
    shape = 'circle',
    icon,
    onerror,
    children,
    class: className = '',
  }: Props = $props()

  let failed = $state(false)

  let sizeValue = $derived(
    typeof size === 'number'
      ? `${size}px`
      : { large: '56px', default: '40px', small: '24px' }[size],
  )

  let classes = $derived(
    [ns.b(), ns.m(shape), ns.m(typeof size === 'string' ? size : undefined), className]
      .filter(Boolean)
      .join(' '),
  )

  function handleError() {
    failed = true
    onerror?.()
  }
</script>

<span
  class={classes}
  style="width: {sizeValue}; height: {sizeValue}; font-size: {typeof size === 'number' ? Math.round(size / 2.5) + 'px' : ''}"
>
  {#if src && !failed}
    <img class={ns.e('img')} {src} {alt} onerror={handleError} />
  {:else if icon}
    <Icon name={icon} />
  {:else if children}
    {@render children()}
  {:else}
    <Icon name="more" />
  {/if}
</span>

<style lang="scss">
  .su-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: var(--su-fill-color);
    color: var(--su-text-color-secondary);
    font-size: var(--su-font-size-base);
    vertical-align: middle;

    &--circle {
      border-radius: 50%;
    }

    &--square {
      border-radius: var(--su-border-radius-base);
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
