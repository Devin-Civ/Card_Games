import { it, describe, expect } from "vitest";
import { rankToValue, createScoundrelCard } from "../src/cards";
import { std, monster, weapon, potion } from "./helpers";

describe("ScoundrelCards", () => {
  describe("rankToValue", () => {
    it.each([
      [monster("A", "S"), 14],
      [monster("10", "S"), 10],
      [monster("J", "S"), 11],
      [monster("Q", "S"), 12],
      [monster("K", "S"), 13],
      [weapon("2", "D"), 2],
      [potion("8", "H"), 8],
    ])("converts a card's rank to a numeric value", (card, expected) => {
      expect(rankToValue(card)).toBe(expected);
    });
  });

  describe("createScoundrelCard", () => {
    it("can make a MonsterCard from a StandardPlayingCard", () => {
      const card = std("5", "S");
      const monsterCard = createScoundrelCard(card);
      expect(monsterCard).toEqual({ type: "monster", card });
    });
    it("can make a PotionCard from a StandardPlayingCard", () => {
      const card = std("5", "H");
      const potionCard = createScoundrelCard(card);
      expect(potionCard).toEqual({ type: "potion", card });
    });
    it("can make a WeaponCard from a StandardPlayingCard", () => {
      const card = std("5", "D");
      const weaponCard = createScoundrelCard(card);
      expect(weaponCard).toEqual({ type: "weapon", card });
    });
    it.each([
      std("K", "H"),
      std("J", "H"),
      std("Q", "H"),
      std("K", "D"),
      std("J", "D"),
      std("Q", "D"),
      std("A", "H"),
      std("A", "D"),
    ])("throws when a card is not a monster, potion, or weapon", (card) => {
      expect(() => createScoundrelCard(card)).toThrow(
        /expected a monster, potion, or weapon card/,
      );
    });
  });
});
