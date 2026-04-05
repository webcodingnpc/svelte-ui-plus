/**
 * BEM 类名生成器
 * 前缀: su (svelte-ui)
 *
 * 用法:
 *   const ns = useNamespace('button')
 *   ns.b()           → 'su-button'
 *   ns.e('icon')     → 'su-button__icon'
 *   ns.m('primary')  → 'su-button--primary'
 *   ns.is('loading') → 'is-loading'
 */

const PREFIX = 'su'

export function useNamespace(block: string) {
    // 块级类名
    const b = () => `${PREFIX}-${block}`

    // 元素类名
    const e = (element: string) => `${PREFIX}-${block}__${element}`

    // 修饰符类名
    const m = (modifier: string | undefined) =>
        modifier ? `${PREFIX}-${block}--${modifier}` : ''

    // 状态类名
    const is = (state: string, active = true) => (active ? `is-${state}` : '')

    // 完整 BEM 类名
    const bem = (el?: string, mod?: string) => {
        let cls = `${PREFIX}-${block}`
        if (el) cls += `__${el}`
        if (mod) cls += `--${mod}`
        return cls
    }

    return { b, e, m, is, bem }
}
