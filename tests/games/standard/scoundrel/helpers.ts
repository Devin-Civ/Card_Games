import {
  Rank,
  Suit,
  SuitedStandardPlayingCard,
  JokerStandardPlayingCard,
} from "../../../../src/games/standard/cards";
import {
  MonsterCard,
  PotionCard,
  ScoundrelCard,
  WeaponCard,
} from "../../../../src/games/standard/scoundrel/types";
import { createScoundrelCard } from "../../../../src/games/standard/scoundrel/cards";

export const std = (rank: Rank, suit: Suit): SuitedStandardPlayingCard => ({
  kind: "suited",
  rank,
  suit,
});

export const joker = (color: "red" | "black"): JokerStandardPlayingCard => ({
  kind: "joker",
  color,
});

export function monster(rank: Rank, suit: Suit): MonsterCard {
  const card = createScoundrelCard(std(rank, suit));
  if (card.type !== "monster") throw new Error("Invalid monster card");
  return card;
}

export function potion(rank: Rank, suit: Suit): PotionCard {
  const card = createScoundrelCard(std(rank, suit));
  if (card.type !== "potion") throw new Error("Invalid potion card");
  return card;
}

export function weapon(rank: Rank, suit: Suit): WeaponCard {
  const card = createScoundrelCard(std(rank, suit));
  if (card.type !== "weapon") throw new Error("Invalid weapon card");
  return card;
}
