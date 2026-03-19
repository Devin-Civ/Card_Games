import { Deck } from "../../../core/deck";
import { StandardPlayingCard } from "../cards";
import { createScoundrelDeck, EquippedWeapon } from "./scoundrel";

const DEFAULT_PLAYER_HEALTH = 20;

export type ScoundrelState = {
  dungeon: Deck<StandardPlayingCard>;
  player: {
    health: number;
    maxHealth: number;
    equippedWeapon: EquippedWeapon | null;
  };
  room: StandardPlayingCard[];
  discardPile: StandardPlayingCard[];
};

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
  };
}
