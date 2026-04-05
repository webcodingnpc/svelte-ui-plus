<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useNamespace } from '../../utils/bem'
  import { setContext } from 'svelte'

  interface Props {
    /** 当前激活菜单的 key */
    activeKey?: string
    /** 当前打开的子菜单 key 数组 */
    openKeys?: string[]
    /** 模式：水平 / 垂直 */
    mode?: 'horizontal' | 'vertical'
    /** 是否折叠（仅 vertical 模式有效） */
    collapse?: boolean
    /** 背景色 */
    backgroundColor?: string
    /** 文字颜色 */
    textColor?: string
    /** 激活文字颜色 */
    activeTextColor?: string
    /** 选择菜单项事件 */
    onselect?: (key: string) => void
    /** 子菜单打开事件 */
    onopen?: (key: string) => void
    /** 子菜单关闭事件 */
    onclose?: (key: string) => void
    /** 子内容 */
    children?: Snippet
    /** 自定义 class */
    class?: string
  }

  const ns = useNamespace('menu')

  let {
    activeKey = $bindable(''),
    openKeys = $bindable([]),
    mode = 'vertical',
    collapse = false,
    backgroundColor = '',
    textColor = '',
    activeTextColor = '',
    onselect,
    onopen,
    onclose,
    children,
    class: className = '',
  }: Props = $props()

  function handleSelect(key: string) {
    activeKey = key
    onselect?.(key)
  }

  function handleToggleSub(key: string) {
    const idx = openKeys.indexOf(key)
    if (idx > -1) {
      openKeys = openKeys.filter((k) => k !== key)
      onclose?.(key)
    } else {
      openKeys = [...openKeys, key]
      onopen?.(key)
    }
  }

  setContext('su-menu', {
    get activeKey() { return activeKey },
    get openKeys() { return openKeys },
    get mode() { return mode },
    get collapse() { return collapse },
    handleSelect,
    handleToggleSub,
  })

  let classes = $derived(
    [ns.b(), ns.m(mode), collapse && ns.m('collapse'), className].filter(Boolean).join(' '),
  )
</script>

<ul
  class={classes}
  role="menubar"
  style:background-color={backgroundColor || undefined}
  style:color={textColor || undefined}
  style:--su-menu-active-color={activeTextColor || undefined}
>
  {@render children?.()}
</ul>

<style lang="scss">
  .su-menu {
    list-style: none;
    margin: 0;
    padding: 0;
    border-right: 1px solid var(--su-border-color-light);
    background-color: var(--su-bg-color);
    font-size: var(--su-font-size-base);
    transition: width 0.3s ease;

    &--horizontal {
      display: flex;
      border-right: none;
      border-bottom: 1px solid var(--su-border-color-light);
    }

    &--vertical {
      width: 100%;
    }

    &--collapse {
      width: 64px;
    }
  }
</style>
