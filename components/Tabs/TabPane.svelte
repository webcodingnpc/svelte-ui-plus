<script lang="ts">
    import type { Snippet } from "svelte";
    import { useNamespace } from "../../utils/bem";

    interface Props {
        /** Tab 标签文本 */
        label?: string;
        /** Tab 唯一标识 */
        name?: string | number;
        /** 是否禁用 */
        disabled?: boolean;
        /** 是否可关闭 */
        closable?: boolean;
        /** 是否延迟渲染 */
        lazy?: boolean;
        /** 子内容 */
        children?: Snippet;
        /** 自定义 class */
        class?: string;
    }

    const ns = useNamespace("tab-pane");

    let {
        label = "",
        name,
        disabled = false,
        closable = false,
        lazy = false,
        children,
        class: className = "",
    }: Props = $props();

    let classes = $derived([ns.b(), className].filter(Boolean).join(" "));
</script>

<div class={classes} role="tabpanel">
    {#if children}{@render children()}{/if}
</div>

<style lang="scss">
    .el-tab-pane {
        &:focus {
            outline: none;
        }
    }
</style>
