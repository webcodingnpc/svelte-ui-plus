<script lang="ts">
  import type { Snippet } from 'svelte'
  import { getContext, onMount } from 'svelte'

  interface Props {
    /** 步骤标题 */
    title?: string
    /** 步骤描述 */
    description?: string
    /** 目标元素选择器 */
    target?: string
    /** 子内容 */
    children?: Snippet
  }

  let { title = '', description = '', target, children }: Props = $props()

  const tour = getContext<any>('su-tour')

  onMount(() => {
    tour?.registerStep({ title, description, target })
  })
</script>

{#if children}
  {@render children()}
{/if}
