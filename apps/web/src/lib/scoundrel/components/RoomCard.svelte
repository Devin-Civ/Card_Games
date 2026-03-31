<script lang="ts">
  import type { Rank, Suit } from "@card-games/standard-cards";
  import type { CardAction } from "@card-games/scoundrel";
  import { ActionIconButton, CardSlotOverlay, CardSprite } from "$lib/components";
  import { CARD_ACTION_META } from "../ui/actionMeta";

  let {
    rank,
    suit,
    actions,
    onAction,
    onTooltipStart,
    onTooltipMove,
    onTooltipEnd,
  }: {
    rank: Rank;
    suit: Suit;
    actions: CardAction[];
    onAction: (action: CardAction) => void;
    onTooltipStart?: (text: string, e: MouseEvent | FocusEvent) => void;
    onTooltipMove?: (e: MouseEvent) => void;
    onTooltipEnd?: () => void;
  } = $props();

  let isHovered = $state(false);
</script>

<div
  class="card"
  role="group"
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  onfocusin={() => (isHovered = true)}
  onfocusout={() => (isHovered = false)}
>
  <div class="card-body">
    <CardSprite {rank} {suit} />
  </div>
  <CardSlotOverlay
    visible={isHovered && actions.length > 0}
    layout={actions.length > 1 ? "stacked" : "centered"}
  >
    {#each actions as action (action)}
      {@const actionMeta = CARD_ACTION_META[action]}
      <ActionIconButton
        iconSrc={actionMeta.icon}
        label={actionMeta.label}
        tooltipText={actionMeta.tooltip}
        onClick={() => onAction(action)}
        {onTooltipStart}
        {onTooltipMove}
        {onTooltipEnd}
      />
    {/each}
  </CardSlotOverlay>
</div>

<style>
  .card {
    position: relative;
    border-radius: 8px;
    outline: none;
  }
  .card:focus-within {
    outline: 2px solid CanvasText;
    outline-offset: 2px;
  }
  .card-body :global(.card-sprite) {
    display: block;
    transition: filter 140ms ease;
  }
  .card:hover .card-body :global(.card-sprite),
  .card:focus-within .card-body :global(.card-sprite) {
    filter: brightness(0.94);
  }
</style>
