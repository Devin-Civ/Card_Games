<script lang="ts">
  import {
    startScoundrel,
    handleGameCommand,
    getAvailableCommandTypes,
    type ScoundrelState,
    getAvailableActionsForCard,
    type CardAction,
  } from "@card-games/scoundrel";
  import { CardSprite } from "$lib/components";

  let game: ScoundrelState = $state(startScoundrel());
  let lastResult = $state("");
  let selectedCardIndex = $state<number | null>(null);
  let interactChoices: CardAction[] = $derived(getInteractChoices(selectedCardIndex));

  function newGame() {
    game = startScoundrel();
    lastResult = "";
  }

  function runFromRoom() {
    lastResult = JSON.stringify(
      handleGameCommand(game, { type: "runFromRoom" }),
    );
  }

  function selectCard(index: number) {
    selectedCardIndex = index;
    if (interactChoices.length === 1) {
      selectAction(interactChoices[0]);
    }
  }

  function getInteractChoices( index: number | null): CardAction[] {
    if (index === null) return [];
    return getAvailableActionsForCard(game, game.room[index]);
  }

  function executeAction(index: number, action: CardAction) {
    lastResult = JSON.stringify(
      handleGameCommand(game, { type: "selectCard", cardIndex: index, action: action }),
    );
  }

  function cancelSelection() {
    selectedCardIndex = null;
  }

  function selectAction(action: CardAction) {
    executeAction(selectedCardIndex!, action);
    selectedCardIndex = null;
  }
</script>

<section class="shell" aria-labelledby="scoundrel-title">
  <h2 id="scoundrel-title" class="title-text">Scoundrel</h2>
  <p class="status">
    Health <strong class={game.player.health > 10 ? 'high_hp' : game.player.health > 0 ? 'low_hp' : 'dead-hp'}>{game.player.health}</strong> · Dungeon
    <strong>{game.dungeon.count}</strong> · Weapon 
    {#if game.player.equippedWeapon}<strong>{game.player.equippedWeapon.baseCard.card.rank}</strong>
    {#if game.player.equippedWeapon.slainMonsters.length > 0}
      {#each game.player.equippedWeapon.slainMonsters as monster (`${monster.card.rank}-${monster.card.suit}`)}
        <span class="slain-monster">({monster.card.rank} of {monster.card.suit})</span>
      {/each}
    {/if}
    {:else}<strong>None</strong>{/if}
  </p>
  <div class="room">
    {#each game.room as card, index (`${card.card.rank}-${card.card.suit}-${index}`)}
      <div class="card">
        <button
          type="button"
          class="card-btn"
          onclick={() => selectCard(index)}
        >
          <CardSprite rank={card.card.rank} suit={card.card.suit} />
        </button>
      </div>
    {/each}
  </div>
  <div class="actions">
    <button type="button" onclick={newGame}>New game</button>
    {#if getAvailableCommandTypes(game).includes("runFromRoom")}
      <button type="button" onclick={runFromRoom}>Run from room</button>
    {/if}
    {#if interactChoices.length > 1}
        {#each interactChoices as choice (choice)}
          <button type="button" onclick={() => selectAction(choice)}>{choice}</button>
        {/each}
        <button type="button" onclick={cancelSelection}>Cancel</button>
    {/if}
  </div>
  {#if lastResult}
    <pre class="result">{lastResult}</pre>
  {/if}
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
  .title-text {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
    font-optical-sizing: var(--font-optical-sizing);
    font-style: var(--font-style);
    font-variation-settings: var(--font-variation-settings);
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
    flex-wrap: nowrap;
    align-items: center;
    gap: 1.5rem;
    padding-bottom: 1rem;
  }
  .card-btn {
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    cursor: pointer;
    border-radius: 8px;
    line-height: 0;
  }
  .card-btn:focus-visible {
    outline: 2px solid CanvasText;
    outline-offset: 2px;
  }
  .card-btn :global(.card-sprite) {
    display: block;
  }
  .high_hp {
    color: green;
  }
  .low_hp {
    color: red;
  }
  .dead-hp {
    color: darkred;
  }
</style>
