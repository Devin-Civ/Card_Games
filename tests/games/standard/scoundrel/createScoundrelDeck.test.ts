import { describe, expect, it } from "vitest";
import { joker, std } from "./cards.test";
import { createScoundrelDeck } from "../../../../src/games/standard/scoundrel/createScoundrelDeck";
import { StandardPlayingCard } from "../../../../src/games/standard/cards";

const EXCLUDED_SCOUNDREL_CARDS: StandardPlayingCard[] = [
  joker("red"),
  joker("black"),
  std("A", "H"),
  std("A", "D"),
  std("J", "H"),
  std("Q", "H"),
  std("K", "H"),
  std("J", "D"),
  std("Q", "D"),
  std("K", "D"),
];

describe("ScoundrelDeck", () => {
  it("can remove red face cards, aces, and both jokers from a deck", () => {
    const deck = createScoundrelDeck();
    expect(deck.count).toBe(44);
    const cards = deck.drawCards(44);
    for (const card of EXCLUDED_SCOUNDREL_CARDS) {
      expect(cards).not.toContainEqual(card);
    }
  });
});
