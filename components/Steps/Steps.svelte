<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { setContext } from 'svelte'

  interface Props {
    /** 当前激活步骤 */
    active?: number
    /** 方向 */
    direction?: 'horizontal' | 'vertical'
    /** 是否居中 */
    alignCenter?: boolean
    /** 是否简洁模式 */
    simple?: boolean
    /** 完成状态图标 */
    finishStatus?: 'wait' | 'process' | 'finish' | 'error' | 'success'
    /** 当前状态图标 */
    processStatus?: 'wait' | 'process' | 'finish' | 'error' | 'success'
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('steps')

  let {
    active = 0,
    direction = 'horizontal',
    alignCenter = false,
    simple = false,
    finishStatus = 'finish',
    processStatus = 'process',
    children,
    class: className = '',
  }: Props = $props()

  setContext('su-steps', {
    get active() { return active },
    get direction() { return direction },
    get finishStatus() { return finishStatus },
    get processStatus() { return processStatus },
    get simple() { return simple },
  })

  let classes = $derived(
    [ns.b(), ns.m(direction), simple && ns.m('simple'), alignCenter && ns.m('center'), className]
      .filter(Boolean)
      .join(' '),
  )
</script>

<div class={classes}>
  {@render children?.()}
</div>

<style lang="scss">
  .su-steps {
    display: flex;

    &--horizontal {
      flex-direction: row;
    }

    &--vertical {
      flex-direction: column;
    }

    &--simple {
      padding: 16px 20px;
      background-color: var(--su-fill-color-light);
      border-radius: var(--su-border-radius-base);
    }

    &--center {
      text-align: center;
    }
  }
</style>
