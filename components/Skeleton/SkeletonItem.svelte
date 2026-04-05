<script lang="ts">
    import type { Snippet } from "svelte";
    import { useNamespace } from "../../utils/bem";

    interface Props {
        /** 骨架类型 */
        variant?:
            | "p"
            | "text"
            | "h1"
            | "h3"
            | "caption"
            | "button"
            | "circle"
            | "rect"
            | "image";
        /** 自定义 class */
        class?: string;
    }

    const ns = useNamespace("skeleton-item");

    let { variant = "text", class: className = "" }: Props = $props();

    let classes = $derived(
        [ns.b(), ns.m(variant), className].filter(Boolean).join(" "),
    );
</script>

<div class={classes}></div>

<style lang="scss">
    .el-skeleton-item {
        background: var(--el-fill-color);
        border-radius: var(--el-border-radius-base);
        animation: el-skeleton-loading 1.4s ease infinite;

        &--text {
            height: 13px;
            width: 100%;
        }
        &--p {
            height: 16px;
            width: 100%;
            margin-top: 12px;
            &:first-child {
                margin-top: 0;
            }
        }
        &--h1 {
            height: 22px;
            width: 33%;
        }
        &--h3 {
            height: 18px;
            width: 25%;
        }
        &--caption {
            height: 12px;
            width: 50%;
        }
        &--button {
            height: 40px;
            width: 64px;
            border-radius: 4px;
        }
        &--circle {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        &--rect {
            width: 100%;
            height: 100%;
            min-height: 50px;
        }
        &--image {
            width: 100%;
            height: 100%;
            min-height: 100px;
        }
    }

    @keyframes el-skeleton-loading {
        0% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0 50%;
        }
    }
</style>
