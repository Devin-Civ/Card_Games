import { it, describe, expect } from "vitest";
import {
  createStandardDeck,
  createStandardDeckWithJokers,
} from "../../../src/games/standard/createStandardDeck.ts";
import { RANK, SUIT } from "../../../src/games/standard/cards.ts";

describe("createStandardDeck", () => {
  it("creates a standard deck of 52 cards", () => {
    expect(createStandardDeck().count).toBe(52);
  });

  it("creates a deck with the correct cards", () => {
    expect(createStandardDeck().drawCards(52)).toEqual(
      RANK.flatMap((rank) =>
        SUIT.map((suit) => ({ kind: "standard", rank, suit })),
      ),
    );
  });

  it("creates a deck with jokers on top containing the correct cards", () => {
    const deck = createStandardDeckWithJokers();
    expect(deck.drawCards(2)).toEqual([
      { kind: "joker", color: "red" },
      { kind: "joker", color: "black" },
    ]);
    expect(deck.drawCards(52)).toEqual(
      RANK.flatMap((rank) =>
        SUIT.map((suit) => ({ kind: "standard", rank, suit })),
      ),
    );
  });
});
