import { StandardPlayingCard } from "../cards";
import { isMonster, rankToValue } from "./cards";
import { createScoundrelDeck } from "./createScoundrelDeck";
import { ScoundrelState } from "./types";
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
    state.dungeon.count === 0 && state.room.every((card) => !isMonster(card))
  );
}

function getTotalMonsterStrengthInArray(cards: StandardPlayingCard[]): number {
  return cards
    .filter(isMonster)
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
