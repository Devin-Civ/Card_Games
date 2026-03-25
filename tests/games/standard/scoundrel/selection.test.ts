import { beforeEach, describe, expect, it } from "vitest";
import { std } from "./cards.test";
import { getAvailableActionsForCard } from "../../../../src/games/standard/scoundrel/selection";
import { createScoundrelState } from "../../../../src/games/standard/scoundrel/state";
import { chooseCard } from "../../../../src/games/standard/scoundrel/selection";
import { ScoundrelState } from "../../../../src/games/standard/scoundrel/types";

describe("Selection", () => {
  describe("getAvailableActionsForCard", () => {
    it.each([
      [0, ["fightBarehanded", "fightWithWeapon"]],
      [1, ["usePotion"]],
      [2, ["equipWeapon"]],
    ])(
      "can identify available actions for a given card in a room",
      (cardIndex: number, expectedActions: string[]) => {
        const room = [std("A", "S"), std("8", "H"), std("9", "D")];
        const actions = getAvailableActionsForCard(room[cardIndex]);
        expect(actions).toEqual(expectedActions);
      },
    );
  });
  describe("chooseCard", () => {
    let state: ScoundrelState;
    beforeEach(() => {
      state = createScoundrelState();
      state.player.health = 15;
      state.player.maxHealth = 20;
      state.room = [std("A", "S"), std("8", "H"), std("9", "D")];
    });

    it("can choose a monster from the room to interact with", () => {
      chooseCard(state, 0, "fightBarehanded");
      expect(state.player.health).toBe(1);
    });

    it("can choose a potion from the room to interact with", () => {
      chooseCard(state, 1, "usePotion");
      expect(state.player.health).toBe(20);
    });

    it("can choose a weapon from the room to interact with", () => {
      chooseCard(state, 2, "equipWeapon");
      expect(state.player.equippedWeapon?.baseCard).toEqual(std("9", "D"));
    });

    it("throws an error if a non-valid action is chosen", () => {
      expect(() => chooseCard(state, 0, "usePotion")).toThrow(
        "usePotion is not a valid action for card at index 0",
      );
    });

    it("removes the card from the room after it is chosen", () => {
      chooseCard(state, 0, "fightBarehanded");
      expect(state.room).toHaveLength(2);
    });
  });
});
