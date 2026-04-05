<script lang="ts">
    import type { Snippet } from "svelte";
    import { useNamespace } from "../../utils/bem";

    interface Props {
        /** 最大显示数 */
        max?: number;
        /** 子内容（Avatar 列表） */
        children?: Snippet;
        /** 自定义 class */
        class?: string;
    }

    const ns = useNamespace("avatar-group");

    let { max, children, class: className = "" }: Props = $props();

    let classes = $derived([ns.b(), className].filter(Boolean).join(" "));
</script>

<div class={classes}>
    {#if children}{@render children()}{/if}
</div>

<style lang="scss">
    .el-avatar-group {
        display: inline-flex;
        align-items: center;

        :global(.el-avatar) {
            border: 2px solid var(--el-bg-color);
            &:not(:first-child) {
                margin-left: -8px;
            }
        }
    }
</style>
