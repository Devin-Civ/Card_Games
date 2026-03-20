import { Deck } from "../../../core/deck";
import { StandardPlayingCard } from "../cards";
import { isMonster, rankToValue } from "./cards";
import { createScoundrelDeck } from "./createScoundrelDeck";
import { ScoundrelState } from "./types";

const DEFAULT_PLAYER_HEALTH = 20;

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
    ranFromPreviousRoom: false,
  };
}

function isPlayerDead(state: ScoundrelState): boolean {
  return state.player.health <= 0;
}

function isDungeonCleared(state: ScoundrelState): boolean {
  return (
    state.dungeon.count === 0 && state.room.every((card) => !isMonster(card))
  );
}

export function isGameOver(state: ScoundrelState): boolean {
  return isPlayerDead(state) || isDungeonCleared(state);
}

export function calculateFinalScore(state: ScoundrelState): number {
  return (
    state.player.health -
    getTotalMonsterStrength(state.room) -
    getTotalMonsterStrength(state.dungeon.drawCards(state.dungeon.count))
  );
}

export function getTotalMonsterStrength(cards: StandardPlayingCard[]): number {
  return cards
    .filter(isMonster)
    .reduce((sum, card) => sum + rankToValue(card), 0);
}
