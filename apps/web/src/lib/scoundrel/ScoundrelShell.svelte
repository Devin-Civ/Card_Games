<script lang="ts">
  import type { CardAction } from "@card-games/scoundrel";
  import { FloatingTooltip } from "$lib/components";
  import {
    createScoundrelUiState,
    resetUiGame,
    runUiCommand,
  } from "./ui/useScoundrelUiState";
  import ScoundrelTopBar from "./components/ScoundrelTopBar.svelte";
  import DeckSlot from "./components/DeckSlot.svelte";
  import DiscardSlot from "./components/DiscardSlot.svelte";
  import RoomCard from "./components/RoomCard.svelte";
  import WeaponSlot from "./components/WeaponSlot.svelte";
  import GameOverBanner from "./components/GameOverBanner.svelte";

  let uiState = $state(createScoundrelUiState());
  let tooltip = $state({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  function runFromRoom() {
    runUiCommand(uiState, { type: "runFromRoom" });
  }

  function executeAction(index: number, action: CardAction) {
    runUiCommand(uiState, { type: "selectCard", cardIndex: index, action });
  }

  function newGame() {
    resetUiGame(uiState);
    hideTooltip();
  }

  function setTooltipPositionFromEvent(event: MouseEvent | FocusEvent): void {
    if (event instanceof MouseEvent) {
      tooltip.x = event.clientX;
      tooltip.y = event.clientY;
      return;
    }

    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) return;
    const rect = target.getBoundingClientRect();
    tooltip.x = rect.left + rect.width / 2;
    tooltip.y = rect.top;
  }

  function showTooltip(text: string, event: MouseEvent | FocusEvent): void {
    tooltip.visible = true;
    tooltip.text = text;
    setTooltipPositionFromEvent(event);
  }

  function moveTooltip(event: MouseEvent): void {
    if (!tooltip.visible) return;
    tooltip.x = event.clientX;
    tooltip.y = event.clientY;
  }

  function hideTooltip(): void {
    tooltip.visible = false;
    tooltip.text = "";
  }
</script>

<section class="shell" aria-labelledby="scoundrel-title">
  <ScoundrelTopBar health={uiState.game.player.health} onNewGame={newGame} />

  <div class="play-row">
    <DeckSlot
      dungeonCount={uiState.dungeonCount}
      canRunFromRoom={uiState.canRunFromRoom}
      onRunFromRoom={runFromRoom}
      showOverlay={false}
      onTooltipStart={showTooltip}
      onTooltipMove={moveTooltip}
      onTooltipEnd={hideTooltip}
    />

    <div class="room-column">
      <div class="room-cards">
        {#each uiState.game.room as card, index (`${card.card.rank}-${card.card.suit}-${index}`)}
          <RoomCard
            rank={card.card.rank}
            suit={card.card.suit}
            actions={uiState.availableRoomActions[index] ?? []}
            onAction={(action) => executeAction(index, action)}
            onTooltipStart={showTooltip}
            onTooltipMove={moveTooltip}
            onTooltipEnd={hideTooltip}
          />
        {/each}
      </div>

      <div class="weapon-row">
        <WeaponSlot weapon={uiState.game.player.equippedWeapon} />
      </div>
    </div>

    <DiscardSlot discardCount={uiState.discardCount} showOverlay={false} />
  </div>

  <GameOverBanner text={uiState.lastResult} status={uiState.lastResultStatus} />
  <FloatingTooltip visible={tooltip.visible} text={tooltip.text} x={tooltip.x} y={tooltip.y} />
</section>

<style>
  .shell {
    font-family: var(--font-body);
    font-optical-sizing: var(--font-optical-sizing);
    font-style: var(--font-style);
    font-variation-settings: var(--font-variation-settings);
    padding: 1rem 1.25rem;
    border-radius: 12px;
    border: 1px solid color-mix(in srgb, CanvasText 18%, transparent);
    background: color-mix(in srgb, Canvas 92%, CanvasText 4%);
  }
  .play-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 1.5rem;
    padding-bottom: 1rem;
  }
  .room-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 1 auto;
    gap: 0.9rem;
    min-width: 0;
  }
  .room-cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;
    width: 100%;
  }
  .weapon-row {
    display: flex;
    align-items: flex-start;
    margin: 0;
  }
</style>
