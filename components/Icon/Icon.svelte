<script lang="ts">
  import { iconSvgContent, iconPaths } from '../../utils/icons'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    /** 图标名称（内置图标） */
    name?: string
    /** 图标大小，支持数字(px)或字符串 */
    size?: number | string
    /** 图标颜色 */
    color?: string
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('icon')
  let { name, size, color, class: className = '' }: Props = $props()

  let style = $derived(
    [
      size ? `font-size: ${typeof size === 'number' ? size + 'px' : size}` : '',
      color ? `color: ${color}` : '',
    ]
      .filter(Boolean)
      .join('; '),
  )

  /** 完整 SVG 内容（支持多 path） */
  let svgContent = $derived(name ? iconSvgContent[name] || '' : '')
</script>

{#if svgContent}
  <i class="{ns.b()} {className}" {style}>
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      {@html svgContent}
    </svg>
  </i>
{/if}

<style lang="scss">
  .su-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    line-height: 1;
    vertical-align: -0.15em;

    svg {
      width: 1em;
      height: 1em;
      fill: currentColor;
    }
  }
</style>
