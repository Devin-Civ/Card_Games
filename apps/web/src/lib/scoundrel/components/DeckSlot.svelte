<script lang="ts">
  import { ActionIconButton, CardSlotOverlay } from "$lib/components";
  import dungeonBack from "$lib/assets/cards/back01.png";
  import { RUN_ACTION_META } from "../ui/actionMeta";

  let {
    dungeonCount,
    canRunFromRoom,
    onRunFromRoom,
    showOverlay,
    onTooltipStart,
    onTooltipMove,
    onTooltipEnd,
  }: {
    dungeonCount: number;
    canRunFromRoom: boolean;
    onRunFromRoom: () => void;
    showOverlay: boolean;
    onTooltipStart?: (text: string, e: MouseEvent | FocusEvent) => void;
    onTooltipMove?: (e: MouseEvent) => void;
    onTooltipEnd?: () => void;
  } = $props();

  let isHovered = $state(false);
  const overlayVisible = $derived(showOverlay || isHovered);
</script>

{#if dungeonCount > 0}
  <div
    class="dungeon-area"
    role="group"
    aria-label="Dungeon deck"
    onmouseenter={() => (isHovered = true)}
    onmouseleave={() => (isHovered = false)}
    onfocusin={() => (isHovered = true)}
    onfocusout={() => (isHovered = false)}
  >
    <img class="dungeon-back" src={dungeonBack} alt="Dungeon deck" />
    <CardSlotOverlay
      visible={overlayVisible}
      layout={canRunFromRoom ? "stacked" : "centered"}
      className="dungeon-action-overlay"
    >
      <div class="count-chip" aria-label={`Dungeon cards remaining: ${dungeonCount}`}>
        {dungeonCount}
      </div>
      {#if canRunFromRoom}
        <ActionIconButton
          iconSrc={RUN_ACTION_META.icon}
          label={RUN_ACTION_META.label}
          tooltipText={RUN_ACTION_META.tooltip}
          onClick={onRunFromRoom}
          onTooltipStart={onTooltipStart}
          onTooltipMove={onTooltipMove}
          onTooltipEnd={onTooltipEnd}
          className="deck-run-action"
        />
      {/if}
    </CardSlotOverlay>
  </div>
{:else}
  <div class="card-slot-empty dungeon-slot-empty" aria-label="Dungeon deck is empty"></div>
{/if}

<style>
  .dungeon-area {
    position: relative;
    width: var(--card-sprite-w, 4.75rem);
    aspect-ratio: 5 / 7;
    border-radius: 6px;
    overflow: hidden;
    flex: 0 0 auto;
    box-shadow:
      0 1px 2px color-mix(in srgb, CanvasText 25%, transparent),
      0 0 0 1px color-mix(in srgb, CanvasText 12%, transparent);
  }
  .dungeon-back {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: transparent;
    display: block;
    border-radius: 6px;
  }
  .count-chip {
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
    font-size: 0.95rem;
    font-weight: 800;
    line-height: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.36);
    user-select: none;
    pointer-events: none;
  }
  .card-slot-empty {
    width: var(--card-sprite-w, 4.75rem);
    aspect-ratio: 5 / 7;
    display: grid;
    place-items: center;
    border-radius: 8px;
    border: 1px dashed color-mix(in srgb, CanvasText 30%, transparent);
    background: color-mix(in srgb, Canvas 86%, CanvasText 7%);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, CanvasText 8%, transparent);
    flex: 0 0 auto;
  }
  .dungeon-slot-empty {
    border-radius: 6px;
  }
</style>
