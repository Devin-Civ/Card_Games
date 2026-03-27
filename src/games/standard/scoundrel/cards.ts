import { Rank, StandardPlayingCard, SuitedStandardPlayingCard } from "../cards";
import { ScoundrelCard } from "./types";

const RANK_TO_VALUE_MAP: Record<Rank, number> = {
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

const MONSTER_SUITS = ["S", "C"];
const MONSTER_RANKS = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const WEAPON_SUITS = ["D"];
const WEAPON_RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10"];
const POTION_SUITS = ["H"];
const POTION_RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10"];

export function rankToValue(card: ScoundrelCard): number {
  return RANK_TO_VALUE_MAP[card.card.rank];
}

export function createScoundrelCard(
  card: SuitedStandardPlayingCard,
): ScoundrelCard {
  if (isMonster(card)) return { type: "monster", card };
  if (isPotion(card)) return { type: "potion", card };
  if (isWeapon(card)) return { type: "weapon", card };
  throw new Error(
    "createScoundrelCard expected a monster, potion, or weapon card",
  );
}

function isMonster(card: StandardPlayingCard): boolean {
  return (
    card.kind === "suited" &&
    MONSTER_SUITS.includes(card.suit) &&
    MONSTER_RANKS.includes(card.rank)
  );
}

function isWeapon(card: StandardPlayingCard): boolean {
  return (
    card.kind === "suited" &&
    WEAPON_SUITS.includes(card.suit) &&
    WEAPON_RANKS.includes(card.rank)
  );
}

function isPotion(card: StandardPlayingCard): boolean {
  return (
    card.kind === "suited" &&
    POTION_SUITS.includes(card.suit) &&
    POTION_RANKS.includes(card.rank)
  );
}
