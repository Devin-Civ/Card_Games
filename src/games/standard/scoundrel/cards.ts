import { StandardPlayingCard } from "../cards";

const MONSTER_SUITS = ["S", "C"];
const RANK_TO_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

export function isMonster(card: StandardPlayingCard): boolean {
  return card.kind === "suited" && MONSTER_SUITS.includes(card.suit);
}

export function isWeapon(card: StandardPlayingCard): boolean {
  const weaponRanks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  return (
    card.kind === "suited" &&
    card.suit === "D" &&
    weaponRanks.includes(card.rank)
  );
}

export function isPotion(card: StandardPlayingCard): boolean {
  const potionRanks = ["2", "3", "4", "5", "6", "7", "8", "9", "10"];
  return (
    card.kind === "suited" &&
    card.suit === "H" &&
    potionRanks.includes(card.rank)
  );
}

export function rankToValue(card: StandardPlayingCard): number {
  if (card.kind !== "suited") throw new Error("Card does not have a value");
  if (!isMonster(card) && !isWeapon(card) && !isPotion(card))
    throw new Error("Card is not a monster, weapon, or potion");
  return RANK_TO_VALUE_MAP[card.rank];
}

export function getTotalMonsterStrength(cards: StandardPlayingCard[]): number {
  return cards
    .filter(isMonster)
    .reduce((sum, card) => sum + rankToValue(card), 0);
}
