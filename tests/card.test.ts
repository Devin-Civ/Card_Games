import { expect, it, beforeEach, describe } from "vitest";
import { Card } from "../src/card";
describe("Card", () => {
  it("throws for an invalid rank", () => {
    expect(() => new Card("king", "S")).toThrow("Invalid rank");
    expect(() => new Card("ten", "S")).toThrow("Invalid rank");
  });
  it("throws for an invalid suit", () => {
    expect(() => new Card("K", "spades")).toThrow("Invalid suit");
    expect(() => new Card("K", "♠")).toThrow("Invalid suit");
  });

  let KingOfSpades: Card;
  let TenofHearts: Card;

  beforeEach(() => {
    KingOfSpades = new Card("K", "S");
    TenofHearts = new Card("10", "H");
  });

  it("stores the provided rank and suit", () => {
    expect(KingOfSpades.getRank()).toBe("K");
    expect(KingOfSpades.getSuit()).toBe("S");
    expect(TenofHearts.getRank()).toBe("10");
    expect(TenofHearts.getSuit()).toBe("H");
  });

  it("returns a card's rank and suit as a verbose string", () => {
    expect(KingOfSpades.toVerboseString()).toBe("King of Spades");
    expect(TenofHearts.toVerboseString()).toBe("Ten of Hearts");
  });

  it("returns a card's rank and suit as a symbol", () => {
    expect(KingOfSpades.toSymbolString()).toBe("K♠");
    expect(TenofHearts.toSymbolString()).toBe("10♥");
  });
});
