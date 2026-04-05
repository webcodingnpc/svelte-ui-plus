<script lang="ts">
    import type { Snippet } from "svelte";
    import { useNamespace } from "../../utils/bem";

    interface Props {
        /** 命令标识 */
        command?: string | number;
        /** 是否禁用 */
        disabled?: boolean;
        /** 是否显示分割线 */
        divided?: boolean;
        /** 图标 */
        icon?: string;
        /** 子内容 */
        children?: Snippet;
        /** 自定义 class */
        class?: string;
    }

    const ns = useNamespace("dropdown-item");

    let {
        command,
        disabled = false,
        divided = false,
        icon,
        children,
        class: className = "",
    }: Props = $props();

    let classes = $derived(
        [ns.b(), divided && "is-divided", disabled && "is-disabled", className]
            .filter(Boolean)
            .join(" "),
    );
</script>

<li
    class={classes}
    role="menuitem"
    tabindex={disabled ? -1 : 0}
    data-command={command}
>
    {#if children}{@render children()}{/if}
</li>

<style lang="scss">
    .el-dropdown-item {
        display: flex;
        align-items: center;
        white-space: nowrap;
        list-style: none;
        line-height: 22px;
        padding: 5px 16px;
        margin: 0;
        font-size: var(--el-font-size-base);
        color: var(--el-text-color-regular);
        cursor: pointer;
        outline: none;

        &:not(.is-disabled):hover {
            background-color: var(--el-color-primary-light-9);
            color: var(--el-color-primary);
        }

        &.is-disabled {
            cursor: not-allowed;
            color: var(--el-text-color-placeholder);
        }

        &.is-divided {
            margin-top: 6px;
            border-top: 1px solid var(--el-border-color-lighter);
            padding-top: 11px;
        }
    }
</style>
