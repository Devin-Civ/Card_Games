import { expect, it, describe } from "vitest";
import { Deck } from "../old_src/deck.ts";
import { Card } from "../old_src/card.ts";
import { RANKS, SUITS } from "../old_src/card.constants.ts";
describe("Deck", () => {
  it("new deck has 52 cards", () => {
    const deck = new Deck();
    expect(deck.getSize()).toBe(52);
  });

  it("can draw a card", () => {
    const deck = new Deck();
    expect(deck.drawCard()).toBeInstanceOf(Card);
  });

  it("drawing a card reduces the deck size by 1", () => {
    const deck = new Deck();
    deck.drawCard();
    expect(deck.getSize()).toBe(51);
  });

  it("deck contains all 52 cards", () => {
    const deck = new Deck();
    for (const rank of Object.keys(RANKS)) {
      for (const suit of Object.keys(SUITS)) {
        expect(deck.drawCard()).toBeInstanceOf(Card);
      }
    }
  });
});
