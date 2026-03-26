import { Deck } from "../../../core/deck";
import { StandardPlayingCard } from "../cards";

export type ScoundrelState = {
  dungeon: Deck<StandardPlayingCard>;
  player: ScoundrelPlayer;
  room: StandardPlayingCard[];
  discardPile: StandardPlayingCard[];
  ranFromPreviousRoom: boolean;
  potionUsedInCurrentRoom: boolean;
};

export type ScoundrelPlayer = {
  health: number;
  maxHealth: number;
  equippedWeapon: EquippedWeapon | null;
};

export type EquippedWeapon = {
  baseCard: StandardPlayingCard;
  slainMonsters: StandardPlayingCard[];
  upgradeBonus: number;
};

export type CardActionType =
  | "fightBarehanded"
  | "fightWithWeapon"
  | "usePotion"
  | "discardPotion"
  | "equipWeapon";
