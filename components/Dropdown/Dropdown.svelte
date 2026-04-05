<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Placement, TriggerType } from "../../utils/types";
  import { useNamespace } from "../../utils/bem";

  interface DropdownItem {
    key: string;
    label: string;
    disabled?: boolean;
    divided?: boolean;
    icon?: string;
  }

  interface Props {
    /** 菜单项 */
    items?: DropdownItem[];
    /** 触发方式 */
    trigger?: TriggerType;
    /** 位置 */
    placement?: Placement;
    /** 点击菜单项事件 */
    oncommand?: (key: string) => void;
    /** 触发器内容 */
    children?: Snippet;
    /** 自定义 class */
    class?: string;
  }

  const ns = useNamespace("dropdown");

  let {
    items = [],
    trigger = "hover",
    placement = "bottom",
    oncommand,
    children,
    class: className = "",
  }: Props = $props();

  let visible = $state(false);
  let dropdownRef: HTMLElement | undefined = $state();
  let hideTimer: ReturnType<typeof setTimeout> | null = null;

  function show() {
    if (hideTimer) clearTimeout(hideTimer);
    visible = true;
  }

  function hide() {
    hideTimer = setTimeout(() => {
      visible = false;
    }, 150);
  }

  function toggle() {
    visible = !visible;
  }

  function handleItemClick(item: DropdownItem) {
    if (item.disabled) return;
    visible = false;
    oncommand?.(item.key);
  }

  // 点击外部关闭
  function handleClickOutside(e: MouseEvent) {
    if (
      trigger === "click" &&
      dropdownRef &&
      !dropdownRef.contains(e.target as Node)
    ) {
      visible = false;
    }
  }

  $effect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="{ns.b()} {className}"
  bind:this={dropdownRef}
  onmouseenter={trigger === "hover" ? show : undefined}
  onmouseleave={trigger === "hover" ? hide : undefined}
>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class={ns.e("trigger")}
    onclick={trigger === "click" ? toggle : undefined}
  >
    {@render children?.()}
  </div>

  {#if visible}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="{ns.e('menu')} {ns.m(placement)}"
      onmouseenter={trigger === "hover" ? show : undefined}
      onmouseleave={trigger === "hover" ? hide : undefined}
    >
      {#each items as item}
        {#if item.divided}
          <div class={ns.e("divider")}></div>
        {/if}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div
          class="{ns.e('item')} {item.disabled ? 'is-disabled' : ''}"
          onclick={() => handleItemClick(item)}
        >
          {item.label}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .su-dropdown {
    display: inline-flex;
    position: relative;

    &__trigger {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
    }

    &__menu {
      position: absolute;
      z-index: var(--su-z-index-popup);
      background: var(--su-bg-color-overlay);
      border: 1px solid var(--su-border-color-light);
      border-radius: var(--su-border-radius-base);
      box-shadow: var(--su-box-shadow-light);
      padding: 6px 0;
      min-width: 120px;

      &.su-dropdown--bottom {
        top: calc(100% + 4px);
        left: 0;
      }

      &.su-dropdown--top {
        bottom: calc(100% + 4px);
        left: 0;
      }
    }

    &__item {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      cursor: pointer;
      white-space: nowrap;
      transition: all var(--su-transition-duration-fast);

      &:hover {
        background: var(--su-color-primary-light-9);
        color: var(--su-color-primary);
      }

      &.is-disabled {
        color: var(--su-text-color-disabled);
        cursor: not-allowed;

        &:hover {
          background: transparent;
          color: var(--su-text-color-disabled);
        }
      }
    }

    &__divider {
      height: 1px;
      background: var(--su-border-color-lighter);
      margin: 4px 0;
    }
  }
</style>
