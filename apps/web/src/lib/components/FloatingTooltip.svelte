<script lang="ts">
  const X_OFFSET = 14;
  const Y_OFFSET = 14;
  const VIEWPORT_MARGIN = 8;

  let {
    visible,
    text,
    x,
    y,
  }: {
    visible: boolean;
    text: string;
    x: number;
    y: number;
  } = $props();

  const styleValue = $derived(
    `left: clamp(${VIEWPORT_MARGIN}px, ${x + X_OFFSET}px, calc(100vw - ${VIEWPORT_MARGIN}px)); top: clamp(${VIEWPORT_MARGIN}px, ${y + Y_OFFSET}px, calc(100vh - ${VIEWPORT_MARGIN}px));`,
  );
</script>

{#if visible && text}
  <div class="floating-tooltip" role="tooltip" style={styleValue}>
    {text}
  </div>
{/if}

<style>
  .floating-tooltip {
    position: fixed;
    z-index: 1200;
    max-width: min(20rem, calc(100vw - 1rem));
    padding: 0.35rem 0.5rem;
    border-radius: 0.45rem;
    border: 1px solid color-mix(in srgb, white 20%, transparent);
    background: color-mix(in srgb, black 82%, Canvas 18%);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.3;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
    pointer-events: none;
    transform: translateY(-2px);
    white-space: nowrap;
  }
  @media (max-width: 540px) {
    .floating-tooltip {
      white-space: normal;
    }
  }
</style>
