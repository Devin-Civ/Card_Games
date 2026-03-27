import { Deck } from "../../../core/deck";
import { SuitedStandardPlayingCard } from "../cards";

export type MonsterCard = { type: "monster"; card: SuitedStandardPlayingCard };
export type PotionCard = { type: "potion"; card: SuitedStandardPlayingCard };
export type WeaponCard = { type: "weapon"; card: SuitedStandardPlayingCard };

export type ScoundrelCard = MonsterCard | PotionCard | WeaponCard;

export type ScoundrelState = {
  dungeon: Deck<ScoundrelCard>;
  player: ScoundrelPlayer;
  room: ScoundrelCard[];
  discardPile: ScoundrelCard[];
  canRunFromRoom: boolean;
  potionUsedInCurrentRoom: boolean;
};

export type ScoundrelPlayer = {
  health: number;
  maxHealth: number;
  equippedWeapon: EquippedWeapon | null;
};

export type EquippedWeapon = {
  baseCard: WeaponCard;
  slainMonsters: MonsterCard[];
  upgradeBonus: number;
};

export type CardAction =
  | "fightBarehanded"
  | "fightWithWeapon"
  | "usePotion"
  | "discardPotion"
  | "equipWeapon";

export type GameCommand =
  | { kind: "runFromRoom" }
  | { kind: "selectCard"; cardIndex: number; action: CardAction };
