<script lang="ts">
  import {
    startScoundrel,
    handleGameCommand,
    getAvailableCommandTypes,
    type ScoundrelState,
    getAvailableActionsForCard,
    type CardAction,
  } from "@card-games/scoundrel";
  import { ActionIconButton, CardSprite } from "$lib/components";
  import dungeonBack from "$lib/assets/cards/back01.png";
  import checkIcon from "$lib/assets/icons/noun-check-8317321.svg";
  import trashIcon from "$lib/assets/icons/noun-trash-8121018.svg";
  import swordIcon from "$lib/assets/icons/noun-sword-8324321.svg";
  import fistIcon from "$lib/assets/icons/noun-fist-6026323.svg";
  import runIcon from "$lib/assets/icons/noun-run-5976980.svg";

  let game: ScoundrelState = $state(startScoundrel());
  let lastResult = $state("");
  let lastResultStatus = $state<"victory" | "defeated" | null>(null);
  let uiVersion = $state(0);
  let dungeonCount = $derived.by(() => {
    uiVersion;
    return game.dungeon.count;
  });
  let discardCount = $derived.by(() => {
    uiVersion;
    return game.discardPile.length;
  });
  let availableRoomActions: CardAction[][] = $derived.by(() => {
    uiVersion;
    return game.room.map((card) => getAvailableActionsForCard(game, card));
  });
  let canRunFromRoom = $derived.by(() => {
    uiVersion;
    return getAvailableCommandTypes(game).includes("runFromRoom");
  });

  function runCommand(command: Parameters<typeof handleGameCommand>[1]) {
    const result = handleGameCommand(game, command);
    if (result.type === "gameOver") {
      const isDefeated = result.score < 0;
      lastResultStatus = isDefeated ? "defeated" : "victory";
      lastResult = `${isDefeated ? "DEFEATED" : "VICTORY!"} - Score: ${result.score}`;
    } else {
      lastResult = "";
      lastResultStatus = null;
    }
    uiVersion += 1;
  }

  function newGame() {
    game = startScoundrel();
    lastResult = "";
    lastResultStatus = null;
    uiVersion += 1;
  }

  function runFromRoom() {
    runCommand({ type: "runFromRoom" });
  }

  function executeAction(index: number, action: CardAction) {
    runCommand({ type: "selectCard", cardIndex: index, action: action });
  }

  function getActionLabel(action: CardAction): string {
    switch (action) {
      case "usePotion":
        return "Use potion";
      case "discardPotion":
        return "Discard potion";
      case "equipWeapon":
        return "Equip weapon";
      case "fightBarehanded":
        return "Fight barehanded";
      case "fightWithWeapon":
        return "Fight with weapon";
      default:
        return action;
    }
  }

  function getActionIcon(action: CardAction): string {
    switch (action) {
      case "usePotion":
      case "equipWeapon":
        return checkIcon;
      case "discardPotion":
        return trashIcon;
      case "fightBarehanded":
        return fistIcon;
      case "fightWithWeapon":
        return swordIcon;
      default:
        return checkIcon;
    }
  }
</script>

<section class="shell" aria-labelledby="scoundrel-title">
  <div class="top-bar">
    <div class="top-left-group">
      <h2 id="scoundrel-title" class="title-text">Scoundrel</h2>
      <button type="button" class="new-game-btn" onclick={newGame}>NEW GAME</button>
    </div>
    <p class="hp-display">
      HP:
      <strong class={game.player.health > 10 ? 'high_hp' : game.player.health > 0 ? 'low_hp' : 'dead-hp'}>
        {game.player.health}
      </strong>
    </p>
  </div>
  <div class="play-row">
    {#if dungeonCount > 0}
      <div class="dungeon-area" aria-label="Dungeon deck">
        <img class="dungeon-back" src={dungeonBack} alt="Dungeon deck" />
        <div
          class="dungeon-action-overlay"
          class:centered={!canRunFromRoom}
          class:stacked={canRunFromRoom}
        >
          <div class="dungeon-count-action" aria-label={`Dungeon cards remaining: ${dungeonCount}`}>
            {dungeonCount}
          </div>
          {#if canRunFromRoom}
            <ActionIconButton
              iconSrc={runIcon}
              label="Run from room"
              onClick={runFromRoom}
              className="deck-run-action"
            />
          {/if}
        </div>
      </div>
    {:else}
      <div class="card-slot-empty dungeon-slot-empty" aria-label="Dungeon deck is empty"></div>
    {/if}
    <div class="room-column">
      <div class="room-cards">
        {#each game.room as card, index (`${card.card.rank}-${card.card.suit}-${index}`)}
          {@const cardActions = availableRoomActions[index] ?? []}
          <div class="card">
            <div class="card-btn">
              <CardSprite rank={card.card.rank} suit={card.card.suit} />
            </div>
            {#if cardActions.length > 0}
              <div
                class="card-action-overlay"
                class:centered={cardActions.length === 1}
                class:stacked={cardActions.length > 1}
              >
                {#each cardActions as action (action)}
                  <ActionIconButton
                    iconSrc={getActionIcon(action)}
                    label={getActionLabel(action)}
                    onClick={() => executeAction(index, action)}
                  />
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </div>
      <div class="weapon-row" aria-label="Weapon area">
        {#if game.player.equippedWeapon}
          <div class="weapon-stack">
            <div class="card weapon-card">
              <div class="card-btn">
                <CardSprite
                  rank={game.player.equippedWeapon.baseCard.card.rank}
                  suit={game.player.equippedWeapon.baseCard.card.suit}
                />
              </div>
            </div>
            {#if game.player.equippedWeapon.slainMonsters.length > 0}
              <div class="slain-stack" aria-label="Monsters slain with equipped weapon">
                {#each game.player.equippedWeapon.slainMonsters as monster, index (`${monster.card.rank}-${monster.card.suit}-${index}`)}
                  <div
                    class="slain-card"
                    style={`--slain-index: ${index}; z-index: ${index + 1};`}
                    aria-label={`${monster.card.rank} of ${monster.card.suit}`}
                  >
                    <CardSprite rank={monster.card.rank} suit={monster.card.suit} />
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        {:else}
          <div class="card-slot-empty weapon-slot-empty" aria-label="No weapon equipped">
            <img class="slot-empty-icon weapon-empty-icon" src={swordIcon} alt="" aria-hidden="true" />
          </div>
        {/if}
      </div>
    </div>
    {#if discardCount > 0}
      <button type="button" class="discard-area" aria-label="Discard pile">
        <img class="discard-back" src={dungeonBack} alt="Discard pile" />
        <div class="discard-count-overlay">
          <div class="discard-count-action" aria-label={`Discard cards: ${discardCount}`}>
            {discardCount}
          </div>
        </div>
      </button>
    {:else}
      <div class="card-slot-empty discard-slot-empty" aria-label="Discard pile is empty">
        <img class="slot-empty-icon discard-empty-icon" src={trashIcon} alt="" aria-hidden="true" />
      </div>
    {/if}
  </div>
  {#if lastResult}
    <pre class="result" class:result-victory={lastResultStatus === "victory"} class:result-defeated={lastResultStatus === "defeated"}>{lastResult}</pre>
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
    margin: 0;
    font-size: 1.5rem;
    font-optical-sizing: var(--font-optical-sizing);
    font-style: var(--font-style);
    font-variation-settings: var(--font-variation-settings);
  }
  .top-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem 1rem;
    margin-bottom: 0.5rem;
  }
  .top-left-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
  }
  .new-game-btn {
    padding: 0.2rem 0.4rem;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, darkgreen 52%, CanvasText 20%);
    color: color-mix(in srgb, lightgray 55%, darkgreen 45%);
    background: transparent;
    font-size: 0.83rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .new-game-btn:hover {
    background: color-mix(in srgb, darkgreen 10%, transparent);
  }
  .hp-display {
    margin: 0 0 0 auto;
    font-size: 1.2rem;
    font-weight: 700;
    opacity: 0.95;
    white-space: nowrap;
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
    font-weight: 700;
    overflow: auto;
    background: color-mix(in srgb, CanvasText 6%, transparent);
  }
  .result-victory {
    color: green;
  }
  .result-defeated {
    color: darkred;
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
  .weapon-empty-icon {
    width: 2.15rem;
    height: 2.15rem;
  }
  .dungeon-slot-empty {
    border-radius: 6px;
  }
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
  .dungeon-action-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: color-mix(in srgb, black 15%, transparent);
    z-index: 1;
    pointer-events: none;
    opacity: 0;
    transition: opacity 140ms ease;
  }
  .dungeon-action-overlay.stacked {
    flex-direction: column;
  }
  .dungeon-action-overlay.centered {
    flex-direction: row;
  }
  .dungeon-count-action {
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
  .dungeon-action-overlay :global(.deck-run-action) {
    pointer-events: auto;
  }
  .dungeon-area:hover .dungeon-action-overlay,
  .dungeon-area:focus-within .dungeon-action-overlay,
  .dungeon-area:focus-visible .dungeon-action-overlay {
    opacity: 1;
    pointer-events: auto;
  }
  .discard-area {
    position: relative;
    width: var(--card-sprite-w, 4.75rem);
    aspect-ratio: 5 / 7;
    padding: 0;
    border: none;
    background: none;
    line-height: 0;
    border-radius: 6px;
    overflow: hidden;
    flex: 0 0 auto;
    margin-left: auto;
    box-shadow:
      0 1px 2px color-mix(in srgb, CanvasText 25%, transparent),
      0 0 0 1px color-mix(in srgb, CanvasText 12%, transparent);
  }
  .discard-slot-empty {
    margin-left: auto;
    border-radius: 6px;
  }
  .discard-back {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: transparent;
    display: block;
    border-radius: 6px;
  }
  .discard-count-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: color-mix(in srgb, black 15%, transparent);
    opacity: 0;
    pointer-events: none;
    transition: opacity 140ms ease;
  }
  .discard-count-action {
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
  .discard-area:hover .discard-count-overlay,
  .discard-area:focus-within .discard-count-overlay,
  .discard-area:focus-visible .discard-count-overlay {
    opacity: 1;
  }
  .card-btn {
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    border-radius: 8px;
    line-height: 0;
  }
  .card {
    position: relative;
    border-radius: 8px;
    outline: none;
  }
  .card:focus-within {
    outline: 2px solid CanvasText;
    outline-offset: 2px;
  }
  .card-btn :global(.card-sprite) {
    display: block;
    transition: filter 140ms ease;
  }
  .card:hover .card-btn :global(.card-sprite),
  .card:focus-within .card-btn :global(.card-sprite) {
    filter: brightness(0.94);
  }
  .weapon-card:hover .card-btn :global(.card-sprite),
  .weapon-card:focus-within .card-btn :global(.card-sprite) {
    filter: none;
  }
  .card-action-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: color-mix(in srgb, black 15%, transparent);
    opacity: 0;
    pointer-events: none;
  }
  .card-action-overlay.stacked {
    flex-direction: column;
  }
  .card-action-overlay.centered {
    flex-direction: row;
  }
  .card:hover .card-action-overlay,
  .card:focus-within .card-action-overlay {
    opacity: 1;
    pointer-events: auto;
  }
  .high_hp {
    color: green;
  }
  .weapon-row {
    display: flex;
    align-items: flex-start;
    margin: 0;
  }
  .weapon-stack {
    position: relative;
    width: var(--card-sprite-w, 4.75rem);
    aspect-ratio: 5 / 7;
    overflow: visible;
  }
  .weapon-card :global(.card-sprite) {
    display: block;
  }
  .weapon-slot-empty {
    border-radius: 8px;
  }
  .slain-stack {
    position: absolute;
    inset: 0;
    left: calc(var(--card-sprite-w, 4.75rem) * 0.5);
    overflow: visible;
    pointer-events: none;
  }
  .slain-card {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(
      calc(var(--slain-index, 0) * (var(--card-sprite-w, 4.75rem) * 0.5)),
      0
    );
    filter: drop-shadow(0 1px 2px color-mix(in srgb, black 28%, transparent));
  }
  .slain-card :global(.card-sprite) {
    display: block;
  }
  .low_hp {
    color: red;
  }
  .dead-hp {
    color: darkred;
  }
</style>
