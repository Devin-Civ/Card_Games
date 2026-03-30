<script lang="ts">
  import type { Rank, Suit } from "@card-games/standard-cards";
  import { POCKET_SUIT_SHEETS } from "$lib/assets/cards/sheets";
  import { getCardFaceSpriteStyle } from "./spriteData";

  let {
    rank,
    suit,
    label,
    className = "",
  }: {
    rank: Rank;
    suit: Suit;
    label?: string;
    className?: string;
  } = $props();

  const ariaLabel = $derived(
    label ?? `Playing card ${rank} of ${suit}`,
  );
  const sheetUrl = $derived(POCKET_SUIT_SHEETS[suit]);
  const spriteStyle = $derived(
    `background-image: url(${sheetUrl}); ${getCardFaceSpriteStyle(rank)}`,
  );
</script>

<span
  class="card-sprite {className}"
  style={spriteStyle}
  role="img"
  aria-label={ariaLabel}
></span>

<style>
  .card-sprite {
    display: inline-block;
    width: var(--card-sprite-w, 4.75rem);
    aspect-ratio: 5 / 7;
    vertical-align: middle;
    image-rendering: pixelated;
    border-radius: 6px;
    box-shadow:
      0 1px 2px color-mix(in srgb, CanvasText 25%, transparent),
      0 0 0 1px color-mix(in srgb, CanvasText 12%, transparent);
  }
</style>
