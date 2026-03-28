import { it, describe, expect, beforeEach } from "vitest";
import {
  createScoundrelState,
  isGameOver,
  getFinalScore,
  isRoomCleared,
  DEFAULT_PLAYER_HEALTH,
  getPhase,
  getAvailableCommandTypes,
} from "../../../../src/games/standard/scoundrel/state";
import { monster, potion, weapon } from "./helpers";
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

    it("initializes player health to DEFAULT_PLAYER_HEALTH", () => {
      expect(state.player.health).toBe(DEFAULT_PLAYER_HEALTH);
    });

    it("initializes player's max health to DEFAULT_PLAYER_HEALTH", () => {
      expect(state.player.maxHealth).toBe(DEFAULT_PLAYER_HEALTH);
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

  describe("getPhase", () => {
    it("returns 'runOrFace' when the player can run from the room", () => {
      expect(getPhase(state)).toBe("runOrFace");
    });

    it("returns 'selectCard' when the player can't run from the room", () => {
      state.canRunFromRoom = false;
      expect(getPhase(state)).toBe("selectCard");
    });

    it("returns 'gameOver' when the player is dead or dungeon is cleared", () => {
      state.player.health = 0;
      expect(getPhase(state)).toBe("gameOver");
      state = createScoundrelState();
      state.dungeon.drawCards(state.dungeon.count);
      expect(getPhase(state)).toBe("gameOver");
    });
  });

  describe("getAvailableCommandTypes", () => {
    it("returns the available commands for the runOrFace phase", () => {
      expect(getAvailableCommandTypes(state)).toEqual([
        "runFromRoom",
        "selectCard",
      ]);
    });

    it("returns the available commands for the selectCard phase", () => {
      state.canRunFromRoom = false;
      expect(getAvailableCommandTypes(state)).toEqual(["selectCard"]);
    });

    it("returns the available commands for the gameOver phase", () => {
      state.player.health = 0;
      expect(getAvailableCommandTypes(state)).toEqual([]);
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
      state.room = [monster("A", "S")];
      expect(isGameOver(state)).toBe(false);
      state.room = [weapon("10", "D"), potion("10", "H")];
      expect(isGameOver(state)).toBe(true);
      state.dungeon.addCardsToTop([monster("10", "C")]);
      expect(isGameOver(state)).toBe(false);
    });
  });

  describe("getFinalScore", () => {
    it("calculates the final score as player health minus strength of remaining monsters using the room", () => {
      state.player.health = 10;
      state.dungeon.drawCards(state.dungeon.count);
      expect(getFinalScore(state)).toBe(10);
      state.room = [
        monster("A", "S"),
        monster("A", "C"),
        potion("9", "H"),
        weapon("9", "D"),
      ];
      expect(getFinalScore(state)).toBe(10 - 28);
    });

    it("calculates the final score as player health minus strength of remaining monsters using the dungeon and room", () => {
      state.player.health = 10;
      state.dungeon.drawCards(state.dungeon.count);
      state.room = [
        monster("A", "S"),
        monster("A", "C"),
        potion("9", "H"),
        weapon("9", "D"),
      ];
      state.dungeon.addCardsToTop([
        monster("8", "S"),
        monster("8", "C"),
        potion("9", "H"),
      ]);
      expect(getFinalScore(state)).toBe(10 - (28 + 16));
    });
  });

  describe("isRoomCleared", () => {
    it("identifies if the room is cleared (one or less cards remaining)", () => {
      expect(isRoomCleared(state)).toBe(true);
      state.room = [
        monster("A", "S"),
        monster("A", "C"),
        potion("9", "H"),
        weapon("9", "D"),
      ];
      expect(isRoomCleared(state)).toBe(false);
      state.room = [monster("A", "S")];
      expect(isRoomCleared(state)).toBe(true);
    });
  });
});
