import { it, describe, expect, beforeEach } from "vitest";
import {
  createScoundrelState,
  isGameOver,
  calculateFinalScore,
  getTotalMonsterStrength,
} from "../../../../src/games/standard/scoundrel/state";
import { std } from "./cards.test";
import { ScoundrelState } from "../../../../src/games/standard/scoundrel/types";

describe("ScoundrelState", () => {
  let state: ScoundrelState;
  beforeEach(() => {
    state = createScoundrelState();
  });
  describe("createScoundrelState", () => {
    it("creates a new state with a deck of 44 cards", () => {
      expect(state.dungeon.count).toBe(44);
    });

    it("initializes player health to 20", () => {
      expect(state.player.health).toBe(20);
    });

    it("initializes player's max health to 20", () => {
      expect(state.player.maxHealth).toBe(20);
    });

    it("initializes player's equipped weapon to null", () => {
      expect(state.player.equippedWeapon).toBe(null);
    });

    it("initializes an empty room", () => {
      expect(state.room).toEqual([]);
    });

    it("initializes an empty discard pile", () => {
      expect(state.discardPile).toEqual([]);
    });
  });

  describe("isGameOver", () => {
    it("idendifies if a player is dead", () => {
      expect(isGameOver(state)).toBe(false);
      state.player.health = 0;
      expect(isGameOver(state)).toBe(true);
    });

    it("can check if deck is empty and all monsters are defeated", () => {
      expect(isGameOver(state)).toBe(false);
      state.dungeon.drawCards(state.dungeon.count);
      expect(isGameOver(state)).toBe(true);
      state.room = [std("A", "S")];
      expect(isGameOver(state)).toBe(false);
      state.room = [std("A", "D"), std("A", "H")];
      expect(isGameOver(state)).toBe(true);
      state.dungeon.addCardsToTop([std("A", "H")]);
      expect(isGameOver(state)).toBe(false);
    });
  });

  describe("calculateFinalScore", () => {
    it("calculates the final score as player health minus strength of remaining monsters", () => {
      state.player.health = 10;
      state.dungeon.drawCards(state.dungeon.count);
      expect(calculateFinalScore(state)).toBe(10);
      state.room = [std("A", "S"), std("A", "C"), std("A", "H"), std("A", "D")];
      expect(calculateFinalScore(state)).toBe(10 - 28);
      state.dungeon.addCardsToTop([std("8", "S"), std("8", "C"), std("A", "H")]);
      expect(calculateFinalScore(state)).toBe(10 - 28 - 16);
    });
  });

  describe("getTotalMonsterStrength", () => {
    it("calculates the total monster strength in an array", () => {
      const cards = [std("A", "S"), std("A", "C"), std("A", "H"), std("A", "D")];
      expect(getTotalMonsterStrength(cards)).toBe(28);
      cards.push(std("4", "S"));
      expect(getTotalMonsterStrength(cards)).toBe(32);
    });
  });
});
