<script lang="ts">
    import type { Snippet } from "svelte";
    import { useNamespace } from "../../utils/bem";

    interface Props {
        /** 选项值 */
        value?: string | number | boolean | object;
        /** 标签文本 */
        label?: string;
        /** 是否禁用 */
        disabled?: boolean;
        /** 子内容 */
        children?: Snippet;
        /** 自定义 class */
        class?: string;
    }

    const ns = useNamespace("option");

    let {
        value,
        label = "",
        disabled = false,
        children,
        class: className = "",
    }: Props = $props();

    let classes = $derived(
        [ns.b(), disabled && "is-disabled", className]
            .filter(Boolean)
            .join(" "),
    );
</script>

<li class={classes} role="option" data-value={value}>
    {#if children}{@render children()}{:else}<span>{label}</span>{/if}
</li>

<style lang="scss">
    .el-option {
        font-size: var(--el-font-size-base);
        padding: 0 32px 0 20px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--el-text-color-regular);
        height: 34px;
        line-height: 34px;
        box-sizing: border-box;
        cursor: pointer;

        &:hover {
            background-color: var(--el-fill-color-light);
        }
        &.is-disabled {
            color: var(--el-text-color-placeholder);
            cursor: not-allowed;
        }
    }
</style>
