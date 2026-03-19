import { it, describe, expect } from "vitest";
import {
  isMonster,
  isWeapon,
  isPotion,
  rankToValue,
} from "../../../../src/games/standard/scoundrel/scoundrel.ts";
import {
  Rank,
  StandardPlayingCard,
  Suit,
} from "../../../../src/games/standard/cards.ts";
import {
  EquippedWeapon,
  createEquippedWeapon,
  canSlayMonster,
} from "../../../../src/games/standard/scoundrel/scoundrel.ts";
import { createScoundrelDeck } from "../../../../src/games/standard/scoundrel/scoundrel.ts";

const std = (rank: Rank, suit: Suit): StandardPlayingCard => ({
  kind: "suited",
  rank,
  suit,
});

const joker = (color: "red" | "black"): StandardPlayingCard => ({
  kind: "joker",
  color,
});

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

  it("can equip a weapon card and view it as a weapon", () => {
    const weaponCard: StandardPlayingCard = std("7", "D");
    const currentWeapon: EquippedWeapon = createEquippedWeapon(weaponCard);
    expect(currentWeapon.baseCard).toEqual(weaponCard);
    expect(currentWeapon.slainMonsters).toEqual([]);
    expect(currentWeapon.upgradeBonus).toBe(0);
    expect(currentWeapon.disabled).toBe(false);
  });

  it("can check if a weapon can slay a monster", () => {
    const currentWeapon: EquippedWeapon = createEquippedWeapon(std("7", "D"));
    expect(canSlayMonster(currentWeapon, std("A", "S"))).toBe(true);
    expect(canSlayMonster(currentWeapon, std("8", "S"))).toBe(true);
    currentWeapon.slainMonsters.push(std("A", "S"));
    expect(canSlayMonster(currentWeapon, std("A", "C"))).toBe(false);
    expect(canSlayMonster(currentWeapon, std("8", "C"))).toBe(true);
  });

  it("can remove red face cards, aces, and both jokers from a deck", () => {
    const deck = createScoundrelDeck();
    expect(deck.count).toBe(44);
    const cards = deck.drawCards(44);
    for (const card of EXCLUDED_SCOUNDREL_CARDS) {
      expect(cards).not.toContainEqual(card);
    }
  });
});
