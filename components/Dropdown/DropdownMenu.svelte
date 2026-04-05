<script lang="ts">
    import type { Snippet } from "svelte";
    import { useNamespace } from "../../utils/bem";

    interface Props {
        /** 子内容 */
        children?: Snippet;
        /** 自定义 class */
        class?: string;
    }

    const ns = useNamespace("dropdown-menu");

    let { children, class: className = "" }: Props = $props();

    let classes = $derived([ns.b(), className].filter(Boolean).join(" "));
</script>

<ul class={classes} role="menu">
    {#if children}{@render children()}{/if}
</ul>

<style lang="scss">
    .el-dropdown-menu {
        list-style: none;
        margin: 0;
        padding: 5px 0;
        border-radius: var(--el-border-radius-base);
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-light);
        min-width: 150px;
    }
</style>
