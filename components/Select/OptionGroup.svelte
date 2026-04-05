<script lang="ts">
    import type { Snippet } from "svelte";
    import { useNamespace } from "../../utils/bem";

    interface Props {
        /** 分组标题 */
        label?: string;
        /** 是否禁用 */
        disabled?: boolean;
        /** 子内容 */
        children?: Snippet;
        /** 自定义 class */
        class?: string;
    }

    const ns = useNamespace("option-group");

    let {
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

<ul class={classes}>
    <li class={ns.e("title")}>{label}</li>
    {#if children}{@render children()}{/if}
</ul>

<style lang="scss">
    .el-option-group {
        margin: 0;
        padding: 0;
        list-style: none;

        &__title {
            padding-left: 20px;
            font-size: 12px;
            color: var(--el-text-color-secondary);
            line-height: 30px;
        }

        &.is-disabled :global(.el-option) {
            color: var(--el-text-color-placeholder);
            cursor: not-allowed;
        }
    }
</style>
