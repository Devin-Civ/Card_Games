import { rankToValue } from "./cards";
import { createScoundrelDeck } from "./createScoundrelDeck";
import { GamePhase, ScoundrelCard, ScoundrelState } from "./types";

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

export function getPhase(state: ScoundrelState): GamePhase {
  if (isGameOver(state)) return "gameOver";
  if (state.canRunFromRoom) return "runOrFace";
  return "selectCard";
}

export function isRoomCleared(state: ScoundrelState): boolean {
  return state.room.length <= 1;
}

export function getFinalScore(state: ScoundrelState): number {
  return state.player.health - getTotalRemainingMonsterStrength(state);
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
