import { Deck } from "../../../core/deck";
import { StandardPlayingCard } from "../cards";
import { createStandardDeck } from "../createStandardDeck";

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
