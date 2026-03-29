<script lang="ts">
  import {
    startScoundrel,
    handleGameCommand,
    getPhase,
    getAvailableCommandTypes,
    type ScoundrelState,
  } from "@card-games/scoundrel";

  let game: ScoundrelState = $state(startScoundrel());
  let lastResult = $state("");

  function newGame() {
    game = startScoundrel();
    lastResult = "";
  }

  function runFromRoom() {
    lastResult = JSON.stringify(
      handleGameCommand(game, { type: "runFromRoom" }),
    );
  }

  function selectCard() {
  }
</script>

<section class="shell" aria-labelledby="scoundrel-title">
  <h2 id="scoundrel-title">Scoundrel</h2>
  <p class="status">
    Phase <strong>{getPhase(game)}</strong> · Room
    <strong>{game.room.length}</strong> cards · Dungeon
    <strong>{game.dungeon.count}</strong>
  </p>
  <div class="room">
    {#each game.room as card}
      <div class="card">
        <button type="button" onclick={() => selectCard()}>{card.card.rank} of {card.card.suit}</button>
      </div>
    {/each}
  </div>
  <div class="actions">
    <button type="button" onclick={newGame}>New game</button>
    {#if getAvailableCommandTypes(game).includes("runFromRoom")}
      <button type="button" onclick={runFromRoom}>Run from room</button>
    {/if}
  </div>
  {#if lastResult}
    <pre class="result">{lastResult}</pre>
  {/if}
</section>

<style>
  .shell {
    padding: 1rem 1.25rem;
    border-radius: 12px;
    border: 1px solid color-mix(in srgb, CanvasText 18%, transparent);
    background: color-mix(in srgb, Canvas 92%, CanvasText 4%);
  }
  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
  }
  .status {
    margin: 0 0 1rem;
    font-size: 0.95rem;
    opacity: 0.9;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  button {
    cursor: pointer;
    padding: 0.45rem 0.85rem;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, CanvasText 22%, transparent);
    background: Canvas;
    font: inherit;
  }
  button:hover {
    background: color-mix(in srgb, Canvas 85%, CanvasText 8%);
  }
  .result {
    margin: 1rem 0 0;
    padding: 0.65rem 0.75rem;
    border-radius: 8px;
    font-size: 0.8rem;
    overflow: auto;
    background: color-mix(in srgb, CanvasText 6%, transparent);
  }
  .room {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap; /* default for flex, but explicit helps */
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 1rem;
}
</style>
