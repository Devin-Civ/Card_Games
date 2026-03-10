import { it, describe, expect } from "vitest";
import { Deck } from "../../src/core/deck.ts";

type FakeCard = { id: number };

describe("Deck", () => {
  it("makes a deck of cards", () => {
    new Deck<FakeCard>([{ id: 1 }]);
  });

  it("can draw a card", () => {
    const deck = new Deck<FakeCard>([{ id: 1 }]);
    const card = deck.drawCard();
    expect(card).toEqual({ id: 1 });
  });

  it("throws an error if the deck is empty", () => {
    const deck = new Deck<FakeCard>([]);
    expect(() => deck.drawCard()).toThrow("Deck is empty");
  });
});
