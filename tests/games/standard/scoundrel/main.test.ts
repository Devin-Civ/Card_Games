import { it, describe, expect, beforeEach } from "vitest";
import {
  startScoundrel,
  handleGameCommand,
} from "../../../../src/games/standard/scoundrel/main";
import { createScoundrelDeck } from "../../../../src/games/standard/scoundrel/createScoundrelDeck";
import { ScoundrelState } from "../../../../src/games/standard/scoundrel/types";
import {
  DEFAULT_PLAYER_HEALTH,
  getPhase,
  getFinalScore,
} from "../../../../src/games/standard/scoundrel/state";
import { monster, potion, weapon } from "./helpers";
describe("Scoundrel Game Controller", () => {
  let state: ScoundrelState;
  beforeEach(() => {
    state = startScoundrel();
  });

  describe("startScoundrel", () => {
    let state: ScoundrelState;
    beforeEach(() => {
      state = startScoundrel();
    });

    it("shuffles (and cuts) the dungeon", () => {
      const state = startScoundrel();
      const unshuffledDeck = createScoundrelDeck();
      // This is flaky, but only at a 1/44! rate
      expect(state.dungeon).not.toEqual(unshuffledDeck);
    });

    it("begins a game with room drawn", () => {
      expect(state.room).not.toEqual([]);
      expect(state.dungeon.count).toBe(44 - state.room.length);
    });

    it("begins a game with the 'runOrFace' phase", () => {
      expect(getPhase(state)).toBe("runOrFace");
    });
  });

  describe("handleGameCommand", () => {
    it("lets the player run from the room", () => {
      expect(state.canRunFromRoom).toBe(true);
      const result = handleGameCommand(state, { type: "runFromRoom" });
      expect(result).toEqual({ type: "ok" });
      expect(state.canRunFromRoom).toBe(false);
    });

    it("lets the player select a card", () => {
      state.room = [monster("A", "S"), potion("8", "H"), weapon("9", "D")];
      const result = handleGameCommand(state, {
        type: "selectCard",
        cardIndex: 0,
        action: "fightBarehanded",
      });
      expect(result).toEqual({ type: "ok" });
      expect(state.room).toHaveLength(2);
      expect(state.player.health).toBe(DEFAULT_PLAYER_HEALTH - 14);
    });

    it("returns an error if the command is invalid for the current phase", () => {
      state.canRunFromRoom = false;
      const result = handleGameCommand(state, {
        type: "runFromRoom",
      });
      expect(result).toEqual({
        type: "error",
        message: "Invalid command for current phase",
      });
    });

    it("returns an error for out of bounds card indices", () => {
      const result = handleGameCommand(state, {
        type: "selectCard",
        cardIndex: 10,
        action: "fightBarehanded",
      });
      expect(result).toEqual({
        type: "error",
        message: "Card at index 10 is not in the room",
      });
    });

    it("returns an error message by an invalid action", () => {
      state.room = [monster("A", "S"), potion("8", "H"), weapon("9", "D")];
      const result = handleGameCommand(state, {
        type: "selectCard",
        cardIndex: 1,
        action: "fightBarehanded",
      });
      expect(result).toEqual({
        type: "error",
        message: "fightBarehanded is not a valid action for card at index 1",
      });
    });

    it("returns a game over result if the player is dead", () => {
      state.player.health = 1;
      state.dungeon.drawCards(state.dungeon.count);
      state.room = [monster("A", "S"), monster("8", "C"), monster("9", "C")];
      const result = handleGameCommand(state, {
        type: "selectCard",
        cardIndex: 0,
        action: "fightBarehanded",
      });
      expect(result).toEqual({ type: "gameOver", score: getFinalScore(state) });
    });
    it("redraws the room if the room becomes empty", () => {
      state.room = [potion("2", "H")];
      const result = handleGameCommand(state, {
        type: "selectCard",
        cardIndex: 0,
        action: "usePotion",
      });
      expect(result).toEqual({ type: "ok" });
      expect(getPhase(state)).toBe("runOrFace");
      expect(state.room).toHaveLength(4);
    });
  });
});
