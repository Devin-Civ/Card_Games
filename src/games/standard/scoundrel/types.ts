import { Deck } from "../../../core/deck";
import { StandardPlayingCard } from "../cards";

type MonsterCard = { type: "monster"; card: StandardPlayingCard };
type PotionCard = { type: "potion"; card: StandardPlayingCard };
type WeaponCard = { type: "weapon"; card: StandardPlayingCard };

export type ScoundrelCard = MonsterCard | PotionCard | WeaponCard;

export type ScoundrelState = {
  dungeon: Deck<StandardPlayingCard>;
  player: ScoundrelPlayer;
  room: StandardPlayingCard[];
  discardPile: StandardPlayingCard[];
  canRunFromRoom: boolean;
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

export type CardAction =
  | "fightBarehanded"
  | "fightWithWeapon"
  | "usePotion"
  | "discardPotion"
  | "equipWeapon";

export type GameCommand =
  | { kind: "runFromRoom" }
  | { kind: "selectCard"; cardIndex: number; action: CardAction };
