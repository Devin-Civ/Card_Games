<script lang="ts">
  let {
    health,
    onNewGame,
  }: {
    health: number;
    onNewGame: () => void;
  } = $props();
</script>

<div class="top-bar">
  <div class="top-left-group">
    <h2 id="scoundrel-title" class="title-text">Scoundrel</h2>
    <button type="button" class="new-game-btn" onclick={onNewGame}>NEW GAME</button>
  </div>
  <p class="hp-display">
    HP:
    <strong class={health > 10 ? "high_hp" : health > 0 ? "low_hp" : "dead-hp"}>
      {health}
    </strong>
  </p>
</div>

<style>
  .title-text {
    margin: 0;
    font-size: 1.5rem;
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
    border-radius: 4px;
    border: 1px solid color-mix(in srgb, darkgreen 52%, CanvasText 20%);
    color: color-mix(in srgb, lightgray 55%, darkgreen 45%);
    background: transparent;
    font-size: 0.83rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
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
