<script lang="ts">
    import type { Snippet } from "svelte";
    import { useNamespace } from "../../utils/bem";

    interface Props {
        /** 图片源 */
        urlList?: string[];
        /** 初始索引 */
        initialIndex?: number;
        /** 是否无限循环 */
        infinite?: boolean;
        /** 缩放比率 */
        zoomRate?: number;
        /** 最小缩放 */
        minScale?: number;
        /** 最大缩放 */
        maxScale?: number;
        /** z-index */
        zIndex?: number;
        /** 是否隐藏点击遮罩时关闭 */
        hideOnClickModal?: boolean;
        /** 关闭事件 */
        onclose?: () => void;
        /** 切换事件 */
        onswitch?: (index: number) => void;
        /** 自定义 class */
        class?: string;
    }

    const ns = useNamespace("image-viewer");

    let {
        urlList = [],
        initialIndex = 0,
        infinite = true,
        zoomRate = 0.2,
        minScale = 0.2,
        maxScale = 7,
        zIndex = 2000,
        hideOnClickModal = false,
        onclose,
        onswitch,
        class: className = "",
    }: Props = $props();

    let currentIndex = $state(0);
    let scale = $state(1);

    $effect(() => { currentIndex = initialIndex });
    let rotate = $state(0);

    let currentUrl = $derived(urlList[currentIndex] || "");

    function prev() {
        if (currentIndex > 0) {
            currentIndex--;
        } else if (infinite) {
            currentIndex = urlList.length - 1;
        }
        resetTransform();
        onswitch?.(currentIndex);
    }

    function next() {
        if (currentIndex < urlList.length - 1) {
            currentIndex++;
        } else if (infinite) {
            currentIndex = 0;
        }
        resetTransform();
        onswitch?.(currentIndex);
    }

    function zoomIn() {
        scale = Math.min(maxScale, scale + zoomRate);
    }

    function zoomOut() {
        scale = Math.max(minScale, scale - zoomRate);
    }

    function rotateLeft() {
        rotate -= 90;
    }

    function rotateRight() {
        rotate += 90;
    }

    function resetTransform() {
        scale = 1;
        rotate = 0;
    }

    function handleMaskClick() {
        if (hideOnClickModal) onclose?.();
    }

    let classes = $derived([ns.b(), className].filter(Boolean).join(" "));
</script>

<div class={classes} style="z-index: {zIndex}">
    <div class={ns.e("mask")} onclick={handleMaskClick}></div>
    <div class={ns.e("close")} onclick={() => onclose?.()}>✕</div>

    <div class={ns.e("actions")}>
        <button onclick={zoomOut} title="缩小">−</button>
        <button onclick={zoomIn} title="放大">+</button>
        <button onclick={rotateLeft} title="左旋">↺</button>
        <button onclick={rotateRight} title="右旋">↻</button>
    </div>

    {#if urlList.length > 1}
        <button class={ns.e("prev")} onclick={prev}>‹</button>
        <button class={ns.e("next")} onclick={next}>›</button>
    {/if}

    <div class={ns.e("canvas")}>
        <img
            src={currentUrl}
            alt=""
            style="transform: scale({scale}) rotate({rotate}deg); transition: transform 0.3s"
        />
    </div>
</div>

<style lang="scss">
    .el-image-viewer {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        &__mask {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
        }

        &__close {
            position: absolute;
            top: 40px;
            right: 40px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #fff;
            cursor: pointer;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            z-index: 1;
        }

        &__actions {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 12px;
            z-index: 1;

            button {
                width: 36px;
                height: 36px;
                background: rgba(0, 0, 0, 0.5);
                color: #fff;
                border: none;
                border-radius: 50%;
                font-size: 18px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;

                &:hover {
                    background: rgba(0, 0, 0, 0.7);
                }
            }
        }

        &__prev,
        &__next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 44px;
            height: 44px;
            background: rgba(0, 0, 0, 0.5);
            color: #fff;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            z-index: 1;

            &:hover {
                background: rgba(0, 0, 0, 0.7);
            }
        }

        &__prev {
            left: 40px;
        }
        &__next {
            right: 40px;
        }

        &__canvas {
            position: relative;
            z-index: 0;

            img {
                max-width: 90vw;
                max-height: 90vh;
                object-fit: contain;
            }
        }
    }
</style>
