<script lang="ts">
  let {
    iconSrc,
    label,
    onClick,
    className = "",
    tooltipText = "",
    onTooltipStart,
    onTooltipMove,
    onTooltipEnd,
  }: {
    iconSrc: string;
    label: string;
    onClick: () => void;
    className?: string;
    tooltipText?: string;
    onTooltipStart?: (text: string, e: MouseEvent | FocusEvent) => void;
    onTooltipMove?: (e: MouseEvent) => void;
    onTooltipEnd?: () => void;
  } = $props();

  function handleTooltipStart(event: MouseEvent | FocusEvent): void {
    if (!tooltipText) return;
    onTooltipStart?.(tooltipText, event);
  }
</script>

<button
  type="button"
  class={`action-icon-btn ${className}`.trim()}
  aria-label={label}
  onclick={onClick}
  onmouseenter={handleTooltipStart}
  onmousemove={onTooltipMove}
  onmouseleave={onTooltipEnd}
  onfocus={handleTooltipStart}
  onblur={onTooltipEnd}
>
  <img src={iconSrc} alt="" aria-hidden="true" />
</button>

<style>
  .action-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.45rem;
    height: 2.45rem;
    padding: 0.34rem;
    border-radius: 0.55rem;
    border: 1px solid color-mix(in srgb, white 35%, transparent);
    background: color-mix(in srgb, black 55%, Canvas 10%);
    color: white;
    cursor: pointer;
  }

  .action-icon-btn:hover {
    background: color-mix(in srgb, black 45%, Canvas 18%);
  }

  .action-icon-btn img {
    width: 112%;
    height: 112%;
    display: block;
    filter: invert(1) contrast(1.2) saturate(1.05) drop-shadow(0 0.5px 0 rgba(255, 255, 255, 0.35));
    transform: scale(1.06);
    transform-origin: center;
  }

  .action-icon-btn:focus-visible {
    outline: 2px solid white;
    outline-offset: 1px;
  }
</style>
