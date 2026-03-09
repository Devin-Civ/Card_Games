import { expect, it, beforeEach, describe } from "vitest";
import { Card } from "../src/card";
describe("Card", () => {
  it("Card cannot be created with an invalid rank", () => {
    expect(() => new Card("invalid", "spades")).toThrow();
  });
  it("Card cannot be created with an invalid suit", () => {
    expect(() => new Card("K", "invalid")).toThrow();
  });

  let card: Card;

  beforeEach(() => {
    card = new Card("K", "S");
  });

  it("Card should have a suit", () => {
    expect(card.getSuit()).toBeDefined();
  });

  it("Card should have a rank", () => {
    expect(card.getRank()).toBeDefined();
  });

  it("Card is created with rank and suit and returns them", () => {
    expect(card.getRank()).toBe("K");
    expect(card.getSuit()).toBe("S");
  });

  it("Display a card's rank and suit as a verbose string", () => {
    expect(card.toVerboseString()).toBe("King of Spades");
  });
  it("Display a card's rank and suit as a symbol", () => {
    expect(card.toSymbolString()).toBe("K♠");
  });
});
