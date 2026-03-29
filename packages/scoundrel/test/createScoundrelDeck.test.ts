import { describe, expect, it } from "vitest";
import { createScoundrelDeck } from "../src/createScoundrelDeck";

describe("ScoundrelDeck", () => {
  it("can remove red face cards, aces, and both jokers from a deck", () => {
    const deck = createScoundrelDeck();
    expect(deck.count).toBe(44);
  });
});
