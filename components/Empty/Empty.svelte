<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 描述文案 */
    description?: string
    /** 图片地址 */
    imageSrc?: string
    /** 图片尺寸 */
    imageSize?: number
    /** 自定义图片区 */
    image?: Snippet
    /** 底部内容区 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('empty')

  let {
    description = '暂无数据',
    imageSrc,
    imageSize = 160,
    image,
    children,
    class: className = '',
  }: Props = $props()
</script>

<div class="{ns.b()} {className}">
  <div class={ns.e('image')} style="width: {imageSize}px">
    {#if image}
      {@render image()}
    {:else if imageSrc}
      <img src={imageSrc} alt={description} />
    {:else}
      <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="40" width="140" height="100" rx="4" fill="var(--su-fill-color)" stroke="var(--su-border-color-lighter)" stroke-width="1.5" />
        <rect x="50" y="60" width="100" height="8" rx="2" fill="var(--su-border-color-lighter)" />
        <rect x="50" y="78" width="80" height="8" rx="2" fill="var(--su-border-color-extra-light)" />
        <rect x="50" y="96" width="60" height="8" rx="2" fill="var(--su-border-color-extra-light)" />
        <circle cx="100" cy="130" r="3" fill="var(--su-border-color)" />
      </svg>
    {/if}
  </div>

  <p class={ns.e('description')}>{description}</p>

  {#if children}
    <div class={ns.e('bottom')}>
      {@render children()}
    </div>
  {/if}
</div>

<style lang="scss">
  .su-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0;

    &__image {
      display: flex;
      justify-content: center;

      img,
      svg {
        width: 100%;
        height: auto;
      }
    }

    &__description {
      margin: 12px 0 0;
      color: var(--su-text-color-secondary);
      font-size: var(--su-font-size-base);
    }

    &__bottom {
      margin-top: 16px;
    }
  }
</style>
