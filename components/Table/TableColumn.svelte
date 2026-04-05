<script lang="ts">
    import type { Snippet } from "svelte";
    import { useNamespace } from "../../utils/bem";

    interface Props {
        /** 列配置 */
        prop?: string;
        /** 标题 */
        label?: string;
        /** 宽度 */
        width?: string | number;
        /** 最小宽度 */
        minWidth?: string | number;
        /** 对齐方式 */
        align?: "left" | "center" | "right";
        /** 表头对齐 */
        headerAlign?: "left" | "center" | "right";
        /** 固定列 */
        fixed?: boolean | "left" | "right";
        /** 排序 */
        sortable?: boolean | "custom";
        /** 可否show-overflow-tooltip */
        showOverflowTooltip?: boolean;
        /** 自定义格式化 */
        formatter?: (
            row: any,
            column: any,
            cellValue: any,
            index: number,
        ) => string;
        /** 自定义渲染 */
        children?: Snippet;
        /** 自定义 class */
        class?: string;
        /** 列类型 */
        type?: "" | "selection" | "index" | "expand";
    }

    const ns = useNamespace("table-column");

    let {
        prop = "",
        label = "",
        width,
        minWidth,
        align = "left",
        headerAlign,
        fixed,
        sortable = false,
        showOverflowTooltip = false,
        formatter,
        type = "",
        children,
        class: className = "",
    }: Props = $props();
</script>

<!-- TableColumn 是声明式配置组件，实际渲染由 Table 驱动 -->
<!-- 此组件主要用于在 Table 中声明列定义 -->
{#if children}{@render children()}{/if}
