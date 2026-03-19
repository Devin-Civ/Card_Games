import { RANK, StandardPlayingCard } from "../cards";
import { createStandardDeck } from "../createStandardDeck";
import type { Deck } from "../../../core/deck";

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

export type EquippedWeapon = {
  baseCard: StandardPlayingCard;
  slainMonsters: StandardPlayingCard[];
  upgradeBonus: number;
  disabled: boolean;
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

export function createEquippedWeapon(
  weaponCard: StandardPlayingCard,
): EquippedWeapon {
  return {
    baseCard: weaponCard,
    slainMonsters: [],
    upgradeBonus: 0,
    disabled: false,
  };
}

function lastSlainMonster(weapon: EquippedWeapon): StandardPlayingCard | null {
  return weapon.slainMonsters.length > 0
    ? weapon.slainMonsters[weapon.slainMonsters.length - 1]
    : null;
}

export function canSlayMonster(
  weapon: EquippedWeapon,
  monster: StandardPlayingCard,
): boolean {
  const lastMonster = lastSlainMonster(weapon);
  if (lastMonster === null) return true;
  else
    return !weapon.disabled && rankToValue(monster) < rankToValue(lastMonster);
}

export function createScoundrelDeck(): Deck<StandardPlayingCard> {
  const deck = createStandardDeck();
  const cards = deck
    .drawCards(52)
    .filter(
      (card) => !isRedFaceCard(card) && !isRedAce(card) && !isJoker(card),
    );
  deck.addCardsToTop(cards);
  return deck;
}

function isRedFaceCard(card: StandardPlayingCard): boolean {
  return (
    card.kind === "suited" &&
    ["H", "D"].includes(card.suit) &&
    ["J", "Q", "K"].includes(card.rank)
  );
}

function isRedAce(card: StandardPlayingCard): boolean {
  return (
    card.kind === "suited" &&
    ["H", "D"].includes(card.suit) &&
    card.rank === "A"
  );
}

function isJoker(card: StandardPlayingCard): boolean {
  return card.kind === "joker";
}
