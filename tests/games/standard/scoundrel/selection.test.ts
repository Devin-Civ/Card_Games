import { beforeEach, describe, expect, it } from "vitest";
import { joker, std } from "./cards.test";
import {
  getAvailableActionsForCard,
  applyActionToRoomCard,
} from "../../../../src/games/standard/scoundrel/selection";
import { createScoundrelState } from "../../../../src/games/standard/scoundrel/state";
import { ScoundrelState } from "../../../../src/games/standard/scoundrel/types";
import { equipWeapon } from "../../../../src/games/standard/scoundrel/actions/player";

describe("Selection", () => {
  let state: ScoundrelState;
  beforeEach(() => {
    state = createScoundrelState();
    state.player.health = 15;
    state.player.maxHealth = 20;
    state.room = [std("A", "S"), std("8", "H"), std("9", "D")];
  });

  describe("getAvailableActionsForCard", () => {
    it("returns equipWeapon for weapons", () => {
      const actions = getAvailableActionsForCard(state, std("3", "D"));
      expect(actions).toEqual(["equipWeapon"]);
    });

    it("only returns fightBarehanded for combat if no weapon is equipped", () => {
      state.player.equippedWeapon = null;
      const actions = getAvailableActionsForCard(state, std("4", "S"));
      expect(actions).toEqual(["fightBarehanded"]);
    });

    it("returns fightBarehanded and fightWithWeapon for combat if a weapon is equipped", () => {
      equipWeapon(state, std("3", "D"));
      const actions = getAvailableActionsForCard(state, std("4", "S"));
      expect(actions).toEqual(["fightBarehanded", "fightWithWeapon"]);
    });

    it("returns discardPotion and usePotion for potions if no potion has been used in the current room", () => {
      state.potionUsedInCurrentRoom = false;
      const actions = getAvailableActionsForCard(state, std("2", "H"));
      expect(actions).toEqual(["discardPotion", "usePotion"]);
    });

    it("returns discardPotion for potions if a potion has been used in the current room", () => {
      state.potionUsedInCurrentRoom = true;
      const actions = getAvailableActionsForCard(state, std("2", "H"));
      expect(actions).toEqual(["discardPotion"]);
    });

    it("throws an error if a non-valid card is provided", () => {
      expect(() => getAvailableActionsForCard(state, joker("red"))).toThrow(
        "getAvailableActionsForCard expected a monster, weapon, or potion card",
      );
    });
  });
  describe("applyActionToRoomCard", () => {
    it("can apply a fightBarehanded action to a monster in the room", () => {
      applyActionToRoomCard(state, 0, "fightBarehanded");
      expect(state.player.health).toBe(1);
    });

    it("can choose a potion from the room to interact with", () => {
      applyActionToRoomCard(state, 1, "usePotion");
      expect(state.player.health).toBe(20);
    });

    it("can choose a weapon from the room to interact with", () => {
      applyActionToRoomCard(state, 2, "equipWeapon");
      expect(state.player.equippedWeapon?.baseCard).toEqual(std("9", "D"));
    });

    it("throws an error if a non-valid action is chosen", () => {
      expect(() => applyActionToRoomCard(state, 0, "usePotion")).toThrow(
        "usePotion is not a valid action for card at index 0",
      );
    });

    it("removes the card from the room after it is chosen", () => {
      applyActionToRoomCard(state, 0, "fightBarehanded");
      expect(state.room).toHaveLength(2);
    });
  });
});
