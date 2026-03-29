import { Deck } from "@card-games/deck";
import {
  createStandardDeck,
  type StandardPlayingCard,
  type SuitedStandardPlayingCard,
} from "@card-games/standard-cards";
import { createScoundrelCard } from "./cards";
import type { ScoundrelCard } from "./types";

export function createScoundrelDeck(): Deck<ScoundrelCard> {
  const standardDeck = createStandardDeck();
  const cards = standardDeck.drawCards(standardDeck.count);
  const filteredCards = filterUnusedCards(cards) as SuitedStandardPlayingCard[];
  return new Deck<ScoundrelCard>(filteredCards.map(createScoundrelCard));
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

function filterUnusedCards(
  cards: StandardPlayingCard[],
): StandardPlayingCard[] {
  return cards.filter(
    (card) => !isRedFaceCard(card) && !isRedAce(card) && !isJoker(card),
  );
}
