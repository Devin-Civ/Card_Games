import { Deck } from "@card-games/deck";
import { RANK, SUIT, type StandardPlayingCard } from "./cards";

export function createStandardDeck(): Deck<StandardPlayingCard> {
  return new Deck<StandardPlayingCard>(
    RANK.flatMap((rank) =>
      SUIT.map((suit) => ({ kind: "suited", rank, suit })),
    ),
  );
}

export function createStandardDeckWithJokers(): Deck<StandardPlayingCard> {
  const deck = createStandardDeck();
  deck.addCardsToTop([
    { kind: "joker", color: "red" },
    { kind: "joker", color: "black" },
  ]);
  return deck;
}
