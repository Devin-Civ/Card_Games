import { it, describe, expect, beforeEach } from "vitest";
import { Deck } from "./index";

type TestCard = { id: number };

describe("Deck", () => {
  let testDeck: Deck<TestCard>;
  beforeEach(() => {
    testDeck = new Deck<TestCard>([{ id: 1 }]);
  });

  it("draws one card and returns it", () => {
    expect(testDeck.drawCards()).toEqual([{ id: 1 }]);
  });

  it("draws the requested number of cards from the deck", () => {
    testDeck = new Deck<TestCard>([{ id: 1 }, { id: 2 }, { id: 3 }]);
    expect(testDeck.drawCards(2).length).toBe(2);
  });

  it("throws when drawing more cards than the deck contains", () => {
    expect(() => testDeck.drawCards(2)).toThrow(
      "Not enough cards (have 1, need 2)",
    );
  });

  it("allows a deck to be made without any cards", () => {
    expect(new Deck<TestCard>([]).count).toBe(0);
  });

  it("adds cards to the bottom of the deck", () => {
    testDeck.addCardsToBottom([{ id: 2 }, { id: 3 }]);
    expect(testDeck.count).toEqual(3);
  });

  it("adds cards to the bottom of the deck and draws the requested number of cards", () => {
    testDeck.addCardsToBottom([{ id: 2 }, { id: 3 }]);
    expect(testDeck.drawCards()).toEqual([{ id: 1 }]);
    expect(testDeck.drawCards(2).length).toEqual(2);
  });

  it("returns the correct number of cards in the deck", () => {
    expect(new Deck<TestCard>([{ id: 1 }, { id: 2 }, { id: 3 }]).count).toBe(3);
    expect(new Deck<TestCard>([]).count).toBe(0);
  });

  it("adds cards to the top of the deck with addToTop", () => {
    testDeck.addCardsToTop([{ id: 99 }, { id: 100 }]);
    const cards = testDeck.drawCards(2);
    expect(cards).toContainEqual({ id: 99 });
    expect(cards).toContainEqual({ id: 100 });
  });

  it("has the same  number of cards after shuffling", () => {
    testDeck.addCardsToBottom([{ id: 2 }, { id: 3 }, { id: 4 }]);
    testDeck.shuffle();
    expect(testDeck.count).toBe(4);
  });

  it("has the same cards after shuffling", () => {
    testDeck.addCardsToBottom([{ id: 2 }, { id: 3 }, { id: 4 }]);
    testDeck.shuffle();
    const cards = testDeck.drawCards(4);
    expect(cards).toContainEqual({ id: 1 });
    expect(cards).toContainEqual({ id: 2 });
    expect(cards).toContainEqual({ id: 3 });
    expect(cards).toContainEqual({ id: 4 });
  });

  it("cuts the deck, moving cards at and above the given index to the bottom of the deck", () => {
    testDeck.addCardsToTop([{ id: 2 }, { id: 3 }, { id: 4 }]);
    testDeck.cut(2);
    expect(testDeck.count).toBe(4);
    expect(testDeck.drawCards(2)).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("cuts the deck at a random index when no index is provided", () => {
    testDeck.addCardsToTop([{ id: 2 }, { id: 3 }, { id: 4 }]);
    testDeck.cut();
    expect(testDeck.count).toBe(4);
  });
});
