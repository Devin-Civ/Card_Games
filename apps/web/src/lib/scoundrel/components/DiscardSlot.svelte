<script lang="ts">
  import { CardSlotOverlay } from "$lib/components";
  import dungeonBack from "$lib/assets/cards/back01.png";
  import trashIcon from "$lib/assets/icons/noun-trash-8121018.svg";

  let {
    discardCount,
    showOverlay,
  }: {
    discardCount: number;
    showOverlay: boolean;
  } = $props();

  let isHovered = $state(false);
  const overlayVisible = $derived(showOverlay || isHovered);
</script>

{#if discardCount > 0}
  <div
    class="discard-area"
    role="group"
    aria-label="Discard pile"
    onmouseenter={() => (isHovered = true)}
    onmouseleave={() => (isHovered = false)}
    onfocusin={() => (isHovered = true)}
    onfocusout={() => (isHovered = false)}
  >
    <img class="discard-back" src={dungeonBack} alt="Discard pile" />
    <CardSlotOverlay visible={overlayVisible} layout="centered">
      <div class="count-chip" aria-label={`Discard cards: ${discardCount}`}>
        {discardCount}
      </div>
    </CardSlotOverlay>
  </div>
{:else}
  <div class="card-slot-empty discard-slot-empty" aria-label="Discard pile is empty">
    <img class="slot-empty-icon discard-empty-icon" src={trashIcon} alt="" aria-hidden="true" />
  </div>
{/if}

<style>
  .discard-area {
    position: relative;
    width: var(--card-sprite-w, 4.75rem);
    aspect-ratio: 5 / 7;
    border-radius: 6px;
    overflow: hidden;
    flex: 0 0 auto;
    margin-left: auto;
    box-shadow:
      0 1px 2px color-mix(in srgb, CanvasText 25%, transparent),
      0 0 0 1px color-mix(in srgb, CanvasText 12%, transparent);
  }
  .discard-back {
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
  .discard-slot-empty {
    margin-left: auto;
    border-radius: 6px;
  }
  .slot-empty-icon {
    width: 2rem;
    height: 2rem;
    opacity: 0.65;
    filter: grayscale(1);
    user-select: none;
    pointer-events: none;
  }
  .discard-empty-icon {
    width: 2.05rem;
    height: 2.05rem;
  }
</style>
