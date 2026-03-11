import { it, describe, expect, beforeEach } from "vitest";
import { Deck } from "../../src/core/deck.ts";
import { NotEnoughCardsError } from "../../src/core/errors.ts";

type TestCard = { id: number };

describe("Deck", () => {
  let testDeck: Deck<TestCard>;
  beforeEach(() => {
    testDeck = new Deck<TestCard>([{ id: 1 }]);
  });

  it("draws one card and returns it", () => {
    expect(testDeck.drawCards()).toEqual([{ id: 1 }]);
  });

  it("fails when drawing more cards than the deck contains", () => {
    expect(() => testDeck.drawCards(2)).toThrow();
  });

  it("when the deck is empty, returns how many cards remain instead of drawing", () => {
    try {
      testDeck.drawCards(2);
    } catch (error) {
      expect(error).toBeInstanceOf(NotEnoughCardsError);
      expect(error.remaining).toBe(1);
      expect(error.requested).toBe(2);
    }
  });

  it("adds cards to the bottom of the deck", () => {
    testDeck.addCardsToBottom([{ id: 2 }, { id: 3 }]);
    expect(testDeck.count).toEqual(3);
  });

  it("adds cards to the bottom of the deck and draws the requested number of cards", () => {
    testDeck.addCardsToBottom([{ id: 2 }, { id: 3 }]);
    expect(testDeck.drawCards(2).length).toEqual(2);
  });

  it("returns the correct number of cards in the deck", () => {
    expect(new Deck<TestCard>([{ id: 1 }, { id: 2 }, { id: 3 }]).count).toBe(3);
    expect(new Deck<TestCard>([]).count).toBe(0);
  });
});
