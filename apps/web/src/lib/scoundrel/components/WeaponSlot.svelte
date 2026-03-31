<script lang="ts">
  import type { EquippedWeapon } from "@card-games/scoundrel";
  import { CardSprite } from "$lib/components";
  import swordIcon from "$lib/assets/icons/noun-sword-8324321.svg";

  let {
    weapon,
  }: {
    weapon: EquippedWeapon | null;
  } = $props();
</script>

{#if weapon}
  <div class="weapon-stack" aria-label="Weapon area">
    <div class="weapon-card">
      <CardSprite rank={weapon.baseCard.card.rank} suit={weapon.baseCard.card.suit} />
    </div>
    {#if weapon.slainMonsters.length > 0}
      <div class="slain-stack" aria-label="Monsters slain with equipped weapon">
        {#each weapon.slainMonsters as monster, index (`${monster.card.rank}-${monster.card.suit}-${index}`)}
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

<style>
  .weapon-stack {
    position: relative;
    width: var(--card-sprite-w, 4.75rem);
    aspect-ratio: 5 / 7;
    overflow: visible;
  }
  .weapon-card :global(.card-sprite) {
    display: block;
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
  .weapon-slot-empty {
    border-radius: 8px;
  }
  .slot-empty-icon {
    width: 2rem;
    height: 2rem;
    opacity: 0.65;
    filter: grayscale(1);
    user-select: none;
    pointer-events: none;
  }
  .weapon-empty-icon {
    width: 2.15rem;
    height: 2.15rem;
  }
</style>
