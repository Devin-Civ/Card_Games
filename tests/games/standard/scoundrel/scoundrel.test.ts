import { it, describe, expect } from "vitest";
import {
  isMonster,
  isWeapon,
  isPotion,
  rankToValue,
} from "../../../../src/games/standard/scoundrel/cards.ts";
import {
  Rank,
  StandardPlayingCard,
  Suit,
} from "../../../../src/games/standard/cards.ts";

export const std = (rank: Rank, suit: Suit): StandardPlayingCard => ({
  kind: "suited",
  rank,
  suit,
});

export const joker = (color: "red" | "black"): StandardPlayingCard => ({
  kind: "joker",
  color,
});

describe("Scoundrel", () => {
  it.each([
    [std("A", "S"), true],
    [std("A", "C"), true],
    [joker("red"), false],
    [std("A", "H"), false],
  ])("identifies only black cards as monsters", (card, expected) => {
    expect(isMonster(card)).toBe(expected);
  });

  it.each([
    [std("A", "D"), true],
    [std("10", "D"), true],
    [joker("red"), false],
    [std("A", "H"), false],
  ])(
    "identifies only diamond ace and number cards as weapons",
    (card, expected) => {
      expect(isWeapon(card)).toBe(expected);
    },
  );

  it.each([
    [std("10", "H"), true],
    [std("2", "H"), true],
    [joker("red"), false],
    [std("A", "D"), false],
  ])("identifies only heart number cards as potions", (card, expected) => {
    expect(isPotion(card)).toBe(expected);
  });

  it.each([
    [std("A", "S"), 14],
    [std("10", "S"), 10],
    [std("J", "S"), 11],
    [std("Q", "S"), 12],
    [std("K", "S"), 13],
    [std("2", "D"), 2],
  ])("converts a card's rank to a numeric value", (card, expected) => {
    expect(rankToValue(card)).toBe(expected);
  });

  it.each([joker("red"), std("A", "H")])(
    "throws when a card does not have a numeric value",
    (card) => {
      expect(() => rankToValue(card)).toThrow();
    },
  );
});
