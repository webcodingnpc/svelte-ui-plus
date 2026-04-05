<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'

  interface Props {
    content?: string
    font?: string
    fontSize?: number
    fontColor?: string
    gap?: [number, number]
    offset?: [number, number]
    rotate?: number
    zIndex?: number
    width?: number
    height?: number
    children?: Snippet
    class?: string
  }

  const ns = useNamespace('watermark')
  let {
    content = '',
    font = 'sans-serif',
    fontSize = 14,
    fontColor = 'rgba(0, 0, 0, 0.15)',
    gap = [100, 100],
    offset = [0, 0],
    rotate = -22,
    zIndex = 9,
    width,
    height,
    children,
    class: className = '',
  }: Props = $props()

  let classes = $derived([ns.b(), className].filter(Boolean).join(' '))

  let watermarkUrl = $derived(() => {
    if (!content) return ''
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''

    const dpr = window.devicePixelRatio || 1
    const w = (width || content.length * fontSize + gap[0]) * dpr
    const h = (height || fontSize * 2 + gap[1]) * dpr
    canvas.width = w
    canvas.height = h

    ctx.translate(w / 2, h / 2)
    ctx.rotate((rotate * Math.PI) / 180)
    ctx.font = `${fontSize * dpr}px ${font}`
    ctx.fillStyle = fontColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(content, 0, 0)

    return canvas.toDataURL()
  })
</script>

<div class={classes} style="position: relative;">
  {#if children}{@render children()}{/if}
  {#if content}
    <div
      class={ns.e('mark')}
      style="
        position: absolute;
        inset: 0;
        z-index: {zIndex};
        pointer-events: none;
        background-image: url({watermarkUrl()});
        background-repeat: repeat;
        background-position: {offset[0]}px {offset[1]}px;
      "
    ></div>
  {/if}
</div>

<style lang="scss">
  .su-watermark {
    position: relative;
    overflow: hidden;
  }
</style>
