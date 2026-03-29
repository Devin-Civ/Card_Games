import type {
  Rank,
  Suit,
  SuitedStandardPlayingCard,
  JokerStandardPlayingCard,
} from "@card-games/standard-cards";
import type { MonsterCard, PotionCard, WeaponCard } from "../src/types";
import { createScoundrelCard } from "../src/cards";

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
