<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    visible,
    layout,
    alwaysVisible = false,
    className = "",
    children,
  }: {
    visible: boolean;
    layout: "centered" | "stacked";
    alwaysVisible?: boolean;
    className?: string;
    children?: Snippet;
  } = $props();

  const isVisible = $derived(alwaysVisible || visible);
</script>

<div
  class={[
    "slot-overlay",
    layout,
    isVisible && "is-visible",
    className,
  ]}
>
  {@render children?.()}
</div>

<style>
  .slot-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    background: color-mix(in srgb, black 15%, transparent);
    opacity: 0;
    pointer-events: none;
    transition: opacity 140ms ease;
    z-index: 1;
  }

  .slot-overlay.centered {
    flex-direction: row;
  }

  .slot-overlay.stacked {
    flex-direction: column;
  }

  .slot-overlay.is-visible {
    opacity: 1;
    pointer-events: auto;
  }
</style>
