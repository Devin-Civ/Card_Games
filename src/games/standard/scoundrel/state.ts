import { rankToValue } from "./cards";
import { createScoundrelDeck } from "./createScoundrelDeck";
import { ScoundrelCard, ScoundrelState } from "./types";
import { applyDamageToPlayer } from "./actions/combat";

export const DEFAULT_PLAYER_HEALTH = 20;

export function createScoundrelState(): ScoundrelState {
  return {
    dungeon: createScoundrelDeck(),
    player: {
      health: DEFAULT_PLAYER_HEALTH,
      maxHealth: DEFAULT_PLAYER_HEALTH,
      equippedWeapon: null,
    },
    room: [],
    discardPile: [],
    canRunFromRoom: true,
    potionUsedInCurrentRoom: false,
  };
}

export function isRoomCleared(state: ScoundrelState): boolean {
  return state.room.length <= 1;
}

export function getFinalScore(state: ScoundrelState): number {
  annihilatePlayerWithRemainingMonsters(state);
  return state.player.health;
}

export function isGameOver(state: ScoundrelState): boolean {
  return isPlayerDead(state) || isDungeonCleared(state);
}

function isPlayerDead(state: ScoundrelState): boolean {
  return state.player.health <= 0;
}

function isDungeonCleared(state: ScoundrelState): boolean {
  return (
    state.dungeon.count === 0 &&
    state.room.every((card) => card.type !== "monster")
  );
}

function getTotalMonsterStrengthInArray(cards: ScoundrelCard[]): number {
  return cards
    .filter((card) => card.type === "monster")
    .reduce((sum, card) => sum + rankToValue(card), 0);
}

function getTotalRemainingMonsterStrength(state: ScoundrelState): number {
  return (
    getTotalMonsterStrengthInArray(state.room) +
    getTotalMonsterStrengthInArray(state.dungeon.drawCards(state.dungeon.count))
  );
}

function annihilatePlayerWithRemainingMonsters(state: ScoundrelState): void {
  applyDamageToPlayer(state.player, getTotalRemainingMonsterStrength(state));
}
