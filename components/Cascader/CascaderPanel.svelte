<script lang="ts">
    import type { Snippet } from "svelte";
    import { useNamespace } from "../../utils/bem";

    interface Props {
        /** 选项数据 */
        options?: any[];
        /** 选中值 */
        modelValue?: any;
        /** 分隔符 */
        separator?: string;
        /** 展开触发方式 */
        expandTrigger?: "click" | "hover";
        /** 是否多选 */
        multiple?: boolean;
        /** 是否可搜索 */
        filterable?: boolean;
        /** 自定义 class */
        class?: string;
        /** 选项变化 */
        onchange?: (value: any) => void;
        /** 子内容 */
        children?: Snippet;
    }

    const ns = useNamespace("cascader-panel");

    let {
        options = [],
        modelValue,
        separator = "/",
        expandTrigger = "click",
        multiple = false,
        filterable = false,
        onchange,
        children,
        class: className = "",
    }: Props = $props();

    let menus = $state<any[]>([[]])
    let activeValues = $state<any[]>([])

    $effect(() => { menus = [options] })
    $effect(() => { activeValues = Array.isArray(modelValue) ? modelValue : [] })

    function handleExpand(option: any, level: number) {
        activeValues = activeValues.slice(0, level);
        activeValues.push(option.value);
        if (option.children?.length > 0) {
            menus = [...menus.slice(0, level + 1), option.children];
        } else {
            menus = menus.slice(0, level + 1);
            onchange?.(activeValues);
        }
    }

    let classes = $derived([ns.b(), className].filter(Boolean).join(" "));
</script>

<div class={classes}>
    {#each menus as menu, level}
        <ul class={ns.e("menu")}>
            {#each menu as option}
                <li
                    class="{ns.e('node')} {activeValues[level] === option.value
                        ? 'is-active'
                        : ''} {option.disabled ? 'is-disabled' : ''}"
                    onclick={() =>
                        !option.disabled && handleExpand(option, level)}
                >
                    <span class={ns.e("label")}>{option.label}</span>
                    {#if option.children?.length > 0}
                        <span class={ns.e("arrow")}>›</span>
                    {/if}
                </li>
            {/each}
        </ul>
    {/each}
</div>

<style lang="scss">
    .el-cascader-panel {
        display: flex;
        border-radius: var(--el-border-radius-base);
        font-size: 14px;
    }

    .el-cascader-panel__menu {
        list-style: none;
        margin: 0;
        padding: 6px 0;
        min-width: 180px;
        border-right: 1px solid var(--el-border-color-light);
        max-height: 204px;
        overflow-y: auto;

        &:last-child {
            border-right: none;
        }
    }

    .el-cascader-panel__node {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px 0 20px;
        height: 34px;
        line-height: 34px;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
            background: var(--el-fill-color-light);
        }
        &.is-active {
            color: var(--el-color-primary);
            font-weight: bold;
        }
        &.is-disabled {
            color: var(--el-text-color-placeholder);
            cursor: not-allowed;
        }
    }

    .el-cascader-panel__arrow {
        font-size: 12px;
        color: var(--el-text-color-placeholder);
    }
</style>
